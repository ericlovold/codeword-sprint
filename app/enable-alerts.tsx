import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Pressable, SafeAreaView } from 'react-native';
import { useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import * as Notifications from 'expo-notifications';

export default function EnableAlertsScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [criticalAlertsEnabled, setCriticalAlertsEnabled] = useState(true);

  useEffect(() => {
    // Request permissions when the screen loads
    requestPermissions();
  }, []);

  const requestPermissions = async () => {
    const { status: existingStatus } = await Notifications.getPermissionsAsync();

    if (existingStatus !== 'granted') {
      await Notifications.requestPermissionsAsync();
    }
  };

  const handleBack = () => {
    router.back();
  };

  const handleContinue = () => {
    // Navigate to the Connect Allies screen
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
      <Text style={styles.title}>Enable Critical Alerts</Text>
      <Text style={styles.subtitle}>
        To ensure your Codeword reaches your allies even when their phones are on Do Not Disturb, we
        need to enable critical alerts and notifications.
      </Text>

      {/* Permission Cards */}
      <View style={styles.cardsContainer}>
        {/* Allow Notifications Card */}
        <Pressable
          style={styles.card}
          onPress={() => setNotificationsEnabled(!notificationsEnabled)}
        >
          <View style={styles.cardContent}>
            <View style={styles.cardLeft}>
              <Text style={styles.cardTitle}>Allow Notifications</Text>
              <Text style={styles.cardDescription}>
                Receive notifications when allies send their Codeword
              </Text>
            </View>
            <View style={[styles.checkmark, !notificationsEnabled && styles.checkmarkDisabled]}>
              {notificationsEnabled && <Text style={styles.checkmarkText}>✓</Text>}
            </View>
          </View>
        </Pressable>

        {/* Critical Alerts Card */}
        <Pressable
          style={styles.card}
          onPress={() => setCriticalAlertsEnabled(!criticalAlertsEnabled)}
        >
          <View style={styles.cardContent}>
            <View style={styles.cardLeft}>
              <Text style={styles.cardTitle}>Critical Alerts</Text>
              <Text style={styles.cardDescription}>
                Override Do Not Disturb for emergency Codeword alerts
              </Text>
            </View>
            <View style={[styles.checkmark, !criticalAlertsEnabled && styles.checkmarkDisabled]}>
              {criticalAlertsEnabled && <Text style={styles.checkmarkText}>✓</Text>}
            </View>
          </View>
        </Pressable>
      </View>

      {/* Settings Note */}
      <Text style={styles.settingsNote}>
        You can change these settings anytime in your device's Settings app
      </Text>

      {/* Continue Button */}
      <View style={[styles.footer, { paddingBottom: insets.bottom + 20 }]}>
        <Pressable style={styles.continueButton} onPress={handleContinue}>
          <Text style={styles.continueButtonText}>Continue</Text>
        </Pressable>
      </View>
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
    fontSize: 32,
    fontWeight: '700',
    color: '#1B1D22',
    paddingHorizontal: 20,
    marginBottom: 16,
  },
  subtitle: {
    fontSize: 16,
    color: '#666666',
    paddingHorizontal: 20,
    marginBottom: 40,
    lineHeight: 22,
  },
  cardsContainer: {
    paddingHorizontal: 20,
    gap: 20,
    flex: 1,
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  cardContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  cardLeft: {
    flex: 1,
    marginRight: 16,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1B1D22',
    marginBottom: 8,
  },
  cardDescription: {
    fontSize: 14,
    color: '#666666',
    lineHeight: 20,
  },
  checkmark: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#642975',
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkmarkDisabled: {
    backgroundColor: 'transparent',
    borderWidth: 2,
    borderColor: '#E0E0E0',
  },
  checkmarkText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
  settingsNote: {
    fontSize: 14,
    color: '#999999',
    textAlign: 'center',
    paddingHorizontal: 40,
    marginTop: 20,
    lineHeight: 20,
  },
  footer: {
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  continueButton: {
    backgroundColor: '#1B1D22',
    borderRadius: 25,
    paddingVertical: 16,
    alignItems: 'center',
  },
  continueButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
  },
});
