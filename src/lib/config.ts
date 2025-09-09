import Constants from 'expo-constants';

type Extra = { apiBase?: string; wsUrl?: string } | undefined;

const extra = (Constants?.expoConfig?.extra as Extra) ?? {};

export const API_BASE = extra.apiBase ?? 'http://localhost:9988';
export const WS_URL = extra.wsUrl ?? 'ws://localhost:9988/ws';
