import React from 'react';
import { Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import BrandTabBar from '../../src/components/BrandTabBar';

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
            <Ionicons name="chatbubble-ellipses-outline" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="library"
        options={{
          title: 'Library',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="book-outline" size={size} color={color} />
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
            <Ionicons name="sparkles-outline" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profile',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="person-outline" size={size} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
