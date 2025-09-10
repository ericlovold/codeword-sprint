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

interface PrivacySettings {
  twoFactor: boolean;
  dataSharing: boolean;
  analyticsReports: boolean;
}

export default function PrivacySecurityScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const [settings, setSettings] = useState<PrivacySettings>({
    twoFactor: false,
    dataSharing: true,
    analyticsReports: true,
  });

  const toggleSetting = (key: keyof PrivacySettings) => {
    setSettings((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const ActionRow = ({
    icon,
    title,
    subtitle,
    actionText,
    onPress,
  }: {
    icon: any;
    title: string;
    subtitle: string;
    actionText: string;
    onPress: () => void;
  }) => (
    <Pressable style={styles.actionRow} onPress={onPress}>
      <View style={styles.actionLeft}>
        <Image source={icon} style={styles.actionIcon} resizeMode="contain" />
        <View style={styles.actionTextContainer}>
          <Text style={styles.actionTitle}>{title}</Text>
          <Text style={styles.actionSubtitle}>{subtitle}</Text>
        </View>
      </View>
      <Text style={styles.actionButton}>{actionText}</Text>
    </Pressable>
  );

  const ToggleRow = ({
    icon,
    title,
    subtitle,
    settingKey,
  }: {
    icon: any;
    title: string;
    subtitle: string;
    settingKey: keyof PrivacySettings;
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

  const DataManagementRow = ({
    icon,
    title,
    subtitle,
    isDestructive = false,
    onPress,
  }: {
    icon: any;
    title: string;
    subtitle: string;
    isDestructive?: boolean;
    onPress: () => void;
  }) => (
    <Pressable
      style={[styles.dataRow, isDestructive && styles.dataRowDestructive]}
      onPress={onPress}
    >
      <Image
        source={icon}
        style={[styles.dataIcon, isDestructive && styles.dataIconDestructive]}
        resizeMode="contain"
      />
      <View style={styles.dataTextContainer}>
        <Text style={[styles.dataTitle, isDestructive && styles.dataTitleDestructive]}>
          {title}
        </Text>
        <Text style={[styles.dataSubtitle, isDestructive && styles.dataSubtitleDestructive]}>
          {subtitle}
        </Text>
      </View>
    </Pressable>
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
          <Text style={styles.title}>Privacy & Security</Text>
          <Text style={styles.subtitle}>Manage your privacy and security settings</Text>
        </View>

        {/* Security Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Security</Text>
          <View style={styles.sectionContent}>
            <ActionRow
              icon={require('../../assets/icons/CWIcons002/PasswordChangeIcon.png')}
              title="Change Password"
              subtitle="Update your account password"
              actionText="Change"
              onPress={() => console.log('Change password')}
            />
            <View style={styles.divider} />
            <View style={styles.toggleRow}>
              <View style={styles.toggleLeft}>
                <Image
                  source={require('../../assets/icons/CWIcons002/TwoFactorAuthIcon.png')}
                  style={styles.toggleIcon}
                  resizeMode="contain"
                />
                <View style={styles.toggleTextContainer}>
                  <Text style={styles.toggleTitle}>Two-Factor Authentication</Text>
                  <Text style={styles.toggleSubtitle}>Add extra security to your account</Text>
                </View>
              </View>
              <Switch
                value={settings.twoFactor}
                onValueChange={() => toggleSetting('twoFactor')}
                trackColor={{ false: '#E5E5E7', true: '#642975' }}
                thumbColor={'#FFFFFF'}
                ios_backgroundColor="#E5E5E7"
              />
            </View>
            <View style={styles.divider} />
            <ActionRow
              icon="🔗"
              title="Login Sessions"
              subtitle="View and manage active sessions"
              actionText="Manage"
              onPress={() => console.log('Manage sessions')}
            />
          </View>
        </View>

        {/* Privacy Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Privacy</Text>
          <View style={styles.sectionContent}>
            <ToggleRow
              icon={require('../../assets/icons/CWIcons002/DataSharingIcon.png')}
              title="Data Sharing"
              subtitle="Control how your data is shared"
              settingKey="dataSharing"
            />
            <View style={styles.divider} />
            <ToggleRow
              icon={require('../../assets/icons/CWIcons002/DataSharingIcon.png')}
              title="Analytics & Crash Reports"
              subtitle="Help improve the app"
              settingKey="analyticsReports"
            />
          </View>
        </View>

        {/* Data Management Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Data Management</Text>
          <View style={styles.sectionContent}>
            <DataManagementRow
              icon=""
              title="Download Your Data"
              subtitle="Get a copy of your data"
              onPress={() => console.log('Download data')}
            />
            <View style={styles.divider} />
            <DataManagementRow
              icon={require('../../assets/icons/CWIcons002/TwoFactorAuthIcon.png')}
              title="Delete Account"
              subtitle="Permanently delete your account"
              isDestructive={true}
              onPress={() => console.log('Delete account')}
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
  actionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 16,
    paddingHorizontal: 20,
  },
  actionLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  actionIcon: {
    width: 24,
    height: 24,
    marginRight: 16,
  },
  actionTextContainer: {
    flex: 1,
  },
  actionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1B1D22',
    marginBottom: 2,
  },
  actionSubtitle: {
    fontSize: 14,
    color: '#666666',
    lineHeight: 20,
  },
  actionButton: {
    fontSize: 16,
    fontWeight: '600',
    color: '#642975',
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
  dataRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
    paddingHorizontal: 20,
  },
  dataRowDestructive: {
    backgroundColor: '#FFF5F5',
  },
  dataIcon: {
    width: 24,
    height: 24,
    marginRight: 16,
  },
  dataIconDestructive: {
    width: 20,
    height: 20,
  },
  dataTextContainer: {
    flex: 1,
  },
  dataTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1B1D22',
    marginBottom: 2,
  },
  dataTitleDestructive: {
    color: '#FF3B30',
  },
  dataSubtitle: {
    fontSize: 14,
    color: '#666666',
    lineHeight: 20,
  },
  dataSubtitleDestructive: {
    color: '#FF6B6B',
  },
  divider: {
    height: 1,
    backgroundColor: '#F0F0F0',
    marginLeft: 64,
  },
});
