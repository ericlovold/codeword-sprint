import React from 'react';
import { Image, View, ViewStyle } from 'react-native';

type IconName = 'home' | 'guides' | 'coach' | 'profile' | 'info' | 'send' | 'semicolon';

// Map icon names to actual PNG assets
const iconMap = {
  home: require('../../assets/icons/tabs/TabCoach.png'), // Home icon shows AI icon (goes to chat)
  guides: require('../../assets/icons/tabs/TabLibrary.png'),
  coach: require('../../assets/icons/tabs/TabChat.png'), // Coach icon shows home icon (goes to "how are you feeling")
  profile: require('../../assets/icons/tabs/TabProfile.png'),
  info: require('../../assets/icons/tabs/TabSemicolon.png'),
  semicolon: require('../../assets/icons/semicolon.png'),
  send: require('../../assets/icons/brand/SendChevron.png'),
};

export default function Icon({
  name,
  size = 22,
  color,
  style,
}: {
  name: IconName;
  size?: number;
  color?: string;
  style?: ViewStyle;
}) {
  // For PNG icons, we'll use tintColor for coloring
  return (
    <Image
      source={iconMap[name]}
      style={[
        {
          width: size,
          height: size,
          tintColor: color,
        },
        style,
      ]}
      resizeMode="contain"
    />
  );
}
