import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Pressable, Platform } from 'react-native';
import { useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import SendCodewordModal from '../../src/components/SendCodewordModal';

export default function LaunchpadScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const [showCodewordModal, setShowCodewordModal] = useState(false);

  return (
    <View style={styles.container}>
      <ScrollView
        contentContainerStyle={[styles.content, { paddingBottom: insets.bottom + 100 }]}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.hero}>
          <Text style={styles.title}>Send a Codeword</Text>
          <Text style={styles.subtitle}>Your story continues</Text>
        </View>

        {/* Main Codeword Button */}
        <Pressable style={styles.codewordButton} onPress={() => setShowCodewordModal(true)}>
          <Text style={styles.codewordButtonText}>Send Codeword</Text>
          <Text style={styles.codewordButtonSubtext}>Emergency alert to your ally</Text>
        </Pressable>

        <View style={styles.cards}>
          <Pressable style={styles.card} onPress={() => router.push('/codeword')}>
            <Text style={styles.cardTitle}>Start Chat</Text>
            <Text style={styles.cardSubtitle}>Talk to your AI coach</Text>
          </Pressable>

          <Pressable style={styles.card} onPress={() => router.push('/library')}>
            <Text style={styles.cardTitle}>Browse Guides</Text>
            <Text style={styles.cardSubtitle}>Find helpful resources</Text>
          </Pressable>

          <Pressable style={styles.card} onPress={() => router.push('/coach')}>
            <Text style={styles.cardTitle}>Track Mood</Text>
            <Text style={styles.cardSubtitle}>Monitor your wellbeing</Text>
          </Pressable>
        </View>
      </ScrollView>

      {/* Send Codeword Modal */}
      <SendCodewordModal visible={showCodewordModal} onClose={() => setShowCodewordModal(false)} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'transparent',
  },
  content: {
    paddingHorizontal: 20,
    paddingTop: 30,
  },
  hero: {
    marginBottom: 30,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: '#1B1D22',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#6B6E76',
    fontWeight: '500',
  },
  codewordButton: {
    backgroundColor: '#FF4444',
    borderRadius: 24,
    paddingVertical: 24,
    paddingHorizontal: 24,
    marginBottom: 30,
    alignItems: 'center',
    ...Platform.select({
      ios: {
        shadowColor: '#FF4444',
        shadowOffset: { width: 0, height: 8 },
        shadowOpacity: 0.3,
        shadowRadius: 16,
      },
      android: {
        elevation: 8,
      },
    }),
  },
  codewordButtonText: {
    fontSize: 20,
    fontWeight: '700',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  codewordButtonSubtext: {
    fontSize: 14,
    color: '#FFFFFF',
    opacity: 0.9,
  },
  cards: {
    gap: 16,
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    paddingVertical: 20,
    paddingHorizontal: 20,
    marginBottom: 16,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 8 },
        shadowOpacity: 0.08,
        shadowRadius: 18,
      },
      android: {
        elevation: 4,
      },
    }),
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1B1D22',
    marginBottom: 6,
  },
  cardSubtitle: {
    fontSize: 14,
    color: '#6B6E76',
  },
});
