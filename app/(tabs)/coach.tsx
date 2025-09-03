import React, { useState } from 'react';
import { View, Text, Pressable, TextInput, ScrollView, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { colors, spacing, radii } from '../../src/theme/tokens';

const moods = ['😞', '😕', '😐', '🙂', '😄'];

export default function CoachScreen() {
  const [selected, setSelected] = useState<number | null>(null);
  const [note, setNote] = useState('');

  return (
    <LinearGradient
      colors={[colors.gradTop, colors.gradMid, colors.gradBot]}
      start={{ x: 0.2, y: 0.0 }}
      end={{ x: 0.9, y: 1.0 }}
      style={{ flex: 1 }}
    >
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.pageTitle}>Coach</Text>

        <View style={styles.section}>
          <Text style={styles.label}>How are you feeling today?</Text>
          <View style={styles.moodRow}>
            {moods.map((m, i) => (
              <Pressable
                key={i}
                onPress={() => setSelected(i)}
                style={[styles.moodButton, selected === i && styles.moodButtonActive]}
              >
                <Text style={styles.moodEmoji}>{m}</Text>
              </Pressable>
            ))}
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.label}>Add a note (optional)</Text>
          <TextInput
            placeholder="How's your day going?"
            placeholderTextColor={colors.textSubtle}
            value={note}
            onChangeText={setNote}
            multiline
            style={styles.noteInput}
          />
        </View>

        <Pressable style={styles.saveButton}>
          <Text style={styles.saveButtonText}>Save Entry</Text>
        </Pressable>
      </ScrollView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: spacing.lg,
    paddingTop: spacing.xl,
  },
  pageTitle: {
    fontSize: 28,
    fontWeight: '700',
    color: colors.text,
    marginBottom: spacing.xl,
  },
  section: {
    marginBottom: spacing.xl,
  },
  label: {
    fontSize: 16,
    color: colors.text,
    marginBottom: spacing.md,
  },
  moodRow: {
    flexDirection: 'row',
    gap: 12,
  },
  moodButton: {
    width: 56,
    height: 56,
    borderRadius: 28,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  moodButtonActive: {
    backgroundColor: colors.brandFaint,
    borderWidth: 2,
    borderColor: colors.brand,
  },
  moodEmoji: {
    fontSize: 24,
  },
  noteInput: {
    backgroundColor: 'white',
    borderRadius: radii.lg,
    padding: spacing.lg,
    minHeight: 100,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    fontSize: 16,
    color: colors.text,
  },
  saveButton: {
    backgroundColor: colors.brand,
    borderRadius: radii.pill,
    paddingVertical: spacing.lg,
    alignItems: 'center',
  },
  saveButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
});
