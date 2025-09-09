// src/components/GradientScreen.tsx
import React from 'react';
import { View } from 'react-native';

export default function GradientScreen({ children }: { children: React.ReactNode }) {
  return <View style={{ flex: 1, backgroundColor: '#FFFFFF' }}>{children}</View>;
}
