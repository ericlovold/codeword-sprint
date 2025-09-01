// src/components/GradientScreen.tsx
import React from 'react';
import { LinearGradient } from 'expo-linear-gradient';
import { gradient } from '../theme/tokens';
import { View, StyleSheet } from 'react-native';

export default function GradientScreen({ children }: { children: React.ReactNode }) {
  return (
    <View style={{ flex: 1 }}>
      <LinearGradient
        colors={gradient.stops}
        locations={gradient.locations}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={StyleSheet.absoluteFill}
      />
      {children}
    </View>
  );
}
