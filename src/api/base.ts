import { API_BASE, REQUEST_TIMEOUT_MS } from '../config/env';
import { withTimeout } from '../utils/network';
import AsyncStorage from '@react-native-async-storage/async-storage';
import NetInfo from '@react-native-community/netinfo';

export class ApiError extends Error {
  status?: number;
  constructor(message: string, status?: number) {
    super(message);
    this.status = status;
  }
}

export async function apiFetch<T>(
  path: string,
  opts: RequestInit & { token?: string; skipAuth?: boolean } = {},
): Promise<T> {
  const { token, skipAuth, ...rest } = opts;

  // Check network connectivity first
  const netInfo = await NetInfo.fetch();
  if (!netInfo.isConnected) {
    throw new ApiError('No internet connection. Please check your network and try again.');
  }

  const headers = new Headers(rest.headers || {});
  headers.set('Content-Type', 'application/json');
  headers.set('X-Client', 'codeword-sprint');
  headers.set('X-Version', '1.0.0');

  // Automatically add auth token if available and not skipped
  if (!skipAuth) {
    const authToken = token || (await AsyncStorage.getItem('auth.token'));
    if (authToken) {
      // Allow certain endpoints for guest users
      const isGuestToken = authToken.startsWith('guest_');
      const guestAllowedPaths = ['/chat', '/api/chat', '/sessions/create'];
      const isAllowedForGuest = guestAllowedPaths.some((allowed) => path.includes(allowed));

      if (isGuestToken && !isAllowedForGuest) {
        throw new ApiError('Feature not available in guest mode. Please sign in to continue.');
      }

      // For guest users on allowed endpoints, don't send the guest token to backend
      if (!isGuestToken) {
        headers.set('Authorization', `Bearer ${authToken}`);
      }
    }
  }

  try {
    const res = await withTimeout(
      fetch(`${API_BASE}${path}`, { ...rest, headers }),
      REQUEST_TIMEOUT_MS,
    );

    if (!res.ok) {
      let msg = `HTTP ${res.status}`;
      try {
        const j = await res.json();
        if (j?.error) msg = j.error;
        else if (j?.message) msg = j.message;
      } catch {}

      // Provide user-friendly error messages
      if (res.status === 429) {
        throw new ApiError(
          'Rate limit exceeded. Please wait a moment before trying again.',
          res.status,
        );
      } else if (res.status >= 500) {
        throw new ApiError(
          'Server temporarily unavailable. Please try again in a moment.',
          res.status,
        );
      } else if (res.status === 401) {
        throw new ApiError('Authentication failed. Please sign in again.', res.status);
      } else if (res.status === 403) {
        throw new ApiError('Access denied. Please check your permissions.', res.status);
      } else {
        throw new ApiError(msg, res.status);
      }
    }

    return (await res.json()) as T;
  } catch (error: any) {
    if (error instanceof ApiError) {
      throw error;
    }
    if (error.message?.includes('timed out')) {
      throw new ApiError('Request timed out. Please check your connection and try again.');
    }
    if (error.message?.includes('Network request failed') || error.code === 'NETWORK_ERROR') {
      throw new ApiError('Unable to connect. Please check your internet connection.');
    }
    throw new ApiError('Connection failed. Please try again.');
  }
}
