import { API_BASE, WS_URL } from './config';

type Message = { id: string; role: 'user' | 'assistant'; text: string };

export class ChatClient {
  private ws?: WebSocket;
  private queue: {
    id: string;
    text: string;
    resolve: (t: string) => void;
    reject: (e: any) => void;
  }[] = [];
  private connecting = false;

  async send(text: string): Promise<string> {
    try {
      const reply = await this.tryWebSocket(text);
      return reply;
    } catch {
      try {
        const r = await fetch(`${API_BASE}/respond`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ text }),
        });
        if (!r.ok) throw new Error(`HTTP ${r.status}`);
        const json = await r.json();
        return String(json.reply ?? '');
      } catch {
        // Never block the UI: graceful demo fallback
        return `(demo) I hear you: "${text}". Tell me more.`;
      }
    }
  }

  private async ensureWS(): Promise<void> {
    if (this.ws && this.ws.readyState === 1) return;
    if (this.connecting) return;
    this.connecting = true;
    await new Promise<void>((resolve) => {
      const ws = new WebSocket(WS_URL);
      this.ws = ws;
      ws.onopen = () => {
        this.connecting = false;
        resolve();
      };
      ws.onclose = () => {
        this.ws = undefined;
        this.connecting = false;
      };
      ws.onerror = () => {
        try {
          ws.close();
        } catch {}
        this.ws = undefined;
        this.connecting = false;
        resolve();
      };
    });
  }

  private async tryWebSocket(text: string): Promise<string> {
    await this.ensureWS();
    if (!this.ws || this.ws.readyState !== 1) throw new Error('ws not open');

    const id = Math.random().toString(36).slice(2);
    return new Promise<string>((resolve, reject) => {
      const payload = JSON.stringify({ id, text });
      const ws = this.ws!;
      const onMessage = (ev: MessageEvent) => {
        try {
          const msg = JSON.parse(String(ev.data));
          if (msg?.id === id && typeof msg.reply === 'string') {
            ws.removeEventListener('message', onMessage as any);
            resolve(msg.reply);
          }
        } catch {}
      };
      ws.addEventListener('message', onMessage as any);
      try {
        ws.send(payload);
      } catch (e) {
        ws.removeEventListener('message', onMessage as any);
        reject(e);
      }
      // Safety timeout
      setTimeout(() => {
        ws.removeEventListener('message', onMessage as any);
        reject(new Error('ws timeout'));
      }, 8000);
    });
  }
}

export const chatClient = new ChatClient();
