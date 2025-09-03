// app/(tabs)/_layout.tsx
import { Tabs } from 'expo-router';
import BrandHeader from '../../src/ui/BrandHeader';
import CWTabBar from '../../src/ui/CWTabBar';

const iconMap: Record<string, any> = {
  codeword: require('../../assets/icons/tabs/TabChat.png'),
  library: require('../../assets/icons/tabs/TabLibrary.png'),
  launchpad: require('../../assets/icons/tabs/TabSemicolon.png'),
  coach: require('../../assets/icons/tabs/TabCoach.png'),
  profile: require('../../assets/icons/tabs/TabProfile.png'),
};

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        header: () => <BrandHeader />,
        tabBar: (props) => <CWTabBar {...props} getIcon={(name, focused) => iconMap[name]} />,
      }}
    >
      <Tabs.Screen name="codeword" options={{ title: 'Codeword' }} />
      <Tabs.Screen name="library" options={{ title: 'Guides' }} />
      <Tabs.Screen name="launchpad" options={{ title: ' ' }} />
      <Tabs.Screen name="coach" options={{ title: 'Coach' }} />
      <Tabs.Screen name="profile" options={{ title: 'Profile' }} />
    </Tabs>
  );
}
