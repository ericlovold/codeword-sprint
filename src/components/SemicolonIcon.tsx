// src/components/SemicolonIcon.tsx
import React from 'react';
import { Image } from 'react-native';

export default function SemicolonIcon({ size = 36 }: { size?: number }) {
  return (
    <Image
      source={require('../../app/assets/icons/SemicolonIconPurple.png')}
      style={{ width: size, height: size, resizeMode: 'contain' }}
    />
  );
}
