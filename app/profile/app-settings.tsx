import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Pressable,
  SafeAreaView,
  Switch,
  Alert,
  Image,
} from 'react-native';
import { useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function AppSettingsScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const [autoSync, setAutoSync] = useState(true);

  const handleBack = () => {
    router.back();
  };

  const handleClearCache = () => {
    Alert.alert(
      'Clear Cache',
      'Are you sure you want to clear the app cache? This will free up storage space but may slow down the app temporarily.',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Clear',
          style: 'destructive',
          onPress: () => {
            // In a real app, this would clear the cache
            Alert.alert('Cache Cleared', 'App cache has been cleared successfully.');
          },
        },
      ],
    );
  };

  const handleResetSettings = () => {
    Alert.alert(
      'Reset App Settings',
      'This will restore all settings to their default values. Are you sure you want to continue?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Reset',
          style: 'destructive',
          onPress: () => {
            setAutoSync(true);
            Alert.alert('Settings Reset', 'All settings have been restored to default values.');
          },
        },
      ],
    );
  };

  const handleExportSettings = () => {
    Alert.alert(
      'Export Settings',
      'Your app preferences will be backed up and can be imported later.',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Export',
          onPress: () => {
            // In a real app, this would export settings
            Alert.alert('Settings Exported', 'Your preferences have been backed up successfully.');
          },
        },
      ],
    );
  };

  const handleManageAllies = () => {
    // Navigate to the allies management/contact selection flow
    router.push('/connect-allies');
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Pressable onPress={handleBack} style={styles.backButton}>
          <Text style={styles.backIcon}>‹</Text>
        </Pressable>
      </View>

      {/* Title */}
      <Text style={styles.title}>App Settings</Text>

      <ScrollView
        contentContainerStyle={[styles.scrollContent, { paddingBottom: insets.bottom + 20 }]}
        showsVerticalScrollIndicator={false}
      >
        {/* Appearance Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Appearance</Text>

          <Pressable style={styles.settingItem}>
            <View style={styles.settingLeft}>
              <View style={[styles.iconContainer, { backgroundColor: '#007AFF' }]}>
                <Image
                  source={require('../../assets/icons/CWIcons002/LanguageIcon.png')}
                  style={styles.iconImage}
                  resizeMode="contain"
                />
              </View>
              <View style={styles.settingTextContainer}>
                <Text style={styles.settingTitle}>Language</Text>
                <Text style={styles.settingSubtitle}>Change app language</Text>
              </View>
            </View>
            <View style={styles.settingRight}>
              <Text style={styles.settingValue}>English</Text>
              <Text style={styles.chevron}>⚙️</Text>
            </View>
          </Pressable>
        </View>

        {/* Data & Storage Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Data & Storage</Text>

          <Pressable style={styles.settingItem} onPress={handleManageAllies}>
            <View style={styles.settingLeft}>
              <View style={[styles.iconContainer, { backgroundColor: '#E91E63' }]}>
                <Text style={styles.iconEmoji}>👥</Text>
              </View>
              <View style={styles.settingTextContainer}>
                <Text style={styles.settingTitle}>Manage Allies</Text>
                <Text style={styles.settingSubtitle}>Add or remove trusted contacts</Text>
              </View>
            </View>
            <Text style={styles.chevron}>›</Text>
          </Pressable>

          <View style={styles.settingItem}>
            <View style={styles.settingLeft}>
              <View style={[styles.iconContainer, { backgroundColor: '#642975' }]}>
                <Image
                  source={require('../../assets/icons/CWIcons002/AutoSyncIcon.png')}
                  style={styles.iconImage}
                  resizeMode="contain"
                />
              </View>
              <View style={styles.settingTextContainer}>
                <Text style={styles.settingTitle}>Auto-sync</Text>
                <Text style={styles.settingSubtitle}>Sync data across devices</Text>
              </View>
            </View>
            <Switch
              value={autoSync}
              onValueChange={setAutoSync}
              trackColor={{ false: '#E5E7EB', true: '#642975' }}
              thumbColor={autoSync ? '#FFFFFF' : '#FFFFFF'}
            />
          </View>

          <Pressable style={styles.settingItem} onPress={handleClearCache}>
            <View style={styles.settingLeft}>
              <View style={[styles.iconContainer, { backgroundColor: '#10B981' }]}>
                <Image
                  source={require('../../assets/icons/CWIcons002/ClearCasheIcon.png')}
                  style={styles.iconImage}
                  resizeMode="contain"
                />
              </View>
              <View style={styles.settingTextContainer}>
                <Text style={styles.settingTitle}>Clear Cache</Text>
                <Text style={styles.settingSubtitle}>Free up storage space</Text>
              </View>
            </View>
            <View style={styles.settingRight}>
              <Text style={styles.settingValue}>2.3 MB</Text>
            </View>
          </Pressable>
        </View>

        {/* Advanced Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Advanced</Text>

          <Pressable style={styles.settingItem} onPress={handleResetSettings}>
            <View style={styles.settingLeft}>
              <View style={styles.settingTextContainer}>
                <Text style={styles.settingTitle}>Reset App Settings</Text>
                <Text style={styles.settingSubtitle}>Restore default settings</Text>
              </View>
            </View>
            <Text style={styles.chevron}>›</Text>
          </Pressable>

          <Pressable style={styles.settingItem} onPress={handleExportSettings}>
            <View style={styles.settingLeft}>
              <View style={styles.settingTextContainer}>
                <Text style={styles.settingTitle}>Export Settings</Text>
                <Text style={styles.settingSubtitle}>Backup your preferences</Text>
              </View>
            </View>
            <Text style={styles.chevron}>›</Text>
          </Pressable>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F3F5',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    paddingHorizontal: 20,
    paddingTop: 10,
    height: 50,
  },
  backButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  backIcon: {
    fontSize: 24,
    color: '#1B1D22',
    fontWeight: '300',
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: '#1B1D22',
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  scrollContent: {
    paddingHorizontal: 20,
  },
  section: {
    marginBottom: 32,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1B1D22',
    marginBottom: 16,
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 16,
    paddingHorizontal: 20,
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  settingLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  iconContainer: {
    width: 32,
    height: 32,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  iconImage: {
    width: 16,
    height: 16,
  },
  iconEmoji: {
    fontSize: 16,
  },
  settingTextContainer: {
    flex: 1,
  },
  settingTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1B1D22',
    marginBottom: 2,
  },
  settingSubtitle: {
    fontSize: 14,
    color: '#666666',
  },
  settingRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  settingValue: {
    fontSize: 14,
    color: '#666666',
    fontWeight: '500',
  },
  chevron: {
    fontSize: 16,
    color: '#999999',
  },
});
