import React from 'react';
import { View, Text, StyleSheet, ScrollView, Pressable, Platform } from 'react-native';
import { useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function LaunchpadScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();

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
