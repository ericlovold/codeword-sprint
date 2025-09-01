export const RUNTIME = {
  ENV: process.env.EXPO_PUBLIC_ENV ?? 'production',
  API_BASE_URL: process.env.EXPO_PUBLIC_CHAT_API_BASE_URL ?? 'https://api.xcai.com/v1',
  TELEMETRY_DSN: process.env.EXPO_PUBLIC_SENTRY_DSN ?? '',
  SAFETY_MODE: (process.env.EXPO_PUBLIC_SAFETY_MODE ?? 'on') === 'on',
  HIPAA_MODE: (process.env.EXPO_PUBLIC_HIPAA_MODE ?? 'on') === 'on',
};
