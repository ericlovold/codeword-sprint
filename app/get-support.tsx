import React, { useState } from 'react';
import { View, Text, StyleSheet, Pressable, SafeAreaView, Modal, Linking } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function GetSupportScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const [showCodewordModal, setShowCodewordModal] = useState(false);

  const handleSendCodeword = () => {
    // Check if codeword is set up (simulate not set up for now)
    const hasCodeword = false; // This would come from your app state/storage

    if (hasCodeword) {
      router.push('/codeword');
    } else {
      setShowCodewordModal(true);
    }
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

  return (
    <View style={styles.container}>
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.content}>
          {/* Header */}
          <View style={styles.header}>
            <Text style={styles.brandText}>Codeword;</Text>
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

      {/* Codeword Not Set Up Modal */}
      <Modal
        visible={showCodewordModal}
        transparent={true}
        animationType="fade"
        onRequestClose={handleCancelModal}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Codeword Not Set Up</Text>
              <Pressable onPress={handleCancelModal} style={styles.closeButton}>
                <Text style={styles.closeText}>×</Text>
              </Pressable>
            </View>

            <Text style={styles.modalText}>
              You haven't set up a codeword with an ally yet. Please finish setting up your
              codeword.
            </Text>

            <View style={styles.modalActions}>
              <Pressable style={styles.setupButton} onPress={handleSetupCodeword}>
                <Text style={styles.setupButtonText}>Set Up Codeword</Text>
              </Pressable>

              <Pressable style={styles.cancelButton} onPress={handleCancelModal}>
                <Text style={styles.cancelButtonText}>Cancel</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>
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
    backgroundColor: '#D97B7B', // Coral/salmon color from design
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
    color: '#D97B7B',
    fontWeight: '500',
  },
  emergencyButtonTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#D97B7B',
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
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  modalContent: {
    backgroundColor: '#FFFFFF',
    borderRadius: 24,
    paddingHorizontal: 24,
    paddingVertical: 32,
    width: '100%',
    maxWidth: 400,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1B1D22',
  },
  closeButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#F0F0F0',
    justifyContent: 'center',
    alignItems: 'center',
  },
  closeText: {
    fontSize: 20,
    color: '#666666',
    fontWeight: '300',
  },
  modalText: {
    fontSize: 16,
    color: '#666666',
    lineHeight: 24,
    marginBottom: 32,
  },
  modalActions: {
    gap: 12,
  },
  setupButton: {
    backgroundColor: '#642975',
    borderRadius: 16,
    paddingVertical: 16,
    alignItems: 'center',
  },
  setupButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  cancelButton: {
    backgroundColor: '#F8F8F8',
    borderRadius: 16,
    paddingVertical: 16,
    alignItems: 'center',
  },
  cancelButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#666666',
  },
});
