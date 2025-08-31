import React from 'react';
import { Tabs } from 'expo-router';
import { Image, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export const TAB_HEIGHT = 72;

// Better icon mapping with cleaner assets
const ICONS = {
  chat: require('../../app/assets/icons/AiIcon.png'),
  library: require('../../app/assets/icons/AlliesIcon.png'),
  mood: require('../../app/assets/icons/FistBumpIcon002.png'),
  profile: require('../../app/assets/icons/ShieldIcon.png'),
};

function TabPNG({ src, focused }: { src: any; focused: boolean }) {
  return (
    <Image
      source={src}
      style={{
        width: 26,
        height: 26,
        opacity: focused ? 1 : 0.5,
        tintColor: focused ? '#6D4AE7' : '#94A3B8',
      }}
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
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          height: TAB_HEIGHT + insets.bottom,
          paddingBottom: Math.max(insets.bottom, 12),
          paddingTop: 10,
          paddingHorizontal: 8,
          backgroundColor: 'white',
          borderTopLeftRadius: 24,
          borderTopRightRadius: 24,
          borderTopWidth: 0,
          shadowColor: '#000',
          shadowOpacity: 0.08,
          shadowRadius: 16,
          shadowOffset: { width: 0, height: -4 },
          elevation: 10,
        },
        tabBarLabelStyle: {
          fontSize: 11,
          fontWeight: '500',
          marginTop: 4,
        },
        tabBarActiveTintColor: '#6D4AE7',
        tabBarInactiveTintColor: '#94A3B8',
        tabBarIconStyle: {
          marginTop: 4,
        },
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
