import { Stack } from 'expo-router';

export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen name="help" options={{ headerShown: false, presentation: 'modal' }} />
      {/* Library detail route */}
      <Stack.Screen name="library/questions" options={{ headerShown: false }} />
    </Stack>
  );
}
