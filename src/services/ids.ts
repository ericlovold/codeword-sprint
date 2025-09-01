export const sessionId = `sess_${Math.random().toString(36).slice(2)}`;
export const traceId = () => `trace_${Date.now()}_${Math.random().toString(36).slice(2)}`;
