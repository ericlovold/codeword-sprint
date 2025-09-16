// src/api/chat.ts
import Constants from 'expo-constants';
import { apiFetch, ApiError } from './base';
import { API_BASE } from '../lib/config';

// Additional configuration from app.config.js
const config = Constants?.expoConfig?.extra as any;
const WS_URL = config?.WS_URL ?? 'ws://localhost:9989/ws';
const ENVIRONMENT = config?.environment ?? 'development';
const BUILD_TIME = config?.buildTime ?? 'unknown';

// Enhanced logging with environment info
function logNetworkCall(endpoint: string, method: string = 'GET', extra?: any) {
  const timestamp = new Date().toISOString();
  console.log(`🌐 [${timestamp}] ${method} ${endpoint}`);
  console.log(`   Environment: ${ENVIRONMENT} | Build: ${BUILD_TIME}`);
  console.log(`   API Base: ${API_BASE}`);
  if (extra) console.log(`   Extra:`, extra);
}

export type ChatMessage = {
  role: 'user' | 'assistant' | 'system';
  content: string;
  timestamp?: number;
  id?: string;
};

export type ChatSession = {
  sessionId: string;
  userId: string;
  createdAt: number;
  lastActivity: number;
  metadata?: any;
};

export type StreamingResponse = {
  content: string;
  done: boolean;
  metadata?: any;
};

export type ModelVariant = 'kai' | 'neo' | 'nemo' | 'gpt-4o' | 'claude-3-haiku';

// Session management
export type SessionConfig = {
  model?: ModelVariant;
  systemPrompt?: string;
  guardrails?: string[];
  userId?: string;
};

async function sendOnce(
  text: string,
  conversationHistory: ChatMessage[] = [],
): Promise<ChatMessage> {
  // Build message history including the new user message
  const messages = [...conversationHistory, { role: 'user' as const, content: text }];

  logNetworkCall('/chat/completions', 'POST', { messageCount: messages.length });

  const data = await apiFetch<any>('/chat/completions', {
    method: 'POST',
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

// Session management - Backend v1 API
async function createSession(config: SessionConfig = {}): Promise<ChatSession> {
  logNetworkCall('/api/session', 'POST', { userId: config.userId });

  const res = await fetch(`${API_BASE}/api/session`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      device_id: config.userId || `device-${Date.now()}`,
    }),
  });

  if (!res.ok) {
    throw new Error(`Failed to create session: ${res.status}`);
  }

  const data = await res.json();

  // Transform backend response to our ChatSession format
  return {
    sessionId: data.session_id,
    userId: config.userId || 'anonymous',
    createdAt: Date.now(),
    lastActivity: Date.now(),
    metadata: data,
  };
}

// Send message to backend
async function sendMessage(
  sessionId: string,
  message: string,
  onStream?: (chunk: StreamingResponse) => void,
): Promise<ChatMessage> {
  const isStreaming = !!onStream;

  logNetworkCall('/api/chat', 'POST', { sessionId, streaming: isStreaming });

  const res = await fetch(`${API_BASE}/api/chat`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      session_id: sessionId,
      message: message,
      stream: isStreaming,
    }),
  });

  if (!res.ok) {
    const errorText = await res.text();
    if (res.status === 429) {
      throw new Error('Rate limit exceeded. Please wait before sending another message.');
    } else if (res.status >= 500) {
      throw new Error('Server temporarily unavailable. Please try again.');
    }
    throw new Error(`Message failed: ${res.status} - ${errorText}`);
  }

  if (isStreaming && res.body) {
    // Handle streaming response
    const reader = res.body.getReader();
    const decoder = new TextDecoder();
    let fullContent = '';

    try {
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        const chunk = decoder.decode(value, { stream: true });
        const lines = chunk.split('\n');

        for (const line of lines) {
          if (line.startsWith('data: ')) {
            try {
              const data = JSON.parse(line.slice(6));
              const streamChunk: StreamingResponse = {
                content: data.content || '',
                done: data.done || false,
                metadata: data.metadata,
              };
              fullContent += streamChunk.content;
              onStream(streamChunk);

              if (streamChunk.done) {
                return {
                  role: 'assistant',
                  content: fullContent,
                  timestamp: Date.now(),
                  id: data.messageId,
                };
              }
            } catch (e) {
              console.error('Failed to parse streaming chunk:', e);
            }
          }
        }
      }
    } finally {
      reader.releaseLock();
    }
  }

  // Non-streaming response - parse backend format
  const data = await res.json();
  return {
    role: 'assistant',
    content: data.response || '',
    timestamp: Date.now(),
    id: data.session_id + '-' + Date.now(),
    metadata: data,
  };
}

// Get session events (for analytics/debugging)
async function getSessionEvents(sessionId: string): Promise<any[]> {
  const res = await fetch(`${API_BASE}/events/${sessionId}`, {
    headers: {
      'X-Client': 'codeword-sprint',
      'X-Version': '1.0.0',
    },
  });

  if (!res.ok) {
    throw new Error(`Failed to get events: ${res.status}`);
  }

  const data = await res.json();
  return data.events || [];
}

// Health check for the chat service with orchestration
async function healthCheck(): Promise<{
  status: string;
  models_available: any;
  orchestration_status?: string;
}> {
  logNetworkCall('/healthz', 'GET');

  const res = await fetch(`${API_BASE}/healthz`); // Updated endpoint name
  if (!res.ok) {
    throw new Error(`Health check failed: ${res.status}`);
  }
  return res.json();
}

// Model failover support
async function sendWithFailover(
  sessionId: string,
  message: string,
  primaryModel: ModelVariant = 'gpt-4o',
  fallbackModel: ModelVariant = 'claude-3-haiku',
): Promise<ChatMessage> {
  try {
    // Try primary model first
    return await sendMessage(sessionId, message);
  } catch (error) {
    console.warn(
      `Primary model (${primaryModel}) failed, trying fallback (${fallbackModel}):`,
      error,
    );

    // Update session to use fallback model
    await fetch(`${API_BASE}/session/${sessionId}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'X-Client': 'codeword-sprint',
        'X-Version': '1.0.0',
      },
      body: JSON.stringify({ model: fallbackModel }),
    });

    // Retry with fallback
    return await sendMessage(sessionId, message);
  }
}

export const chatApi = {
  // Legacy methods (Phase 1)
  send: sendOnce,
  sendWithHistory,

  // Phase 2 Core Chat Flow
  createSession,
  sendMessage,
  sendWithFailover,
  getSessionEvents,
  healthCheck,
};
