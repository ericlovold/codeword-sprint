import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Pressable,
  SafeAreaView,
  TextInput,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function CreateCodewordScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const [codeword, setCodeword] = useState('');
  const [allyName, setAllyName] = useState('');
  const [allyPhone, setAllyPhone] = useState('');

  const handleCreateCodeword = () => {
    // Save codeword setup logic here
    console.log('Creating codeword:', { codeword, allyName, allyPhone });
    // Navigate back to get support or main flow
    router.back();
  };

  const handleCancel = () => {
    router.back();
  };

  return (
    <LinearGradient
      colors={['#642975', '#8B5FBF']}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.container}
    >
      <SafeAreaView style={styles.safeArea}>
        <ScrollView
          contentContainerStyle={[styles.scrollContent, { paddingBottom: insets.bottom + 100 }]}
          showsVerticalScrollIndicator={false}
        >
          {/* Header */}
          <View style={styles.header}>
            <Text style={styles.logoText}>
              Codeword<Text style={styles.semicolon}>;</Text>
            </Text>
          </View>

          {/* Title */}
          <Text style={styles.title}>Set Up Your Codeword</Text>
          <Text style={styles.subtitle}>
            Create a secret word and add an ally who will respond when you need support.
          </Text>

          {/* Form */}
          <View style={styles.formContainer}>
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Your Codeword</Text>
              <TextInput
                style={styles.input}
                value={codeword}
                onChangeText={setCodeword}
                placeholder="Enter a secret word..."
                placeholderTextColor="#999999"
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>Ally Name</Text>
              <TextInput
                style={styles.input}
                value={allyName}
                onChangeText={setAllyName}
                placeholder="Enter your ally's name"
                placeholderTextColor="#999999"
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>Ally Phone Number</Text>
              <TextInput
                style={styles.input}
                value={allyPhone}
                onChangeText={setAllyPhone}
                placeholder="Enter phone number"
                placeholderTextColor="#999999"
                keyboardType="phone-pad"
              />
            </View>
          </View>

          {/* Actions */}
          <View style={styles.actions}>
            <Pressable style={styles.createButton} onPress={handleCreateCodeword}>
              <Text style={styles.createButtonText}>Create Codeword</Text>
            </Pressable>

            <Pressable style={styles.cancelButton} onPress={handleCancel}>
              <Text style={styles.cancelButtonText}>Cancel</Text>
            </Pressable>
          </View>
        </ScrollView>
      </SafeAreaView>
    </LinearGradient>
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
    fontSize: 32,
    fontWeight: '700',
    color: '#FFFFFF',
    marginBottom: 16,
  },
  subtitle: {
    fontSize: 16,
    color: '#FFFFFF',
    opacity: 0.8,
    lineHeight: 24,
    marginBottom: 40,
  },
  formContainer: {
    gap: 24,
    marginBottom: 40,
  },
  inputGroup: {
    gap: 8,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  input: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    paddingHorizontal: 16,
    paddingVertical: 16,
    fontSize: 16,
    color: '#1B1D22',
  },
  actions: {
    gap: 16,
  },
  createButton: {
    backgroundColor: '#4BE3C1',
    borderRadius: 16,
    paddingVertical: 16,
    alignItems: 'center',
  },
  createButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1B1D22',
  },
  cancelButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 16,
    paddingVertical: 16,
    alignItems: 'center',
  },
  cancelButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
  },
});
