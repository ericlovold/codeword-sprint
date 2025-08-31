import React from 'react';
import { Image, Pressable } from 'react-native';
import { Tabs, useRouter } from 'expo-router';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';

const PURPLE = '#6B3FD1';

export default function TabLayout() {
  const router = useRouter();

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: PURPLE,
        tabBarInactiveTintColor: '#9BA1A6',
        tabBarLabelStyle: { fontSize: 12 },
        tabBarStyle: {
          position: 'absolute',
          height: 84,
          borderTopLeftRadius: 24,
          borderTopRightRadius: 24,
          backgroundColor: 'rgba(255,255,255,0.96)',
        },
      }}
    >
      <Tabs.Screen
        name="chat"
        options={{
          title: 'Chat',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="message-text-outline" size={size} color={color} />
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

      {/* Center "semicolon" – always purple, bigger, routes to /help */}
      <Tabs.Screen
        name="codeword"
        options={{
          title: '',
          tabBarButton: (props) => (
            <Pressable
              {...props}
              onPress={() => router.push('/help')}
              style={[
                props.style,
                {
                  alignItems: 'center',
                  justifyContent: 'center',
                  transform: [{ translateY: -12 }],
                },
              ]}
            >
              <Image
                source={require('../../assets/icons/SemicolonIconPurple.png')}
                style={{ width: 36, height: 36, resizeMode: 'contain' }}
              />
            </Pressable>
          ),
        }}
      />

      <Tabs.Screen
        name="mood"
        options={{
          title: 'Mood',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="happy-outline" size={size} color={color} />
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
