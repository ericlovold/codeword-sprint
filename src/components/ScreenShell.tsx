import React from 'react';
import { View, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { colors } from '../theme/tokens';

export default function ScreenShell({ children }: { children: React.ReactNode }) {
  return (
    <View style={StyleSheet.absoluteFill}>
      <LinearGradient
        colors={[colors.gradTop, colors.gradMid, colors.gradBot]}
        start={{ x: 0.1, y: 0 }}
        end={{ x: 0.9, y: 1 }}
        style={{ flex: 1, paddingHorizontal: 16, paddingTop: 16 }}
      >
        {children}
      </LinearGradient>
    </View>
  );
}
