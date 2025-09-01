import React from 'react';
import { View, Text, ScrollView, Pressable, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import GradientScreen from '../../src/components/GradientScreen';
import BrandHeader from '../../src/components/BrandHeader';
import { colors, radii, space, type } from '../../src/theme/tokens';

export default function CodewordScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();

  return (
    <GradientScreen>
      <BrandHeader />
      <ScrollView
        contentContainerStyle={[styles.container, { paddingBottom: insets.bottom + 100 }]}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.heroSection}>
          <Text style={styles.title}>Send a Codeword</Text>
          <Text style={styles.subtitle}>Reach out for support when you need it most</Text>
        </View>

        <View style={styles.cardsContainer}>
          <Pressable style={styles.card} onPress={() => router.push('/help')}>
            <View style={styles.cardIcon}>
              <Ionicons name="alert-circle" size={32} color={colors.brand.purple} />
            </View>
            <Text style={styles.cardTitle}>Crisis Support</Text>
            <Text style={styles.cardDescription}>Get immediate help and resources</Text>
          </Pressable>

          <Pressable style={styles.card} onPress={() => router.push('/chat')}>
            <View style={styles.cardIcon}>
              <Ionicons name="chatbubbles" size={32} color={colors.brand.purple} />
            </View>
            <Text style={styles.cardTitle}>Talk to Coach</Text>
            <Text style={styles.cardDescription}>Chat with your AI support coach</Text>
          </Pressable>

          <Pressable style={styles.card} onPress={() => router.push('/library')}>
            <View style={styles.cardIcon}>
              <Ionicons name="library" size={32} color={colors.brand.purple} />
            </View>
            <Text style={styles.cardTitle}>Resources</Text>
            <Text style={styles.cardDescription}>Browse guides and coping strategies</Text>
          </Pressable>

          <Pressable style={styles.card} onPress={() => router.push('/profile')}>
            <View style={styles.cardIcon}>
              <Ionicons name="people" size={32} color={colors.brand.purple} />
            </View>
            <Text style={styles.cardTitle}>Your Allies</Text>
            <Text style={styles.cardDescription}>Connect with your support network</Text>
          </Pressable>
        </View>

        <View style={styles.infoSection}>
          <Text style={styles.infoText}>
            The semicolon represents a pause, not an end. Your story continues.
          </Text>
        </View>
      </ScrollView>
    </GradientScreen>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: space[16],
  },
  heroSection: {
    alignItems: 'center',
    marginTop: space[24],
    marginBottom: space[32],
  },
  title: {
    ...type.h1,
    color: colors.text.primary,
    marginBottom: space[8],
  },
  subtitle: {
    ...type.body,
    color: colors.text.secondary,
    textAlign: 'center',
    maxWidth: 280,
  },
  cardsContainer: {
    gap: space[16],
  },
  card: {
    backgroundColor: colors.ui.white,
    borderRadius: radii.lg,
    padding: space[20],
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 2 },
    elevation: 3,
  },
  cardIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: colors.ui.bgSoft,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: space[12],
  },
  cardTitle: {
    ...type.h2,
    fontSize: 18,
    color: colors.text.primary,
    marginBottom: space[4],
  },
  cardDescription: {
    ...type.body,
    fontSize: 14,
    color: colors.text.secondary,
  },
  infoSection: {
    marginTop: space[32],
    padding: space[20],
    backgroundColor: colors.ui.white,
    borderRadius: radii.lg,
    opacity: 0.95,
  },
  infoText: {
    ...type.body,
    color: colors.brand.purple,
    textAlign: 'center',
    fontStyle: 'italic',
  },
});
