// app/+not-found.tsx
import { Redirect } from 'expo-router';

export default function NotFound() {
  // Auto-redirect any 404s back to codeword tab
  return <Redirect href="/(tabs)/codeword" />;
}
