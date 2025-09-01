import * as Linking from 'expo-linking';

export const DEMO_MODE = true;

const open = async (url: string) => {
  const can = await Linking.canOpenURL(url);
  if (can) await Linking.openURL(url);
};

export const callNumber = async (num: string) => {
  if (DEMO_MODE) return;
  await open(`tel:${num}`);
};

export const smsNumber = async (num: string, body?: string) => {
  if (DEMO_MODE) return;
  const encoded = body ? `&body=${encodeURIComponent(body)}` : '';
  await open(`sms:${num}?${encoded}`);
};
