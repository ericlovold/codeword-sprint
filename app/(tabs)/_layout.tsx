import React from 'react';
import { Tabs } from 'expo-router';
import BrandTabBar from '../../src/components/BrandTabBar';

export default function TabLayout() {
  return (
    <Tabs
      tabBar={(props) => <BrandTabBar {...props} />}
      screenOptions={{
        headerShown: false,
      }}
    >
      <Tabs.Screen name="chat" />
      <Tabs.Screen name="library" />
      <Tabs.Screen name="mood" />
      <Tabs.Screen name="profile" />
    </Tabs>
  );
}
