import React from 'react';
import { Tabs, useRouter } from 'expo-router';
import { Image, Pressable, View, Platform } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

// Brand
const PURPLE = '#6B35DB';
const INACTIVE = '#9AA0A6';

// ---- PNG sources (adjust to your preferred files) ----
// Use exact filenames, including spaces, since Metro requires static strings.
const ChatPNG = require('../assets/icons/ChatAi ICON.png');
const LibraryPNG = require('../assets/icons/CodewordLogo.png'); // placeholder "book-ish" mark
const MoodPNG = require('../assets/icons/FistBumpIcon002.png'); // placeholder for mood
const ProfilePNG = require('../assets/icons/AlliesIcon.png'); // placeholder for profile
const SemicolonPNG = require('../assets/icons/SemicolonIconPurple.png');

// Small wrapper so we don't repeat styles
function TabPng({ src, color, size = 26 }: { src: any; color: string; size?: number }) {
  return (
    <Image
      source={src}
      // If your PNGs are single-color glyphs, tint works great for active/inactive.
      // If an icon is multi-color and you don't want tinting, remove the tintColor line.
      style={{ width: size, height: size, resizeMode: 'contain', tintColor: color }}
    />
  );
}

function CenterTabButton(props: any) {
  const router = useRouter();

  return (
    <Pressable
      accessibilityLabel="Get help"
      onPress={() => router.push('/help')}
      style={[
        {
          alignItems: 'center',
          justifyContent: 'center',
          width: 68,
          height: 68,
          borderRadius: 34,
          backgroundColor: 'white',
          shadowColor: '#000',
          shadowOpacity: 0.18,
          shadowRadius: 10,
          shadowOffset: { width: 0, height: 4 },
          elevation: 6,
          // Tweak this to nudge vertical alignment over the tab bar:
          transform: [{ translateY: Platform.OS === 'ios' ? -4 : -2 }],
        },
        props.style,
      ]}
      hitSlop={16}
    >
      <Image
        source={SemicolonPNG}
        style={{ width: 46, height: 46, resizeMode: 'contain', tintColor: PURPLE }}
      />
    </Pressable>
  );
}

export default function TabLayout() {
  const { bottom } = useSafeAreaInsets();

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: true,
        tabBarActiveTintColor: PURPLE,
        tabBarInactiveTintColor: INACTIVE,
        tabBarLabelStyle: { fontSize: 12, marginTop: 4 },
        tabBarStyle: {
          height: bottom + 72,
          paddingTop: 10,
          paddingBottom: bottom + 12,
          backgroundColor: 'white',
          borderTopWidth: 0,
          shadowColor: '#000',
          shadowOpacity: 0.08,
          shadowRadius: 12,
          shadowOffset: { width: 0, height: -2 },
          elevation: 8,
        },
      }}
    >
      <Tabs.Screen
        name="chat"
        options={{
          title: 'Chat',
          tabBarIcon: ({ color }) => <TabPng src={ChatPNG} color={color} />,
        }}
      />

      <Tabs.Screen
        name="library"
        options={{
          title: 'Library',
          tabBarIcon: ({ color }) => <TabPng src={LibraryPNG} color={color} />,
        }}
      />

      {/* Center "semicolon" pseudo-tab (no label) */}
      <Tabs.Screen
        name="codeword"
        options={{
          title: '',
          tabBarLabel: () => null,
          tabBarIcon: () => null,
          tabBarButton: (props) => <CenterTabButton {...props} />,
        }}
      />

      <Tabs.Screen
        name="mood"
        options={{
          title: 'Mood',
          tabBarIcon: ({ color }) => <TabPng src={MoodPNG} color={color} />,
        }}
      />

      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profile',
          tabBarIcon: ({ color }) => <TabPng src={ProfilePNG} color={color} />,
        }}
      />
    </Tabs>
  );
}
