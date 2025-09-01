export const CFG = {
  WS_URL: process.env.EXPO_PUBLIC_WS_URL || 'ws://localhost:8000/ws/chat',
  // When true, we echo back demo text if WS not available
  DEMO_MODE: (process.env.EXPO_PUBLIC_DEMO_MODE || 'true') === 'true',
  HEADERS: {
    'X-Client': 'codeword-app',
    'X-Version': '1.0.0',
  },
};
