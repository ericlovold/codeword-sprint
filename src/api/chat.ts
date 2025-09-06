// src/api/chat.ts
import Constants from 'expo-constants';

// Updated to connect to XCAi Platform on port 8000
const API_BASE = (Constants?.expoConfig?.extra as any)?.API_BASE ?? 'http://localhost:8000';

export type ChatMessage = { role: 'user' | 'assistant' | 'system'; content: string };

async function sendOnce(
  text: string,
  conversationHistory: ChatMessage[] = [],
): Promise<ChatMessage> {
  // Build message history including the new user message
  const messages = [...conversationHistory, { role: 'user' as const, content: text }];

  const res = await fetch(`${API_BASE}/chat/completions`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Client': 'codeword-sprint',
      'X-Version': '1.0.0',
    },
    body: JSON.stringify({
      model: 'gpt-4o', // Use GPT-4o as primary model
      stream: false,
      messages: messages,
      metadata: {
        app: 'codeword',
        surface: 'mobile',
        platform: 'xcai-v2.0.0',
        crisis_detection: true,
      },
    }),
  });

  if (!res.ok) {
    // Enhanced error handling for different status codes
    const errorText = await res.text();
    if (res.status === 429) {
      throw new Error('Rate limit exceeded. Please wait a moment before sending another message.');
    } else if (res.status >= 500) {
      throw new Error('Server temporarily unavailable. Please try again in a moment.');
    } else {
      throw new Error(`Request failed: ${res.status} - ${errorText}`);
    }
  }

  const data = await res.json();

  // Handle the response format from XCAi platform
  const message = data?.choices?.[0]?.message;
  if (!message) {
    throw new Error('Invalid response format from server');
  }

  // Log crisis detection if present
  if (data.metadata?.crisis_level && data.metadata.crisis_level !== 'none') {
    console.warn(`Crisis detected: ${data.metadata.crisis_level}`, data.metadata.crisis_keywords);
  }

  return {
    role: message.role,
    content: message.content,
  } as ChatMessage;
}

// Enhanced API with conversation history support
async function sendWithHistory(
  text: string,
  history: ChatMessage[],
): Promise<{ message: ChatMessage; metadata?: any }> {
  const res = await fetch(`${API_BASE}/chat/completions`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Client': 'codeword-sprint',
      'X-Version': '1.0.0',
    },
    body: JSON.stringify({
      model: 'gpt-4o',
      stream: false,
      messages: [...history, { role: 'user', content: text }],
      metadata: {
        app: 'codeword',
        surface: 'mobile',
        platform: 'xcai-v2.0.0',
        crisis_detection: true,
      },
    }),
  });

  if (!res.ok) {
    const errorText = await res.text();
    throw new Error(`${res.status} ${errorText}`);
  }

  const data = await res.json();
  return {
    message: data?.choices?.[0]?.message ?? { role: 'assistant', content: '(no response)' },
    metadata: data?.metadata,
  };
}

// Health check for the chat service
async function healthCheck(): Promise<{ status: string; models_available: any }> {
  const res = await fetch(`${API_BASE}/chat/health`);
  if (!res.ok) {
    throw new Error(`Health check failed: ${res.status}`);
  }
  return res.json();
}

export const chatApi = {
  send: sendOnce,
  sendWithHistory,
  healthCheck,
};
