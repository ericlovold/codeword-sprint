import React from 'react';
import { View } from 'react-native';
import Svg, { G, Path, Defs, ClipPath, Rect } from 'react-native-svg';

// If Figma Make exported paths in a separate module, you can paste them here.
// For now we consume a single path prop to keep it flexible.
type Props = { path?: string; fill?: string; stroke?: string; size?: number };

export default function Layer1({ path, fill = '#F9F7F3', stroke = '#F9F7F3', size = 103 }: Props) {
  return (
    <View style={{ width: size, height: size }}>
      <Svg width={size} height={size} viewBox="0 0 103 103" fill="none" preserveAspectRatio="none">
        <G clipPath="url(#clip0_10_37)">
          {path ? <Path d={path} fill={fill} stroke={stroke} strokeMiterlimit={10} /> : null}
        </G>
        <Defs>
          <ClipPath id="clip0_10_37">
            <Rect width="103" height="103" fill="white" />
          </ClipPath>
        </Defs>
      </Svg>
    </View>
  );
}
