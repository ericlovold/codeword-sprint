import React from 'react';
import { Tabs } from 'expo-router';
import { Image } from 'react-native';
import BrandTabBar from '../../src/components/BrandTabBar';

const ChatPNG = require('../assets/icons/ChatAi ICON.png');
const LibraryPNG = require('../assets/icons/AiIcon.png');
const MoodPNG = require('../assets/icons/FistBumpIcon002.png');
const ProfilePNG = require('../assets/icons/AlliesIcon.png');

export default function TabLayout() {
  return (
    <Tabs
      tabBar={(props) => <BrandTabBar {...props} />}
      screenOptions={{
        headerShown: false,
      }}
    >
      <Tabs.Screen
        name="chat"
        options={{
          title: 'Chat',
          tabBarIcon: ({ color, size }) => (
            <Image source={ChatPNG} style={{ width: size, height: size, tintColor: color }} />
          ),
        }}
      />
      <Tabs.Screen
        name="library"
        options={{
          title: 'Library',
          tabBarIcon: ({ color, size }) => (
            <Image source={LibraryPNG} style={{ width: size, height: size, tintColor: color }} />
          ),
        }}
      />
      <Tabs.Screen
        name="mood"
        options={{
          title: 'Mood',
          tabBarIcon: ({ color, size }) => (
            <Image source={MoodPNG} style={{ width: size, height: size, tintColor: color }} />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profile',
          tabBarIcon: ({ color, size }) => (
            <Image source={ProfilePNG} style={{ width: size, height: size, tintColor: color }} />
          ),
        }}
      />
    </Tabs>
  );
}
