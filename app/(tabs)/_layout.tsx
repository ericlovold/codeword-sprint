import React from 'react';
import { Tabs } from 'expo-router';
import { Image } from 'react-native';
import BrandTabBar from '../../src/components/BrandTabBar';
import BrandHeader from '../../src/components/BrandHeader';

// Tab PNG icons
const TabChatPNG = require('../assets/icons/tabs/TabChat.png');
const TabLibraryPNG = require('../assets/icons/tabs/TabLibrary.png');
const TabCoachPNG = require('../assets/icons/tabs/TabCoach.png');
const TabProfilePNG = require('../assets/icons/tabs/TabProfile.png');

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        header: (props) => {
          // Map titles per screen to match Figma
          const t = props.options.title ?? props.route.name;
          const title =
            t === 'chat' || t === 'Codeword'
              ? 'Codeword'
              : t === 'library' || t === 'Guides'
                ? 'Guides'
                : t === 'mood' || t === 'Coach'
                  ? 'Coach'
                  : t === 'profile' || t === 'Profile'
                    ? 'Profile'
                    : t === 'codeword'
                      ? 'Codeword'
                      : String(t);
          // Only show back when not on the root tab screens (Tabs handles this)
          return <BrandHeader title={title} showBack={false} />;
        },
        headerTransparent: true,
        tabBarShowLabel: true, // BrandTabBar draws labels for side tabs
      }}
      tabBar={(props) => <BrandTabBar {...props} />}
    >
      <Tabs.Screen
        name="chat"
        options={{
          title: 'Codeword',
          tabBarIcon: ({ size }) => (
            <Image source={TabChatPNG} style={{ width: size, height: size }} />
          ),
        }}
      />
      <Tabs.Screen
        name="library"
        options={{
          title: 'Guides',
          tabBarIcon: ({ size }) => (
            <Image source={TabLibraryPNG} style={{ width: size, height: size }} />
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
          tabBarIcon: ({ size }) => (
            <Image source={TabCoachPNG} style={{ width: size, height: size }} />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profile',
          tabBarIcon: ({ size }) => (
            <Image source={TabProfilePNG} style={{ width: size, height: size }} />
          ),
        }}
      />
    </Tabs>
  );
}
