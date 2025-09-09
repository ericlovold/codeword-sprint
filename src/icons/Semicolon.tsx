import React from 'react';
import { Text, View } from 'react-native';
import Svg, { Path } from 'react-native-svg';

export default function Semicolon({
  color = '#5A3FA6',
  size = 26,
}: {
  color?: string;
  size?: number;
}) {
  // Try to use Figma path if available; else show fallback glyph.
  let d: string | undefined;
  try {
    // expects src/figma/svg-vp8eahfw74.ts exporting default { p18027b80: string }
    // @ts-ignore
    const paths = require('../figma/svg-vp8eahfw74').default;
    d = paths?.p18027b80;
  } catch {}
  if (!d) {
    return (
      <View style={{ width: size, height: size, alignItems: 'center', justifyContent: 'center' }}>
        <Text style={{ color, fontSize: size * 0.9, fontWeight: '900', lineHeight: size * 1.05 }}>
          ;
        </Text>
      </View>
    );
  }
  const h = size * (23 / 12);
  return (
    <Svg width={size} height={h} viewBox="0 0 12 23" fill="none">
      <Path d={d} stroke={color} strokeWidth={3.76} strokeMiterlimit={10} />
    </Svg>
  );
}
