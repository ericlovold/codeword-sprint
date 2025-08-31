import React from 'react';
import { View } from 'react-native';
import { Slot } from 'expo-router';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import SemicolonFAB from '../src/components/SemicolonFAB';

export default function RootLayout() {
  return (
    <SafeAreaProvider>
      <View style={{ flex: 1 }}>
        <Slot />
        <SemicolonFAB />
      </View>
    </SafeAreaProvider>
  );
}
