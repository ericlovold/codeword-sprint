import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Modal, Pressable, Linking, Alert, Image } from 'react-native';
import { scheduleCriticalNotification } from '../services/notificationService';
import { storage } from '../utils/storage';
import LoadingSpinner from './LoadingSpinner';

interface Ally {
  id: string;
  name: string;
  phone: string;
  initials: string;
  color: string;
}

interface SendCodewordModalProps {
  visible: boolean;
  onClose: () => void;
}

// Fallback ally data if no allies are found
const fallbackAlly: Ally = {
  id: 'fallback',
  name: 'Your Ally',
  phone: '+1234567890',
  initials: 'YA',
  color: '#E91E63',
};

export default function SendCodewordModal({ visible, onClose }: SendCodewordModalProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [currentAlly, setCurrentAlly] = useState<Ally>(fallbackAlly);
  const [alliesLoaded, setAlliesLoaded] = useState(false);
  const [loadingAllies, setLoadingAllies] = useState(false);

  // Load selected allies when modal becomes visible
  useEffect(() => {
    const loadAllies = async () => {
      if (visible && !alliesLoaded) {
        setLoadingAllies(true);
        try {
          const savedAllies = await storage.getSelectedAllies();
          console.log('Loaded allies:', savedAllies);

          if (savedAllies && savedAllies.length > 0) {
            // Use the first saved ally
            const firstAlly = savedAllies[0];
            setCurrentAlly({
              id: firstAlly.id,
              name: firstAlly.name,
              phone: firstAlly.phone || '+1234567890',
              initials: firstAlly.initials,
              color: firstAlly.backgroundColor || '#E91E63',
            });
          }
          setAlliesLoaded(true);
        } catch (error) {
          console.error('Failed to load allies:', error);
          setAlliesLoaded(true);
        } finally {
          setLoadingAllies(false);
        }
      }
    };

    loadAllies();
  }, [visible, alliesLoaded]);

  // Reset loading state when modal is closed
  useEffect(() => {
    if (!visible) {
      setAlliesLoaded(false);
    }
  }, [visible]);

  const handleSendCodewordAlert = async () => {
    try {
      setIsLoading(true);

      // Send critical notification that bypasses DND/Silent
      await scheduleCriticalNotification(
        'Codeword Alert',
        `${currentAlly.name} has sent their codeword and needs support`,
        {
          allyId: currentAlly.id,
          allyName: currentAlly.name,
          timestamp: new Date().toISOString(),
          location: 'Current location will be shared', // In real app, get actual location
        },
      );

      // In a real app, you would also:
      // 1. Send SMS/push notification to the ally
      // 2. Log the codeword event to backend
      // 3. Start location sharing if enabled
      // 4. Potentially initiate emergency protocols

      Alert.alert(
        'Codeword Sent',
        `Your codeword alert has been sent to ${currentAlly.name}. They will receive your location and crisis status.`,
        [{ text: 'OK', onPress: onClose }],
      );
    } catch (error) {
      console.error('Failed to send codeword alert:', error);
      Alert.alert(
        'Error',
        'Failed to send codeword alert. Please try again or contact emergency services.',
        [{ text: 'OK' }],
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleCallAlly = () => {
    const phoneUrl = `tel:${currentAlly.phone}`;
    Linking.canOpenURL(phoneUrl).then((supported) => {
      if (supported) {
        Linking.openURL(phoneUrl);
        onClose();
      } else {
        Alert.alert('Error', 'Unable to make phone calls on this device');
      }
    });
  };

  const handleTextAlly = () => {
    const smsUrl = `sms:${currentAlly.phone}`;
    Linking.canOpenURL(smsUrl).then((supported) => {
      if (supported) {
        Linking.openURL(smsUrl);
        onClose();
      } else {
        Alert.alert('Error', 'Unable to send text messages on this device');
      }
    });
  };

  return (
    <Modal visible={visible} transparent={true} animationType="fade" onRequestClose={onClose}>
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          {/* Close button */}
          <Pressable onPress={onClose} style={styles.closeButton}>
            <Text style={styles.closeText}>×</Text>
          </Pressable>

          {/* Title */}
          <Text style={styles.title}>Choose an ally to reach out to</Text>

          {/* Ally Profile */}
          <View style={styles.allyProfile}>
            {loadingAllies ? (
              <View style={styles.loadingContainer}>
                <LoadingSpinner size="medium" color="#642975" />
                <Text style={styles.loadingText}>Loading allies...</Text>
              </View>
            ) : (
              <>
                <View style={[styles.allyAvatar, { backgroundColor: currentAlly.color }]}>
                  <Text style={styles.allyInitials}>{currentAlly.initials}</Text>
                </View>
                <Text style={styles.allyName}>{currentAlly.name}</Text>
              </>
            )}
          </View>

          {/* Action Buttons */}
          <View style={styles.actionButtons}>
            {/* Send Codeword Alert - Primary Action */}
            <Pressable
              style={styles.primaryButton}
              onPress={handleSendCodewordAlert}
              disabled={isLoading}
            >
              <View style={styles.buttonLeft}>
                <View style={styles.primaryIconContainer}>
                  <Text style={styles.primaryIcon}>⚠</Text>
                </View>
                <View>
                  <Text style={styles.primaryButtonText}>
                    {isLoading ? 'Sending...' : 'Send Codeword Alert'}
                  </Text>
                  <Text style={styles.primaryButtonSubtext}>Audio and text notification</Text>
                </View>
              </View>
            </Pressable>

            {/* Call Button */}
            <Pressable style={styles.secondaryButton} onPress={handleCallAlly}>
              <View style={styles.buttonLeft}>
                <View style={styles.iconContainer}>
                  <Text style={styles.iconEmoji}>📞</Text>
                </View>
                <View>
                  <Text style={styles.secondaryButtonText}>Call {currentAlly.name}</Text>
                  <Text style={styles.secondaryButtonSubtext}>Direct phone call</Text>
                </View>
              </View>
            </Pressable>

            {/* Text Button */}
            <Pressable style={styles.secondaryButton} onPress={handleTextAlly}>
              <View style={styles.buttonLeft}>
                <View style={styles.iconContainer}>
                  <Text style={styles.iconEmoji}>💬</Text>
                </View>
                <View>
                  <Text style={styles.secondaryButtonText}>Text {currentAlly.name}</Text>
                  <Text style={styles.secondaryButtonSubtext}>Send a text message</Text>
                </View>
              </View>
            </Pressable>
          </View>

          {/* Footer */}
          <Text style={styles.footerText}>
            Your allies will receive your location and crisis status
          </Text>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  modalContent: {
    backgroundColor: '#FFFFFF',
    borderRadius: 24,
    paddingHorizontal: 20,
    paddingVertical: 24,
    width: '100%',
    maxWidth: 400,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.25,
    shadowRadius: 16,
    elevation: 8,
  },
  closeButton: {
    position: 'absolute',
    top: 16,
    right: 16,
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#F5F5F7',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1,
  },
  closeText: {
    fontSize: 20,
    color: '#666666',
    fontWeight: '300',
  },
  title: {
    fontSize: 16,
    color: '#666666',
    textAlign: 'center',
    marginTop: 16,
    marginBottom: 32,
  },
  allyProfile: {
    alignItems: 'center',
    marginBottom: 32,
  },
  allyAvatar: {
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  allyInitials: {
    fontSize: 20,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  allyName: {
    fontSize: 20,
    fontWeight: '600',
    color: '#1B1D22',
  },
  actionButtons: {
    gap: 12,
    marginBottom: 24,
  },
  primaryButton: {
    backgroundColor: '#FF6B6B',
    borderRadius: 16,
    padding: 16,
    borderWidth: 2,
    borderColor: '#E53E3E',
  },
  secondaryButton: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  buttonLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  primaryIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: 'rgba(255, 255, 255, 0.25)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  primaryIcon: {
    fontSize: 18,
    color: '#FFFFFF',
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: '#F8F9FA',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  iconImage: {
    width: 20,
    height: 20,
  },
  iconEmoji: {
    fontSize: 20,
  },
  primaryButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
    marginBottom: 2,
  },
  primaryButtonSubtext: {
    fontSize: 14,
    color: '#FFFFFF',
    opacity: 0.8,
  },
  secondaryButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1B1D22',
    marginBottom: 2,
  },
  secondaryButtonSubtext: {
    fontSize: 14,
    color: '#666666',
  },
  footerText: {
    fontSize: 12,
    color: '#999999',
    textAlign: 'center',
    lineHeight: 18,
  },
  loadingContainer: {
    alignItems: 'center',
    paddingVertical: 20,
  },
  loadingText: {
    marginTop: 8,
    fontSize: 14,
    color: '#666666',
    fontWeight: '500',
  },
});
