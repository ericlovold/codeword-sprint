import React from 'react';
import { Tabs } from 'expo-router';
import { Image } from 'react-native';
import BrandHeader from '../../src/components/BrandHeader';
import CWTabBar from '../../src/components/CWTabBar';
import { colors } from '../../src/theme/tokens';

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        header: () => <BrandHeader />,
        tabBar: (props) => <CWTabBar {...props} />,
        tabBarShowLabel: true,
      }}
    >
      <Tabs.Screen
        name="chat"
        options={{
          title: 'Codeword',
          tabBarLabel: 'Codeword',
          tabBarIcon: ({ color }) => (
            <Image
              source={require('../../assets/icons/tabs/TabChat.png')}
              style={{ width: 22, height: 22, tintColor: color }}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="library"
        options={{
          title: 'Guides',
          tabBarLabel: 'Guides',
          tabBarIcon: ({ color }) => (
            <Image
              source={require('../../assets/icons/tabs/TabLibrary.png')}
              style={{ width: 22, height: 22, tintColor: color }}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="launchpad"
        options={{
          tabBarLabel: 'Launchpad', // middle slot; label hidden by custom bar
          tabBarIcon: () => null,
        }}
      />
      <Tabs.Screen
        name="coach"
        options={{
          title: 'Coach',
          tabBarLabel: 'Coach',
          tabBarIcon: ({ color }) => (
            <Image
              source={require('../../assets/icons/tabs/TabCoach.png')}
              style={{ width: 22, height: 22, tintColor: color }}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profile',
          tabBarLabel: 'Profile',
          tabBarIcon: ({ color }) => (
            <Image
              source={require('../../assets/icons/tabs/TabProfile.png')}
              style={{ width: 22, height: 22, tintColor: color }}
            />
          ),
        }}
      />
    </Tabs>
  );
}
