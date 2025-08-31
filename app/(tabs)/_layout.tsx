import React from 'react';
import { View, Image } from 'react-native';
import { Tabs } from 'expo-router';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function TabLayout() {
  const insets = useSafeAreaInsets();
  const TAB_H = 62 + Math.max(0, insets.bottom - 8);

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          height: TAB_H,
          paddingBottom: Math.max(8, insets.bottom / 2),
          paddingTop: 6,
          borderTopWidth: 0,
          elevation: 0,
          shadowOpacity: 0,
          backgroundColor: '#FFFFFF',
        },
        tabBarActiveTintColor: '#6A35B7',
        tabBarInactiveTintColor: '#9BA0AA',
        tabBarLabelStyle: { fontSize: 12 },
      }}
    >
      <Tabs.Screen
        name="chat"
        options={{
          title: 'Chat',
          headerShown: true,
          headerTitle: 'Codeword',
          headerTitleAlign: 'center',
          headerTintColor: '#fff',
          headerStyle: { backgroundColor: '#6A35B7' },
          headerShadowVisible: false,
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="message-processing-outline" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="library"
        options={{
          title: 'Library',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="book-outline" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="codeword"
        options={{
          title: 'Codeword',
          tabBarLabel: () => null, // center icon only, no label
          tabBarIcon: () => (
            <View style={{ alignItems: 'center', justifyContent: 'center', marginTop: -2 }}>
              {/* Always-purple PNG */}
              <Image
                source={require('../assets/icons/safe/semicolon.png')}
                style={{ width: 36, height: 36 }}
                resizeMode="contain"
              />
            </View>
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
