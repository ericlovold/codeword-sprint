import React from 'react';
import { View, Text, StyleSheet, Pressable, SafeAreaView } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function ReviewCodewordScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { ally, name, codeword } = useLocalSearchParams();

  const allyName = typeof name === 'string' ? decodeURIComponent(name) : 'Your Ally';
  const codewordText = typeof codeword === 'string' ? decodeURIComponent(codeword) : '';

  const handleBack = () => {
    router.back();
  };

  const handleSendInvite = () => {
    // In real app, this would send the invitation
    router.push(`/invite-sent?ally=${ally}&name=${encodeURIComponent(allyName)}`);
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Pressable onPress={handleBack} style={styles.backButton}>
          <Text style={styles.backIcon}>‹</Text>
        </Pressable>
      </View>

      {/* Content */}
      <View style={styles.content}>
        <Text style={styles.title}>Review</Text>
        <Text style={styles.subtitle}>
          Please review the information below before sending an invite to your ally.
        </Text>

        {/* Review Card */}
        <View style={styles.reviewCard}>
          <Text style={styles.cardTitle}>Your Codeword Setup</Text>

          {/* Selected Ally */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Selected Ally</Text>
            <View style={styles.allyInfo}>
              <View style={styles.allyAvatar}>
                {/* Mock Paul Gardner's photo */}
                <View style={styles.mockPhoto} />
              </View>
              <Text style={styles.allyName}>{allyName}</Text>
            </View>
          </View>

          {/* Your Codeword */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Your Codeword</Text>
            <Text style={styles.codewordText}>"{codewordText}"</Text>
          </View>
        </View>

        {/* What Happens Next */}
        <View style={styles.nextSection}>
          <Text style={styles.nextTitle}>What happens next?</Text>
          <Text style={styles.nextDescription}>
            Your ally will receive an invite to join your support network. You can start using
            Codeword for crisis support and intervention.
          </Text>
        </View>
      </View>

      {/* Send Invite Button */}
      <View style={[styles.footer, { paddingBottom: insets.bottom + 20 }]}>
        <Pressable style={styles.sendButton} onPress={handleSendInvite}>
          <Text style={styles.sendButtonText}>Send Codeword Invite</Text>
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
  content: {
    flex: 1,
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: '700',
    color: '#1B1D22',
    marginBottom: 12,
  },
  subtitle: {
    fontSize: 16,
    color: '#666666',
    lineHeight: 22,
    marginBottom: 32,
  },
  reviewCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 24,
    marginBottom: 32,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1B1D22',
    marginBottom: 24,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1B1D22',
    marginBottom: 12,
  },
  allyInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  allyAvatar: {
    marginRight: 12,
  },
  mockPhoto: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#DDDDDD',
  },
  allyName: {
    fontSize: 18,
    fontWeight: '500',
    color: '#1B1D22',
  },
  codewordText: {
    fontSize: 24,
    fontWeight: '600',
    color: '#1B1D22',
  },
  nextSection: {
    flex: 1,
  },
  nextTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1B1D22',
    marginBottom: 12,
  },
  nextDescription: {
    fontSize: 16,
    color: '#666666',
    lineHeight: 24,
  },
  footer: {
    paddingHorizontal: 20,
  },
  sendButton: {
    backgroundColor: '#1B1D22',
    borderRadius: 25,
    paddingVertical: 16,
    alignItems: 'center',
  },
  sendButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
  },
});
