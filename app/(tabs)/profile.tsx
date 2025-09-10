import React from 'react';
import { View, Text, StyleSheet, ScrollView, Pressable, Image } from 'react-native';
import { useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const menuItems = [
  {
    id: 'personal',
    title: 'Personal Information',
    subtitle: 'Manage your profile details',
    icon: require('../../assets/icons/CWIcons002/PersonalInformationIcon.png'),
    route: '/profile/personal-info',
  },
  {
    id: 'notifications',
    title: 'Notifications',
    subtitle: 'Customize your notification preferences',
    icon: require('../../assets/icons/CWIcons002/NotificationsIcon.png'),
    route: '/profile/notifications',
  },
  {
    id: 'privacy',
    title: 'Privacy & Security',
    subtitle: 'Control your privacy settings',
    icon: require('../../assets/icons/CWIcons002/PrivacyIcon.png'),
    route: '/profile/privacy',
  },
  {
    id: 'help',
    title: 'Help & Support',
    subtitle: 'Get help and contact support',
    icon: require('../../assets/icons/CWIcons002/HelpSupportIcon.png'),
    route: '/profile/help',
  },
  {
    id: 'settings',
    title: 'App Settings',
    subtitle: 'Customize app behavior',
    icon: require('../../assets/icons/CWIcons002/AppSettingsIcon.png'),
    route: '/profile/app-settings',
  },
  {
    id: 'signout',
    title: 'Sign Out',
    subtitle: 'Sign out of your account',
    icon: require('../../assets/icons/CWIcons002/SignOutIcon.png'),
    route: null,
    action: 'signout',
    color: '#FF3B30',
  },
];

export default function ProfileScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();

  const handleItemPress = (item: any) => {
    if (item.action === 'signout') {
      // Handle sign out
      console.log('Sign out');
    } else if (item.route) {
      router.push(item.route);
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView
        contentContainerStyle={[styles.scrollContent, { paddingBottom: insets.bottom + 100 }]}
        showsVerticalScrollIndicator={false}
      >
        {/* Title Section */}
        <View style={styles.header}>
          <Text style={styles.title}>Profile Settings</Text>
          <Text style={styles.subtitle}>Manage your account and preferences</Text>
        </View>

        {/* Menu Items */}
        <View style={styles.menuContainer}>
          {menuItems.map((item, index) => (
            <View key={item.id}>
              <Pressable style={styles.menuItem} onPress={() => handleItemPress(item)}>
                <View style={styles.menuItemLeft}>
                  <View style={styles.iconContainer}>
                    <Image source={item.icon} style={styles.iconImage} resizeMode="contain" />
                  </View>
                  <View style={styles.textContainer}>
                    <Text style={[styles.menuTitle, item.color && { color: item.color }]}>
                      {item.title}
                    </Text>
                    <Text
                      style={[
                        styles.menuSubtitle,
                        item.color && { color: item.color, opacity: 0.7 },
                      ]}
                    >
                      {item.subtitle}
                    </Text>
                  </View>
                </View>
                <Text style={styles.chevron}>›</Text>
              </Pressable>
              {index === 3 && <View style={styles.separator} />}
            </View>
          ))}
        </View>

        {/* Footer */}
        <View style={styles.footer}>
          <Text style={styles.footerTitle}>Codeword Technologies</Text>
          <Text style={styles.footerVersion}>Version 1.0.0</Text>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F7',
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  header: {
    marginBottom: 30,
    alignItems: 'center',
  },
  title: {
    fontSize: 32,
    fontWeight: '700',
    color: '#1B1D22',
    marginBottom: 8,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: '#666666',
    textAlign: 'center',
  },
  menuContainer: {
    gap: 16,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 14,
    paddingHorizontal: 20,
    backgroundColor: '#FFFFFF',
    borderRadius: 28,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 8,
    elevation: 2,
  },
  menuItemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  iconContainer: {
    width: 44,
    height: 44,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
    backgroundColor: '#F8F8F8',
    borderRadius: 12,
  },
  iconImage: {
    width: 22,
    height: 22,
  },
  textContainer: {
    flex: 1,
  },
  menuTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1B1D22',
    marginBottom: 2,
  },
  menuSubtitle: {
    fontSize: 14,
    color: '#666666',
  },
  chevron: {
    fontSize: 18,
    color: '#999999',
    fontWeight: '500',
  },
  separator: {
    height: 1,
    backgroundColor: '#F0F0F0',
    marginHorizontal: 20,
  },
  footer: {
    alignItems: 'center',
    marginTop: 40,
    marginBottom: 20,
  },
  footerTitle: {
    fontSize: 14,
    color: '#666666',
    marginBottom: 4,
  },
  footerVersion: {
    fontSize: 12,
    color: '#999999',
  },
});
