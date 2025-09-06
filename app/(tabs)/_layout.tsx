import React from 'react';
import { Tabs } from 'expo-router';
import { View, StyleSheet } from 'react-native';
import BrandHeader from '../../src/ui/BrandHeader';
import CWTabBar from '../../src/ui/CWTabBar';

export default function TabLayout() {
  return (
    <View style={styles.container}>
      <Tabs
        screenOptions={{
          header: () => <BrandHeader />,
          contentStyle: { backgroundColor: '#F8F8F8' },
        }}
        tabBar={(props) => <CWTabBar {...props} />}
      >
        <Tabs.Screen name="codeword" options={{ title: 'Codeword' }} />
        <Tabs.Screen name="library" options={{ title: 'Guides' }} />
        <Tabs.Screen name="launchpad" options={{ title: '' }} />
        <Tabs.Screen name="coach" options={{ title: 'Coach' }} />
        <Tabs.Screen name="profile" options={{ title: 'Profile' }} />
      </Tabs>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
