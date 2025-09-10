import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  SafeAreaView,
  TextInput,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function CreateCodewordScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { ally, name } = useLocalSearchParams();
  const [codeword, setCodeword] = useState('');

  const allyName = typeof name === 'string' ? decodeURIComponent(name) : 'your ally';

  const handleBack = () => {
    router.back();
  };

  const handleContinue = () => {
    if (codeword.trim()) {
      router.push(
        `/review-codeword?ally=${ally}&name=${encodeURIComponent(allyName)}&codeword=${encodeURIComponent(codeword.trim())}`,
      );
    }
  };

  const isFormValid = codeword.trim().length > 0;

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        style={styles.flex}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 20}
      >
        {/* Header */}
        <View style={styles.header}>
          <Pressable onPress={handleBack} style={styles.backButton}>
            <Text style={styles.backIcon}>‹</Text>
          </Pressable>
        </View>

        {/* Content */}
        <View style={styles.content}>
          <Text style={styles.title}>Create a Codeword with {allyName}</Text>
          <Text style={styles.subtitle}>
            Your Codeword is a unique and personal word that you will use with your ally.
          </Text>

          {/* Input Field */}
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.textInput}
              placeholder="Enter your codeword"
              placeholderTextColor="#999999"
              value={codeword}
              onChangeText={setCodeword}
              autoCapitalize="none"
              autoCorrect={false}
              autoFocus={true}
            />
          </View>
        </View>

        {/* Continue Button */}
        <View style={[styles.footer, { paddingBottom: insets.bottom + 20 }]}>
          <Pressable
            style={[styles.continueButton, !isFormValid && styles.continueButtonDisabled]}
            onPress={handleContinue}
            disabled={!isFormValid}
          >
            <Text
              style={[styles.continueButtonText, !isFormValid && styles.continueButtonTextDisabled]}
            >
              Continue
            </Text>
          </Pressable>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F3F5',
  },
  flex: {
    flex: 1,
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
    marginBottom: 24,
    lineHeight: 40,
  },
  subtitle: {
    fontSize: 16,
    color: '#666666',
    textAlign: 'center',
    lineHeight: 24,
    marginBottom: 60,
    maxWidth: 320,
  },
  inputContainer: {
    width: '100%',
    maxWidth: 400,
  },
  textInput: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    paddingHorizontal: 20,
    paddingVertical: 16,
    fontSize: 18,
    color: '#1B1D22',
    borderWidth: 1,
    borderColor: '#E5E7EB',
    textAlign: 'center',
  },
  footer: {
    paddingHorizontal: 20,
  },
  continueButton: {
    backgroundColor: '#9CA3AF',
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
});
