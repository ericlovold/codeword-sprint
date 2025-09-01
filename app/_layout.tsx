// app/_layout.tsx
import { Stack } from 'expo-router';
import { SafeAreaProvider } from 'react-native-safe-area-context';

export default function RootLayout() {
  return (
    <SafeAreaProvider>
      <Stack screenOptions={{ headerShown: false }}>
        {/* Tabs are the main shell */}
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />

        {/* Non-tab screens live here and get a back arrow automatically */}
        <Stack.Screen
          name="help"
          options={{
            title: 'Get Help',
            headerShown: true,
            presentation: 'card', // full page (change to "modal" if you want a sheet)
          }}
        />

        {/* No dead ends */}
        <Stack.Screen name="+not-found" options={{ title: 'Oops', headerShown: true }} />
      </Stack>
    </SafeAreaProvider>
  );
}
