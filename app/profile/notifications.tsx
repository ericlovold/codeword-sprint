import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  ScrollView,
  SafeAreaView,
  Switch,
  Image,
} from 'react-native';
import { useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

interface NotificationSettings {
  pushNotifications: boolean;
  criticalAlerts: boolean;
  appUpdates: boolean;
  aiTips: boolean;
  sound: boolean;
  vibration: boolean;
}

export default function NotificationsScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const [settings, setSettings] = useState<NotificationSettings>({
    pushNotifications: true,
    criticalAlerts: true,
    appUpdates: true,
    aiTips: false,
    sound: true,
    vibration: true,
  });

  const toggleSetting = (key: keyof NotificationSettings) => {
    setSettings((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const ToggleRow = ({
    icon,
    title,
    subtitle,
    settingKey,
  }: {
    icon: any;
    title: string;
    subtitle: string;
    settingKey: keyof NotificationSettings;
  }) => (
    <View style={styles.toggleRow}>
      <View style={styles.toggleLeft}>
        <Image source={icon} style={styles.toggleIcon} resizeMode="contain" />
        <View style={styles.toggleTextContainer}>
          <Text style={styles.toggleTitle}>{title}</Text>
          <Text style={styles.toggleSubtitle}>{subtitle}</Text>
        </View>
      </View>
      <Switch
        value={settings[settingKey]}
        onValueChange={() => toggleSetting(settingKey)}
        trackColor={{ false: '#E5E5E7', true: '#642975' }}
        thumbColor={'#FFFFFF'}
        ios_backgroundColor="#E5E5E7"
      />
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        contentContainerStyle={[styles.scrollContent, { paddingBottom: insets.bottom + 40 }]}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View style={styles.header}>
          <Pressable onPress={() => router.back()} style={styles.backButton}>
            <Text style={styles.backIcon}>‹</Text>
          </Pressable>
        </View>

        {/* Title Section */}
        <View style={styles.titleSection}>
          <Text style={styles.title}>Notifications</Text>
          <Text style={styles.subtitle}>Manage your notification preferences</Text>
        </View>

        {/* Codeword Alerts Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Codeword Alerts</Text>
          <View style={styles.sectionContent}>
            <ToggleRow
              icon={require('../../assets/icons/CWIcons002/PushNotificationsIcon.png')}
              title="Push Notifications"
              subtitle="Receive alerts when allies send their Codeword"
              settingKey="pushNotifications"
            />
            <View style={styles.divider} />
            <ToggleRow
              icon={require('../../assets/icons/CWIcons002/CriticalAlertsIcon.png')}
              title="Critical Alerts"
              subtitle="Override Do Not Disturb for emergency alerts"
              settingKey="criticalAlerts"
            />
          </View>
        </View>

        {/* General Notifications Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>General Notifications</Text>
          <View style={styles.sectionContent}>
            <ToggleRow
              icon={require('../../assets/icons/CWIcons002/AppUpdatesIcon.png')}
              title="App Updates"
              subtitle="Get notified about new features and updates"
              settingKey="appUpdates"
            />
            <View style={styles.divider} />
            <ToggleRow
              icon="✨"
              title="AI Tips & Resources"
              subtitle="Receive helpful tips and AI coaching resources"
              settingKey="aiTips"
            />
          </View>
        </View>

        {/* Alert Settings Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Alert Settings</Text>
          <View style={styles.sectionContent}>
            <ToggleRow
              icon="🔊"
              title="Sound"
              subtitle="Play sound for notifications"
              settingKey="sound"
            />
            <View style={styles.divider} />
            <ToggleRow
              icon={require('../../assets/icons/CWIcons002/VibrationIcon.png')}
              title="Vibration"
              subtitle="Vibrate for notifications"
              settingKey="vibration"
            />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F7',
  },
  scrollContent: {
    paddingHorizontal: 20,
  },
  header: {
    paddingTop: 20,
    paddingBottom: 10,
  },
  backButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  backIcon: {
    fontSize: 28,
    color: '#1B1D22',
    fontWeight: '300',
  },
  titleSection: {
    alignItems: 'center',
    marginBottom: 40,
  },
  title: {
    fontSize: 28,
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
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1B1D22',
    marginBottom: 12,
    paddingLeft: 4,
  },
  sectionContent: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 8,
    elevation: 2,
  },
  toggleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 16,
    paddingHorizontal: 20,
  },
  toggleLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  toggleIcon: {
    width: 24,
    height: 24,
    marginRight: 16,
  },
  toggleTextContainer: {
    flex: 1,
  },
  toggleTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1B1D22',
    marginBottom: 2,
  },
  toggleSubtitle: {
    fontSize: 14,
    color: '#666666',
    lineHeight: 20,
  },
  divider: {
    height: 1,
    backgroundColor: '#F0F0F0',
    marginLeft: 64,
  },
});
