import React from 'react';
import { Tabs } from 'expo-router';
import BrandHeader from '../../src/components/BrandHeader';
import CWTabBar from '../../src/components/CWTabBar';

const getIcon = (routeName: string, focused: boolean) => {
  switch (routeName) {
    case 'chat':
      return require('../../assets/icons/tabs/TabChat.png');
    case 'library':
      return require('../../assets/icons/tabs/TabLibrary.png');
    case 'coach':
      return require('../../assets/icons/tabs/TabCoach.png');
    case 'profile':
      return require('../../assets/icons/tabs/TabProfile.png');
    default:
      return require('../../assets/icons/tabs/TabChat.png');
  }
};

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        header: () => <BrandHeader />,
        tabBar: (props) => <CWTabBar {...props} getIcon={getIcon} />,
        tabBarShowLabel: false,
      }}
    >
      <Tabs.Screen name="chat" />
      <Tabs.Screen name="library" />
      <Tabs.Screen name="launchpad" />
      <Tabs.Screen name="coach" />
      <Tabs.Screen name="profile" />
    </Tabs>
  );
}
