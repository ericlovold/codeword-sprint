import React, { useState } from 'react';
import { View, Text, StyleSheet, Pressable, SafeAreaView, Modal, Linking } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import CWTabBar from '../src/ui/CWTabBar';
import SendCodewordModal from '../src/components/SendCodewordModal';

export default function GetSupportScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const [showCodewordModal, setShowCodewordModal] = useState(false);

  const handleSendCodeword = () => {
    // For now, always show the send codeword modal
    // In a real app, you'd check if allies are set up first
    setShowCodewordModal(true);
  };

  const handleSetupCodeword = () => {
    setShowCodewordModal(false);
    // Navigate to codeword setup flow
    router.push('/create-codeword');
  };

  const handleCancelModal = () => {
    setShowCodewordModal(false);
  };

  const handle988Lifeline = () => {
    Linking.openURL('tel:988');
  };

  const handle911Emergency = () => {
    Linking.openURL('tel:911');
  };

  const handleManageAllies = () => {
    router.push('/(tabs)/profile');
  };

  // Mock tab bar props to enable navigation
  const mockTabBarProps = {
    state: {
      index: -1, // No active tab since this is a separate screen
      routes: [
        { key: 'codeword', name: 'codeword' },
        { key: 'library', name: 'library' },
        { key: 'launchpad', name: 'launchpad' },
        { key: 'coach', name: 'coach' },
        { key: 'profile', name: 'profile' },
      ],
    },
    navigation: {
      navigate: (routeName: string) => {
        // Navigate to the tab - always allow navigation since this is not a tab screen
        router.replace(`/(tabs)/${routeName}`);
      },
      emit: () => ({ defaultPrevented: false }),
    },
    descriptors: {
      codeword: { options: { title: 'Codeword' } },
      library: { options: { title: 'Guides' } },
      launchpad: { options: { title: '' } },
      coach: { options: { title: 'Coach' } },
      profile: { options: { title: 'Profile' } },
    },
  };

  return (
    <View style={styles.container}>
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.content}>
          {/* Header */}
          <View style={styles.header}>
            <Text style={styles.pageTitle}>Get Support</Text>
          </View>

          {/* Action Buttons */}
          <View style={styles.buttonsContainer}>
            {/* Send Codeword - Primary Action */}
            <Pressable style={styles.primaryButton} onPress={handleSendCodeword}>
              <Text style={styles.primaryButtonText}>Send Codeword</Text>
              <Text style={styles.buttonIcon}>›</Text>
            </Pressable>

            {/* 988 Lifeline */}
            <Pressable style={styles.secondaryButton} onPress={handle988Lifeline}>
              <View style={styles.buttonContent}>
                <Text style={styles.secondaryButtonTitle}>988 Lifeline</Text>
                <Text style={styles.secondaryButtonSubtitle}>
                  Speak or text with a crisis counselor
                </Text>
              </View>
              <Text style={styles.darkButtonIcon}>›</Text>
            </Pressable>

            {/* 911 Emergency */}
            <Pressable style={styles.secondaryButton} onPress={handle911Emergency}>
              <View style={styles.buttonContent}>
                <Text style={styles.emergencyButtonTitle}>Dial 911 Emergency</Text>
              </View>
              <Text style={styles.darkButtonIcon}>›</Text>
            </Pressable>

            {/* Manage Allies */}
            <Pressable style={styles.secondaryButton} onPress={handleManageAllies}>
              <View style={styles.buttonContent}>
                <Text style={styles.secondaryButtonTitle}>Manage My Allies</Text>
              </View>
              <Text style={styles.darkButtonIcon}>›</Text>
            </Pressable>
          </View>
        </View>
      </SafeAreaView>

      {/* Add Tab Bar for Navigation */}
      <CWTabBar {...mockTabBarProps} />

      {/* Send Codeword Modal */}
      <SendCodewordModal visible={showCodewordModal} onClose={handleCancelModal} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#642975',
  },
  safeArea: {
    flex: 1,
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  header: {
    alignItems: 'center',
    marginBottom: 60,
  },
  brandText: {
    fontSize: 24,
    fontWeight: '600',
    color: '#FFFFFF',
    marginBottom: 20,
  },
  pageTitle: {
    fontSize: 32,
    fontWeight: '700',
    color: '#FFFFFF',
    textAlign: 'center',
  },
  buttonsContainer: {
    gap: 16,
  },
  primaryButton: {
    backgroundColor: '#C53030',
    borderRadius: 24,
    paddingVertical: 20,
    paddingHorizontal: 24,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 4,
  },
  primaryButtonText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  secondaryButton: {
    backgroundColor: '#FFFFFF',
    borderRadius: 24,
    paddingVertical: 20,
    paddingHorizontal: 24,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 2,
  },
  buttonContent: {
    flex: 1,
  },
  secondaryButtonTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1B1D22',
    marginBottom: 2,
  },
  secondaryButtonSubtitle: {
    fontSize: 14,
    color: '#C53030',
    fontWeight: '500',
  },
  emergencyButtonTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#C53030',
  },
  buttonIcon: {
    fontSize: 24,
    color: '#FFFFFF',
    fontWeight: '300',
  },
  darkButtonIcon: {
    fontSize: 24,
    color: '#666666',
    fontWeight: '300',
  },
});
