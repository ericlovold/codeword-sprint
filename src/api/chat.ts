// src/api/chat.ts
import Constants from 'expo-constants';

const API_BASE = (Constants?.expoConfig?.extra as any)?.API_BASE ?? 'http://localhost:9988';

export type ChatMessage = { role: 'user' | 'assistant' | 'system'; content: string };

async function sendOnce(text: string): Promise<ChatMessage> {
  const res = await fetch(`${API_BASE}/chat/completions`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Client': 'codeword-app',
      'X-Version': '0.1.0',
    },
    body: JSON.stringify({
      model: 'xcai-coach-v1', // your router can map this
      stream: false, // start simple; swap to stream later
      messages: [{ role: 'user', content: text }],
      metadata: { app: 'codeword', surface: 'mobile' },
    }),
  });

  if (!res.ok) {
    // surface 429 and 5xx nicely
    const msg = await res.text();
    throw new Error(`${res.status} ${msg}`);
  }
  const data = await res.json();
  // shape: { choices: [{ message: { role, content } }], ... }
  const m = data?.choices?.[0]?.message ?? { role: 'assistant', content: '(no response)' };
  return m as ChatMessage;
}

export const chatApi = { send: sendOnce };
