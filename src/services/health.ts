import { API_BASE_URL } from '../config';

export async function healthCheck(): Promise<boolean> {
  try {
    const r = await fetch(`${API_BASE_URL}/health`);
    return r.ok;
  } catch {
    return false;
  }
}
