import { useEffect, useMemo, useRef, useState } from 'react';
import { WSClient, Outgoing, Incoming } from '../services/wsClient';
import { CFG } from '../config';

const DEMO_REPLIES = [
  "I hear you. You're going through something difficult.",
  'That sounds really challenging. Can you tell me more?',
  "You're not alone in this. Let's work through it together.",
  "It's okay to feel this way. Your feelings are valid.",
];

export type ChatMsg = { role: 'user' | 'ai'; text: string };

export function useChatAgent() {
  const [messages, setMessages] = useState<ChatMsg[]>([]);
  const [status, setStatus] = useState<'idle' | 'connecting' | 'ready' | 'typing'>('idle');
  const [partialReply, setPartialReply] = useState('');
  const sessionRef = useRef(`session-${Date.now()}`);

  const ws = useMemo(() => new WSClient(CFG.WS_URL, CFG.HEADERS), []);

  useEffect(() => {
    ws.setStatusListener((s) => {
      if (s === 'open') setStatus('ready');
      else if (s === 'connecting') setStatus('connecting');
      else setStatus('idle');
    });

    ws.setMessageListener((msg: Incoming) => {
      if (msg.type === 'token') {
        setStatus('typing');
        setPartialReply((p) => p + msg.content);
      } else if (msg.type === 'final') {
        const final = partialReply + (msg.content || '');
        if (final) {
          setMessages((prev) => [...prev, { role: 'ai', text: final }]);
        }
        setPartialReply('');
        setStatus('ready');
      } else if (msg.type === 'message') {
        setMessages((prev) => [...prev, { role: 'ai', text: msg.content }]);
        setStatus('ready');
      } else if (msg.type === 'error') {
        console.error('Chat error:', msg.error);
        setStatus('ready');
      }
    });

    ws.connect();
  }, [ws]);

  const sendMessage = (text: string) => {
    setMessages((prev) => [...prev, { role: 'user', text }]);

    if (CFG.DEMO_MODE && status !== 'ready') {
      // Demo fallback
      setTimeout(() => {
        const reply = DEMO_REPLIES[Math.floor(Math.random() * DEMO_REPLIES.length)];
        setMessages((prev) => [...prev, { role: 'ai', text: reply }]);
      }, 800);
    } else {
      const out: Outgoing = {
        type: 'chat.message',
        text,
        session_id: sessionRef.current,
      };
      ws.send(out);
    }
  };

  return { messages, status, partialReply, sendMessage };
}
