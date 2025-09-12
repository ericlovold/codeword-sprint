import Constants from 'expo-constants';

type Extra = { EXPO_PUBLIC_API_BASE?: string; WS_URL?: string } | undefined;

const extra = (Constants?.expoConfig?.extra as Extra) ?? {};

export const API_BASE = extra.EXPO_PUBLIC_API_BASE ?? 'http://localhost:9989';
export const WS_URL = extra.WS_URL ?? 'ws://localhost:9989/ws';
