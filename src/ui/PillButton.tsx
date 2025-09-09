import React from 'react';
import { Text, TouchableOpacity, ViewStyle } from 'react-native';

type Props = {
  title: string;
  onPress?: () => void;
  variant?: 'primary' | 'secondary';
  style?: ViewStyle;
};

export default function PillButton({ title, onPress, variant = 'primary', style }: Props) {
  const isPrimary = variant === 'primary';
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[
        {
          height: 56,
          borderRadius: 28,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: isPrimary ? '#5A3FA6' : '#EDE5FF',
          borderWidth: isPrimary ? 0 : 1,
          borderColor: 'rgba(0,0,0,0.08)',
          paddingHorizontal: 20,
        },
        style,
      ]}
      accessibilityRole="button"
    >
      <Text
        style={{
          color: isPrimary ? 'white' : '#0F172A',
          fontFamily: 'Inter_600SemiBold',
          fontSize: 18,
        }}
      >
        {title}
      </Text>
    </TouchableOpacity>
  );
}
