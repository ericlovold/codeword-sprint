import React from 'react';
import { Tabs } from 'expo-router';
import CustomTabBar from '../../src/components/CustomTabBar';

export default function TabLayout() {
  return (
    <Tabs screenOptions={{ headerShown: false }} tabBar={(props) => <CustomTabBar {...props} />}>
      <Tabs.Screen name="chat" options={{ tabBarLabel: 'Codeword' }} />
      <Tabs.Screen name="library" options={{ tabBarLabel: 'Guides' }} />
      <Tabs.Screen name="coach" options={{ tabBarLabel: 'Coach' }} />
      <Tabs.Screen name="profile" options={{ tabBarLabel: 'Profile' }} />
    </Tabs>
  );
}
