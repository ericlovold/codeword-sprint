import { WS_URL, API_BASE_URL, CLIENT_NAME, CLIENT_VER } from '../config';

// simple pub/sub
type Listener = (chunk: { type: string; data?: any }) => void;

export class ChatService {
  private ws?: WebSocket;
  private listeners = new Set<Listener>();
  private queue: any[] = [];
  private reconnectTimer?: any;
  private connected = false;
  private closedByUser = false;

  constructor(private sessionId: string) {}

  on(fn: Listener) {
    this.listeners.add(fn);
    return () => this.listeners.delete(fn);
  }
  private emit(evt: { type: string; data?: any }) {
    this.listeners.forEach((l) => l(evt));
  }

  connect() {
    this.closedByUser = false;
    this.open();
  }

  disconnect() {
    this.closedByUser = true;
    this.ws?.close();
    this.ws = undefined;
  }

  private open(attempt = 0) {
    if (this.closedByUser) return;
    try {
      this.ws = new WebSocket(`${WS_URL}?session=${encodeURIComponent(this.sessionId)}`);
      this.ws.onopen = () => {
        this.connected = true;
        this.emit({ type: 'ws_open' });
        // flush queued messages
        for (const msg of this.queue) this.ws?.send(JSON.stringify(msg));
        this.queue = [];
      };
      this.ws.onmessage = (ev) => {
        try {
          const m = JSON.parse(String(ev.data));
          // expected types: assistant_delta, assistant_done, error, info
          if (m.type) this.emit({ type: m.type, data: m });
        } catch {
          // tolerate server sending raw tokens
          this.emit({ type: 'assistant_delta', data: { content: String(ev.data) } });
        }
      };
      this.ws.onclose = () => {
        this.connected = false;
        this.emit({ type: 'ws_close' });
        if (!this.closedByUser) {
          const delay = Math.min(16000, 1000 * Math.pow(2, attempt)); // backoff
          clearTimeout(this.reconnectTimer);
          this.reconnectTimer = setTimeout(() => this.open(attempt + 1), delay);
        }
      };
      this.ws.onerror = () => {
        this.emit({ type: 'ws_error' });
      };
    } catch {
      // try again shortly
      const delay = Math.min(16000, 1000 * Math.pow(2, attempt));
      clearTimeout(this.reconnectTimer);
      this.reconnectTimer = setTimeout(() => this.open(attempt + 1), delay);
    }
  }

  /** Send a user message; streams assistant via events. */
  sendUserMessage(text: string, meta?: Record<string, any>) {
    const payload = {
      type: 'user_message',
      content: text,
      metadata: {
        ...meta,
        client: CLIENT_NAME,
        version: CLIENT_VER,
      },
    };
    if (this.connected && this.ws?.readyState === 1) {
      this.ws.send(JSON.stringify(payload));
    } else {
      // queue for when WS opens; also trigger HTTP fallback
      this.queue.push(payload);
      this.httpFallback(text, meta).catch(() => {});
    }
  }

  private async httpFallback(text: string, meta?: Record<string, any>) {
    try {
      const res = await fetch(`${API_BASE_URL}/v1/chat`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-Client': CLIENT_NAME,
          'X-Version': CLIENT_VER,
        },
        body: JSON.stringify({
          session: this.sessionId,
          message: text,
          metadata: meta ?? {},
        }),
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const json = await res.json();
      // normalize to the same events UI expects
      if (json.reply) {
        this.emit({ type: 'assistant_delta', data: { content: json.reply } });
        this.emit({ type: 'assistant_done' });
      }
    } catch (err) {
      this.emit({ type: 'error', data: { where: 'http_fallback', err: String(err) } });
    }
  }
}

// singleton for convenience
let _service: ChatService | null = null;
export const getChatService = () => (_service ??= new ChatService('local-session'));
