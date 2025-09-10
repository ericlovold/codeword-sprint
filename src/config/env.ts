import Constants from 'expo-constants';
import { Platform } from 'react-native';

const envBase =
  Constants?.expoConfig?.extra?.EXPO_PUBLIC_API_BASE ?? process.env.EXPO_PUBLIC_API_BASE;

export const API_BASE =
  envBase || (Platform.OS === 'android' ? 'http://10.0.2.2:9989' : 'http://localhost:9989');

export const REQUEST_TIMEOUT_MS = 12000;
