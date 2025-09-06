import { useEffect, useRef, useState } from 'react';
import { getChatService } from '../services/ChatService';

export type ChatMsg = { role: 'user' | 'ai'; text: string };

export function useChatAgent() {
  const [messages, setMessages] = useState<ChatMsg[]>([]);
  const [status, setStatus] = useState<'idle' | 'connecting' | 'ready' | 'typing'>('idle');
  const [partialReply, setPartialReply] = useState('');
  const assembling = useRef<string>('');
  const svc = getChatService();

  useEffect(() => {
    svc.connect();

    const off = svc.on(({ type, data }) => {
      if (type === 'ws_open') {
        setStatus('ready');
      } else if (type === 'ws_close') {
        setStatus('idle');
      } else if (type === 'assistant_delta') {
        setStatus('typing');
        assembling.current += data?.content ?? '';
        setPartialReply(assembling.current);
      } else if (type === 'assistant_done') {
        if (assembling.current) {
          setMessages((prev) => [...prev, { role: 'ai', text: assembling.current }]);
        }
        assembling.current = '';
        setPartialReply('');
        setStatus('ready');
      } else if (type === 'error') {
        console.error('Chat error:', data);
        setStatus('ready');
      }
    });

    return () => {
      off();
      svc.disconnect();
    };
  }, []);

  const sendMessage = (text: string) => {
    setMessages((prev) => [...prev, { role: 'user', text }]);
    svc.sendUserMessage(text, { source: 'mobile' });
  };

  return { messages, status, partialReply, sendMessage };
}
