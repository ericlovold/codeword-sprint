import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Pressable,
  SafeAreaView,
  Platform,
  Modal,
  ImageBackground,
  Image,
} from 'react-native';
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
    // Handle 988 lifeline call/navigation
    console.log('988 Lifeline pressed');
  };

  const handle911Emergency = () => {
    // Handle 911 emergency call
    console.log('911 Emergency pressed');
  };

  const handleManageAllies = () => {
    // Navigate to manage allies
    console.log('Manage Allies pressed');
  };

  return (
    <ImageBackground
      source={require('../assets/icons/Gradient BG.png')}
      style={styles.container}
      resizeMode="cover"
    >
      <SafeAreaView style={styles.safeArea}>
        <ScrollView
          contentContainerStyle={[styles.scrollContent, { paddingBottom: 140 }]}
          showsVerticalScrollIndicator={false}
        >
          {/* Header */}
          <View style={styles.header}>
            <Text style={styles.logoText}>
              Codeword<Text style={styles.semicolon}>;</Text>
            </Text>
          </View>

          {/* Title */}
          <Text style={styles.title}>Get Support</Text>

          {/* Support Options */}
          <View style={styles.optionsContainer}>
            {/* Send Codeword */}
            <Pressable style={[styles.card, styles.sendCodewordCard]} onPress={handleSendCodeword}>
              <Text style={styles.sendCodewordText}>Send Codeword</Text>
              <Text style={styles.chevron}>›</Text>
            </Pressable>

            {/* 988 Lifeline */}
            <Pressable style={styles.card} onPress={handle988Lifeline}>
              <View>
                <Text style={styles.cardTitle}>988 Lifeline</Text>
                <Text style={styles.cardSubtitle}>Speak or text with a crisis counselor</Text>
              </View>
              <Text style={styles.chevron}>›</Text>
            </Pressable>

            {/* Dial 911 Emergency */}
            <Pressable style={styles.card} onPress={handle911Emergency}>
              <Text style={styles.emergencyText}>Dial 911 Emergency</Text>
              <Text style={styles.chevron}>›</Text>
            </Pressable>

            {/* Manage My Allies */}
            <Pressable style={styles.card} onPress={handleManageAllies}>
              <Text style={styles.cardTitle}>Manage My Allies</Text>
              <Text style={styles.chevron}>›</Text>
            </Pressable>
          </View>
        </ScrollView>
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

      {/* Footer Navigation */}
      <View style={[styles.footer, { paddingBottom: insets.bottom }]}>
        <View style={styles.tabBar}>
          <Pressable style={styles.tab} onPress={() => router.push('/(tabs)/codeword')}>
            <Image
              source={require('../assets/icons/tabs/TabChat.png')}
              style={{ width: 24, height: 24, tintColor: '#666666' }}
              resizeMode="contain"
            />
          </Pressable>
          <Pressable style={styles.tab} onPress={() => router.push('/(tabs)/library')}>
            <Image
              source={require('../assets/icons/tabs/TabLibrary.png')}
              style={{ width: 24, height: 24, tintColor: '#666666' }}
              resizeMode="contain"
            />
          </Pressable>
          <View style={styles.fabContainer}>
            <Pressable style={styles.fab}>
              <Image
                source={require('../assets/icons/brand/SemicolonIconPurple.png')}
                style={{ width: 24, height: 24, tintColor: '#FFFFFF' }}
                resizeMode="contain"
              />
            </Pressable>
          </View>
          <Pressable style={styles.tab} onPress={() => router.push('/(tabs)/coach')}>
            <Image
              source={require('../assets/icons/tabs/TabCoach.png')}
              style={{ width: 24, height: 24, tintColor: '#666666' }}
              resizeMode="contain"
            />
          </Pressable>
          <Pressable style={styles.tab} onPress={() => router.push('/(tabs)/profile')}>
            <Image
              source={require('../assets/icons/tabs/TabProfile.png')}
              style={{ width: 24, height: 24, tintColor: '#666666' }}
              resizeMode="contain"
            />
          </Pressable>
        </View>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  safeArea: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  header: {
    alignItems: 'center',
    marginBottom: 40,
  },
  logoText: {
    fontSize: 24,
    fontWeight: '700',
    color: '#FFFFFF',
    letterSpacing: -0.5,
  },
  semicolon: {
    color: '#4BE3C1',
  },
  title: {
    fontSize: 36,
    fontWeight: '700',
    color: '#FFFFFF',
    marginBottom: 40,
  },
  optionsContainer: {
    gap: 16,
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 24,
    paddingVertical: 20,
    paddingHorizontal: 24,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 12,
      },
      android: {
        elevation: 4,
      },
    }),
  },
  sendCodewordCard: {
    backgroundColor: '#C9776E',
  },
  sendCodewordText: {
    fontSize: 20,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#1B1D22',
    marginBottom: 2,
  },
  cardSubtitle: {
    fontSize: 14,
    color: '#C9776E',
  },
  emergencyText: {
    fontSize: 20,
    fontWeight: '600',
    color: '#C9776E',
  },
  chevron: {
    fontSize: 24,
    color: '#FFFFFF',
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
  footer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#FFFFFF',
    borderTopWidth: 0.5,
    borderTopColor: '#E0E0E0',
  },
  tabBar: {
    flexDirection: 'row',
    height: 60,
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  tab: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 8,
  },
  fabContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  fab: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#642975',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    top: -20,
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 10,
  },
});
