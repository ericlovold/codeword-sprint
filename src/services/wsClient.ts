type Listener<T> = (msg: T) => void;

export type Incoming =
  | { type: 'token'; content: string }
  | { type: 'message'; content: string }
  | { type: 'final'; content?: string }
  | { type: 'error'; error: string };

export type Outgoing = {
  type: 'chat.message';
  text: string;
  session_id?: string;
  meta?: Record<string, any>;
};

export class WSClient {
  private url: string;
  private headers: Record<string, string>;
  private ws?: WebSocket;
  private backoff = 500;
  private maxBackoff = 8000;
  private queue: Outgoing[] = [];
  private onMsg: Listener<Incoming> | null = null;
  private onStatus: Listener<'connecting' | 'open' | 'closed'> | null = null;

  constructor(url: string, headers: Record<string, string> = {}) {
    this.url = url;
    this.headers = headers;
  }

  setMessageListener(cb: Listener<Incoming>) {
    this.onMsg = cb;
  }
  setStatusListener(cb: Listener<'connecting' | 'open' | 'closed'>) {
    this.onStatus = cb;
  }

  connect() {
    this.onStatus?.('connecting');

    // Attach headers via query params (simple & server-friendly)
    const q = new URLSearchParams(this.headers).toString();
    const ws = new WebSocket(`${this.url}?${q}`);
    this.ws = ws;

    ws.onopen = () => {
      this.onStatus?.('open');
      this.backoff = 500;
      // flush
      for (const m of this.queue.splice(0)) ws.send(JSON.stringify(m));
    };

    ws.onmessage = (ev) => {
      try {
        const msg: Incoming = JSON.parse(ev.data);
        this.onMsg?.(msg);
      } catch {}
    };

    ws.onerror = () => {
      /* noop: handled by onclose */
    };

    ws.onclose = () => {
      this.onStatus?.('closed');
      setTimeout(() => this.connect(), this.backoff);
      this.backoff = Math.min(this.backoff * 2, this.maxBackoff);
    };
  }

  send(msg: Outgoing) {
    if (this.ws && this.ws.readyState === 1) {
      this.ws.send(JSON.stringify(msg));
    } else {
      this.queue.push(msg);
    }
  }
}
