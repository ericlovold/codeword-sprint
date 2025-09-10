import { Redirect, Slot } from 'expo-router';
import React from 'react';
import { Tabs } from 'expo-router';
import { View, StyleSheet } from 'react-native';
import BrandHeader from '../../src/ui/BrandHeader';
import CWTabBar from '../../src/ui/CWTabBar';
import { useAuth } from '../../src/contexts/AuthContext';
import OfflineBanner from '../../src/components/OfflineBanner';

function ProtectedTabsLayout() {
  return (
    <View style={styles.container}>
      <OfflineBanner />
      <Tabs
        screenOptions={{
          header: () => <BrandHeader />,
          contentStyle: { backgroundColor: '#F8F8F8' },
          tabBarStyle: { display: 'flex' }, // Ensure tab bar is always visible
        }}
        tabBar={(props) => <CWTabBar {...props} />}
      >
        <Tabs.Screen
          name="codeword"
          options={{
            title: 'Codeword',
            tabBarStyle: { display: 'flex' }, // Explicitly show tab bar on codeword screen
          }}
        />
        <Tabs.Screen name="library" options={{ title: 'Guides' }} />
        <Tabs.Screen name="launchpad" options={{ title: '' }} />
        <Tabs.Screen name="coach" options={{ title: 'Coach' }} />
        <Tabs.Screen name="profile" options={{ title: 'Profile' }} />
      </Tabs>
    </View>
  );
}

export default function TabLayout() {
  const { state, loading } = useAuth();

  // Show loading while auth state is being determined
  if (loading) {
    return <Slot />; // Let outer layout handle loading state
  }

  // Redirect to login if not authenticated
  if (!state.token) {
    return <Redirect href="/login" />;
  }

  // User is authenticated, show the tabs
  return <ProtectedTabsLayout />;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
