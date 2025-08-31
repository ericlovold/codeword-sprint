import React from 'react';
import { Image, View } from 'react-native';
import { Tabs } from 'expo-router';
import Header from '../../src/components/Header';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';

const I = ({ src, color }: { src: any; color: string }) => (
  <Image source={src} style={{ width: 24, height: 24, tintColor: color }} resizeMode="contain" />
);

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: '#6A35B7',
        tabBarInactiveTintColor: '#8E8E93',
        tabBarStyle: {
          height: 88,
          paddingTop: 8,
          paddingBottom: 20,
          borderTopLeftRadius: 24,
          borderTopRightRadius: 24,
          position: 'absolute',
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'white',
          borderTopWidth: 0,
          elevation: 20,
          shadowColor: '#000',
          shadowOpacity: 0.08,
          shadowRadius: 16,
          shadowOffset: { width: 0, height: -4 },
        },
        tabBarLabelStyle: { fontSize: 12, marginTop: 4 },
      }}
    >
      <Tabs.Screen
        name="chat"
        options={{
          title: 'Chat',
          header: () => <Header title="Codeword" />,
          tabBarIcon: ({ color }) => (
            <I src={require('../assets/icons/ChatAi ICON.png')} color={color} />
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

      {/* Center semicolon tab — routes to /(tabs)/codeword */}
      <Tabs.Screen
        name="codeword"
        options={{
          title: 'Codeword',
          tabBarIcon: ({ color }) => (
            <I src={require('../assets/icons/SemicolonIconPurple.png')} color={color} />
          ),
        }}
      />

      <Tabs.Screen
        name="mood"
        options={{
          title: 'Mood',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="emoticon-outline" size={size} color={color} />
          ),
        }}
      />

      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profile',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="person-circle-outline" size={size} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
