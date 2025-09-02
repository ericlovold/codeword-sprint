import React from 'react';
import { View, Text, StyleSheet, ScrollView, Pressable } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { colors, radii, spacing } from '../../src/theme/tokens';

export default function LaunchpadScreen() {
  const router = useRouter();

  return (
    <LinearGradient
      colors={[colors.gradTop, colors.gradMid, colors.gradBot]}
      start={{ x: 0.2, y: 0.0 }}
      end={{ x: 0.9, y: 1.0 }}
      style={{ flex: 1 }}
    >
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.hero}>
          <Text style={styles.heroTitle}>Send a Codeword</Text>
          <Text style={styles.heroSub}>Your story continues</Text>
        </View>

        <View style={styles.cards}>
          <Pressable style={styles.card} onPress={() => router.push('/chat')}>
            <Text style={styles.cardTitle}>Start Chat</Text>
            <Text style={styles.cardDesc}>Talk to your AI coach</Text>
          </Pressable>

          <Pressable style={styles.card} onPress={() => router.push('/library')}>
            <Text style={styles.cardTitle}>Browse Guides</Text>
            <Text style={styles.cardDesc}>Find helpful resources</Text>
          </Pressable>

          <Pressable style={styles.card} onPress={() => router.push('/coach')}>
            <Text style={styles.cardTitle}>Track Mood</Text>
            <Text style={styles.cardDesc}>Monitor your wellbeing</Text>
          </Pressable>
        </View>
      </ScrollView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: spacing.lg,
    paddingTop: spacing.xxl,
  },
  hero: {
    alignItems: 'center',
    marginBottom: spacing.xxl,
  },
  heroTitle: {
    fontSize: 28,
    fontWeight: '700',
    color: colors.text,
    marginBottom: spacing.sm,
  },
  heroSub: {
    fontSize: 16,
    color: colors.textSubtle,
  },
  cards: {
    gap: spacing.md,
  },
  card: {
    backgroundColor: 'white',
    borderRadius: radii.lg,
    padding: spacing.xl,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 2 },
    elevation: 3,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.text,
    marginBottom: spacing.xs,
  },
  cardDesc: {
    fontSize: 14,
    color: colors.textSubtle,
  },
});
