import React from 'react';
import { Image, ImageSourcePropType } from 'react-native';

export default function HeaderIcon({
  source,
  size = 24,
  tintColor,
}: {
  source: ImageSourcePropType;
  size?: number;
  tintColor?: string;
}) {
  return (
    <Image source={source} style={{ width: size, height: size, tintColor }} resizeMode="contain" />
  );
}
