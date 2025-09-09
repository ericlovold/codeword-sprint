import React from 'react';
import { Image, ImageSourcePropType } from 'react-native';

export default function TintedIcon({
  source,
  size = 32,
  tintColor = '#6A35B7',
}: {
  source: ImageSourcePropType;
  size?: number;
  tintColor?: string;
}) {
  return (
    <Image source={source} style={{ width: size, height: size, tintColor }} resizeMode="contain" />
  );
}
