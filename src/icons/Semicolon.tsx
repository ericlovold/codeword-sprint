import React from "react";
import Svg, { Path } from "react-native-svg";
// expects: src/figma/svg-vp8eahfw74.ts exporting default { p18027b80: string }
import paths from "../figma/svg-vp8eahfw74";

export default function Semicolon({
  color = "#5A3FA6",
  size = 28,           // width, height scales with viewBox
  strokeWidth = 3.76,
}: { color?: string; size?: number; strokeWidth?: number }) {
  const d = (paths as any)?.p18027b80; // Figma Make key
  return (
    <Svg width={size} height={size * (23/12)} viewBox="0 0 12 23" fill="none">
      <Path d={d} stroke={color} strokeWidth={strokeWidth} strokeMiterlimit={10} />
    </Svg>
  );
}
