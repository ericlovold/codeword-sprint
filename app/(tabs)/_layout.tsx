import { Tabs } from 'expo-router';
import BottomTabs from '../../src/components/BottomTabs';

export default function TabLayout() {
  return (
    <Tabs screenOptions={{ headerShown: false }} tabBar={(props) => <BottomTabs {...props} />}>
      <Tabs.Screen name="chat" />
      <Tabs.Screen name="library" />
      <Tabs.Screen name="mood" />
      <Tabs.Screen name="profile" />
    </Tabs>
  );
}
