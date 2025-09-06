// src/lib/net.ts
type Method = 'GET' | 'POST';
const CONNECT_TIMEOUT = 15_000;
const READ_TIMEOUT = 60_000;
const MAX_RETRIES = 2;

let failureTimestamps: number[] = [];
let circuitOpenUntil = 0;

function isCircuitOpen() {
  const now = Date.now();
  if (now < circuitOpenUntil) return true;
  // clean window
  failureTimestamps = failureTimestamps.filter((t) => now - t < 30_000);
  return false;
}
function recordFailure() {
  const now = Date.now();
  failureTimestamps.push(now);
  // 5 failures / 30s -> open 10s
  if (failureTimestamps.length >= 5) circuitOpenUntil = now + 10_000;
}
function recordSuccess() {
  failureTimestamps = [];
  circuitOpenUntil = 0;
}

export async function resilientFetch(url: string, opts: RequestInit & { method?: Method } = {}) {
  const now = Date.now();
  if (isCircuitOpen()) {
    const ms = circuitOpenUntil - now;
    throw Object.assign(new Error('CIRCUIT_OPEN'), { retryIn: ms });
  }

  let attempt = 0;
  let lastErr: any;

  while (attempt <= MAX_RETRIES) {
    const controller = new AbortController();
    const connectTimer = setTimeout(() => controller.abort(), CONNECT_TIMEOUT);

    try {
      const started = Date.now();
      const res = await fetch(url, {
        ...opts,
        signal: controller.signal,
        headers: {
          'X-Client': 'codeword/ios',
          'X-Version': '1.0.0 (100)',
          ...(opts.headers || {}),
        },
      });

      clearTimeout(connectTimer);

      // honor 429
      if (res.status === 429) {
        const ra = res.headers.get('Retry-After');
        const waitMs = ra ? Number(ra) * 1000 : 2_000 * (attempt + 1);
        await new Promise((r) => setTimeout(r, waitMs));
        attempt++;
        continue;
      }

      if (res.status >= 500) throw new Error(`HTTP_${res.status}`);

      if (res.status >= 400) {
        // do not retry 4xx
        recordFailure();
        return res;
      }

      // optional read timeout
      const elapsed = Date.now() - started;
      if (elapsed > READ_TIMEOUT) throw new Error('READ_TIMEOUT');

      recordSuccess();
      return res;
    } catch (e: any) {
      clearTimeout(connectTimer);
      lastErr = e;
      recordFailure();
      if (attempt >= MAX_RETRIES) break;
      // backoff + jitter
      const delay = 500 * 2 ** attempt + Math.floor(Math.random() * 1000);
      await new Promise((r) => setTimeout(r, delay));
      attempt++;
    }
  }

  throw lastErr ?? new Error('NETWORK_FAILURE');
}
