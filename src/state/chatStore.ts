import { create } from 'zustand';
export type ChatMessage = { id: string; role: 'user' | 'assistant' | 'system'; content: string };

type ChatState = {
  messages: ChatMessage[];
  sending: boolean;
  send: (
    text: string,
    streamer: (text: string, onChunk: (c: string) => void) => Promise<void>,
  ) => Promise<void>;
  reset: () => void;
};

export const useChatStore = create<ChatState>((set, get) => ({
  messages: [],
  sending: false,
  reset: () => set({ messages: [] }),
  send: async (text, streamer) => {
    if (!text.trim()) return;
    const user: ChatMessage = { id: crypto.randomUUID(), role: 'user', content: text };
    set({ messages: [...get().messages, user], sending: true });

    let acc = '';
    const onChunk = (c: string) => {
      acc += c;
      set((s) => {
        const arr = [...s.messages];
        const last = arr[arr.length - 1];
        if (last?.role === 'assistant' && last.id.startsWith('stream-')) {
          last.content = acc;
          return { messages: arr };
        }
        return {
          messages: [...arr, { id: 'stream-' + Date.now(), role: 'assistant', content: acc }],
        };
      });
    };

    try {
      await streamer(text, onChunk);
    } finally {
      set({ sending: false });
    }
  },
}));
