export default ({ config }) => {
  const environment = process.env.EXPO_PUBLIC_ENV || 'development';

  // Centralized API configuration
  const apiConfig = {
    development: {
      API_BASE: process.env.API_BASE || 'http://localhost:9989',
      WS_URL: process.env.WS_URL || 'ws://localhost:9989/ws',
      API_BASE_URL: process.env.API_BASE_URL || 'http://localhost:9989',
    },
    staging: {
      API_BASE: 'https://api.codeword.app/v1',
      WS_URL: 'wss://api.codeword.app/ws/chat',
      API_BASE_URL: 'https://api.codeword.app',
    },
    production: {
      API_BASE: 'https://api.codeword.app/v1',
      WS_URL: 'wss://api.codeword.app/ws/chat',
      API_BASE_URL: 'https://api.codeword.app',
    },
  };

  const currentConfig = apiConfig[environment] || apiConfig.development;

  return {
    ...config,
    extra: {
      ...config.extra,
      environment,
      ...currentConfig,
      CLIENT_NAME: 'codeword-app',
      CLIENT_VERSION: '0.1.0',
      buildTime: new Date().toISOString(),
    },
  };
};
