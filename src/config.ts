import Constants from 'expo-constants';
const extra = (Constants.expoConfig as any)?.extra ?? {};

export const API_BASE_URL = extra.API_BASE_URL as string;
export const WS_URL = extra.WS_URL as string;
export const CLIENT_NAME = extra.CLIENT_NAME ?? 'codeword-app';
export const CLIENT_VER = extra.CLIENT_VERSION ?? '0.1.0';

// Legacy CFG for backward compatibility
export const CFG = {
  WS_URL: WS_URL || 'ws://localhost:8000/ws/chat',
  DEMO_MODE: true,
  HEADERS: {
    'X-Client': CLIENT_NAME,
    'X-Version': CLIENT_VER,
  },
};
