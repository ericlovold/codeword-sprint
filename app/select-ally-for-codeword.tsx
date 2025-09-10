import React, { useState } from 'react';
import { View, Text, StyleSheet, Pressable, SafeAreaView } from 'react-native';
import { useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function SelectAllyForCodewordScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const [selectedAlly, setSelectedAlly] = useState<string | null>(null);

  // Mock ally data - in real app this would come from previous screen
  const ally = {
    id: 'paul-gardner',
    name: 'Paul Gardner',
    imageUri: 'mock', // Represents the photo
  };

  const handleBack = () => {
    router.back();
  };

  const handleAllyToggle = () => {
    setSelectedAlly(selectedAlly === ally.id ? null : ally.id);
  };

  const handleContinue = () => {
    if (selectedAlly) {
      router.push(`/create-codeword?ally=${selectedAlly}&name=${encodeURIComponent(ally.name)}`);
    }
  };

  const handleSetupLater = async () => {
    // Mark onboarding as completed even if skipping ally setup
    const { storage } = await import('../src/utils/storage');
    await storage.setOnboardingCompleted();
    // Navigate to main app
    router.push('/(tabs)');
  };

  const isSelected = selectedAlly === ally.id;

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
        <Text style={styles.title}>Who do you want to share a Codeword with?</Text>

        {/* Ally Card */}
        <Pressable style={styles.allyCard} onPress={handleAllyToggle}>
          <View style={styles.allyInfo}>
            <View style={styles.allyAvatar}>
              {/* Mock Paul Gardner's photo */}
              <View style={styles.mockPhoto} />
            </View>
            <Text style={styles.allyName}>{ally.name}</Text>
          </View>

          <View style={[styles.checkbox, isSelected && styles.checkboxSelected]}>
            {isSelected && <View style={styles.checkmark} />}
          </View>
        </Pressable>
      </View>

      {/* Buttons */}
      <View style={[styles.footer, { paddingBottom: insets.bottom + 20 }]}>
        <Pressable
          style={[styles.continueButton, !isSelected && styles.continueButtonDisabled]}
          onPress={handleContinue}
          disabled={!isSelected}
        >
          <Text
            style={[styles.continueButtonText, !isSelected && styles.continueButtonTextDisabled]}
          >
            Continue
          </Text>
        </Pressable>

        <Pressable style={styles.setupLaterButton} onPress={handleSetupLater}>
          <Text style={styles.setupLaterButtonText}>Setup Later</Text>
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
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 40,
  },
  title: {
    fontSize: 32,
    fontWeight: '700',
    color: '#1B1D22',
    textAlign: 'center',
    marginBottom: 60,
    lineHeight: 40,
  },
  allyCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 24,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    maxWidth: 400,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  allyInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  allyAvatar: {
    marginRight: 16,
  },
  mockPhoto: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#DDDDDD',
  },
  allyName: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1B1D22',
  },
  checkbox: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#E5E7EB',
    backgroundColor: 'transparent',
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkboxSelected: {
    backgroundColor: '#642975',
    borderColor: '#642975',
  },
  checkmark: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#FFFFFF',
  },
  footer: {
    paddingHorizontal: 20,
    gap: 16,
  },
  continueButton: {
    backgroundColor: '#1B1D22',
    borderRadius: 25,
    paddingVertical: 16,
    alignItems: 'center',
  },
  continueButtonDisabled: {
    backgroundColor: '#9CA3AF',
  },
  continueButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  continueButtonTextDisabled: {
    color: '#FFFFFF',
  },
  setupLaterButton: {
    backgroundColor: 'transparent',
    borderRadius: 25,
    paddingVertical: 16,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#1B1D22',
  },
  setupLaterButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1B1D22',
  },
});
