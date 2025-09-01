import { Tabs } from 'expo-router';
import CustomTabBar from '../../src/components/CustomTabBar';

export default function TabLayout() {
  return (
    <Tabs screenOptions={{ headerShown: false }} tabBar={(props) => <CustomTabBar {...props} />}>
      <Tabs.Screen name="chat" options={{ tabBarLabel: 'Chat' }} />
      <Tabs.Screen name="library" options={{ tabBarLabel: 'Guides' }} />
      <Tabs.Screen name="mood" options={{ tabBarLabel: 'Coach' }} />
      <Tabs.Screen name="profile" options={{ tabBarLabel: 'Profile' }} />
    </Tabs>
  );
}
