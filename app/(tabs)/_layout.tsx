import React from 'react';
import { Tabs } from 'expo-router';
import { Image } from 'react-native';
import BrandTabBar from '../../src/components/BrandTabBar';

// Tab PNG icons
const TabChatPNG = require('../assets/icons/tabs/TabChat.png');
const TabLibraryPNG = require('../assets/icons/tabs/TabLibrary.png');
const TabCoachPNG = require('../assets/icons/tabs/TabCoach.png');
const TabProfilePNG = require('../assets/icons/tabs/TabProfile.png');

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: true, // BrandTabBar draws labels for side tabs
      }}
      tabBar={(props) => <BrandTabBar {...props} />}
    >
      <Tabs.Screen
        name="chat"
        options={{
          title: 'Chat',
          tabBarIcon: ({ color, size }) => (
            <Image source={TabChatPNG} style={{ width: size, height: size, tintColor: color }} />
          ),
        }}
      />
      <Tabs.Screen
        name="library"
        options={{
          title: 'Library',
          tabBarIcon: ({ color, size }) => (
            <Image source={TabLibraryPNG} style={{ width: size, height: size, tintColor: color }} />
          ),
        }}
      />

      {/* The middle route (whatever is 3rd) becomes the big semicolon. 
          You can point it to your primary screen (chat) or a central "Codeword" hub. */}
      <Tabs.Screen
        name="codeword"
        options={{
          title: 'Codeword', // label won't show for center button
          tabBarIcon: () => null, // ignored by BrandTabBar center slot
        }}
      />

      <Tabs.Screen
        name="mood"
        options={{
          title: 'Coach',
          tabBarIcon: ({ color, size }) => (
            <Image source={TabCoachPNG} style={{ width: size, height: size, tintColor: color }} />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profile',
          tabBarIcon: ({ color, size }) => (
            <Image source={TabProfilePNG} style={{ width: size, height: size, tintColor: color }} />
          ),
        }}
      />
    </Tabs>
  );
}
