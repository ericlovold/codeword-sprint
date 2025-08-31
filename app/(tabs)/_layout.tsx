import React from 'react';
import { Tabs } from 'expo-router';
import { Image } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export const TAB_HEIGHT = 64;

// Map tab icons to your assets (adjust to taste)
const ICONS = {
  chat: require('../../app/assets/icons/ChatAi ICON.png'),
  library: require('../../app/assets/icons/AlliesIcon.png'),
  mood: require('../../app/assets/icons/FistBumpIcon002.png'),
  profile: require('../../app/assets/icons/ShieldIcon.png'),
};

function TabPNG({ src, focused }: { src: any; focused: boolean }) {
  return (
    <Image
      source={src}
      style={{ width: 24, height: 24, opacity: focused ? 1 : 0.6 }}
      resizeMode="contain"
    />
  );
}

export default function TabLayout() {
  const insets = useSafeAreaInsets();

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          height: TAB_HEIGHT + insets.bottom,
          paddingBottom: Math.max(insets.bottom, 10),
          paddingTop: 8,
          backgroundColor: 'white',
        },
        tabBarLabelStyle: { fontSize: 12 },
      }}
    >
      <Tabs.Screen
        name="chat"
        options={{
          title: 'Chat',
          tabBarIcon: ({ focused }) => <TabPNG src={ICONS.chat} focused={focused} />,
        }}
      />
      <Tabs.Screen
        name="library"
        options={{
          title: 'Library',
          tabBarIcon: ({ focused }) => <TabPNG src={ICONS.library} focused={focused} />,
        }}
      />
      <Tabs.Screen
        name="mood"
        options={{
          title: 'Mood',
          tabBarIcon: ({ focused }) => <TabPNG src={ICONS.mood} focused={focused} />,
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profile',
          tabBarIcon: ({ focused }) => <TabPNG src={ICONS.profile} focused={focused} />,
        }}
      />
    </Tabs>
  );
}
