import React, { useState } from 'react';
import { View, Text, Pressable, TextInput, ScrollView, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { colors, spacing, radii } from '../../src/theme/tokens';

export default function CoachScreen() {
  const router = useRouter();
  const [selectedPleasant, setSelectedPleasant] = useState(0.8); // Start high for "Content"
  const [selectedEnergy, setSelectedEnergy] = useState(0.2); // Start low for "Content"
  const [note, setNote] = useState('');

  // Smooth interpolation function for more responsive sliders
  const smoothInterpolate = (value: number): number => {
    // Add easing for smoother transitions
    const smoothed = value * value * (3 - 2 * value); // Smooth step function
    return Math.round(smoothed * 100) / 100; // Round to 2 decimal places for smoother steps
  };

  const handlePleasantTouch = (event: any) => {
    const { locationY } = event.nativeEvent;
    const sliderHeight = 220;
    const rawValue = Math.max(0, Math.min(1, 1 - locationY / sliderHeight));
    const smoothValue = smoothInterpolate(rawValue);
    setSelectedPleasant(smoothValue);
  };

  const handleEnergyTouch = (event: any) => {
    const { locationY } = event.nativeEvent;
    const sliderHeight = 220;
    const rawValue = Math.max(0, Math.min(1, 1 - locationY / sliderHeight));
    const smoothValue = smoothInterpolate(rawValue);
    setSelectedEnergy(smoothValue);
  };

  // Enhanced mood calculation with more granular breakpoints
  const getMoodState = () => {
    const pleasant = selectedPleasant;
    const energy = selectedEnergy;

    // More nuanced mood categories with smoother transitions
    if (pleasant >= 0.8 && energy >= 0.8)
      return { title: 'Ecstatic', desc: 'Feeling extremely joyful and energetic' };
    if (pleasant >= 0.6 && energy >= 0.8)
      return { title: 'Excited', desc: 'Feeling enthusiastic and energetic' };
    if (pleasant >= 0.8 && energy >= 0.6)
      return { title: 'Elated', desc: 'Feeling joyful and energetic' };
    if (pleasant >= 0.6 && energy >= 0.6)
      return { title: 'Happy', desc: 'Feeling good and active' };
    if (pleasant >= 0.8 && energy <= 0.4)
      return { title: 'Content', desc: 'Feeling peaceful and satisfied' };
    if (pleasant >= 0.6 && energy <= 0.4)
      return { title: 'Relaxed', desc: 'Feeling calm and at ease' };
    if (pleasant >= 0.4 && energy >= 0.8)
      return { title: 'Restless', desc: 'Feeling energetic but unsettled' };
    if (pleasant <= 0.4 && energy >= 0.8)
      return { title: 'Enraged', desc: 'Full of extreme anger and energy' };
    if (pleasant <= 0.4 && energy >= 0.6)
      return { title: 'Frustrated', desc: 'Feeling annoyed and agitated' };
    if (pleasant <= 0.2 && energy <= 0.4)
      return { title: 'Depressed', desc: 'Feeling very low and tired' };
    if (pleasant <= 0.4 && energy <= 0.4) return { title: 'Low', desc: 'Feeling tired or down' };
    if (pleasant >= 0.4 && pleasant <= 0.6 && energy >= 0.4 && energy <= 0.6)
      return { title: 'Neutral', desc: 'Feeling balanced and steady' };

    return { title: 'Mixed', desc: 'Feeling a complex mix of emotions' };
  };

  return (
    <LinearGradient
      colors={[colors.gradA, colors.gradB]}
      start={{ x: 0.2, y: 0.0 }}
      end={{ x: 0.9, y: 1.0 }}
      style={{ flex: 1 }}
    >
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.pageTitle}>How are you feeling?</Text>

        <View style={styles.section}>
          <Text style={styles.label}>Track your mood</Text>

          {/* Parallel Vertical Sliders */}
          <View style={styles.slidersContainer}>
            {/* Pleasant Slider */}
            <View style={styles.sliderColumn}>
              <Text style={styles.sliderColumnTitle}>Pleasantness</Text>
              <View style={styles.verticalSliderContainer}>
                <Text style={styles.sliderTopLabel}>Pleasant</Text>
                <Pressable
                  style={styles.verticalSliderTrack}
                  onTouchStart={handlePleasantTouch}
                  onTouchMove={handlePleasantTouch}
                >
                  <LinearGradient
                    colors={['#00FF7F', '#9370DB']}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 0, y: 1 }}
                    style={styles.sliderGradient}
                  />
                  <View
                    style={[
                      styles.verticalSliderThumb,
                      { top: Math.max(0, Math.min(200, (1 - selectedPleasant) * 200)) },
                    ]}
                  />
                </Pressable>
                <Text style={styles.sliderBottomLabel}>Unpleasant</Text>
              </View>
            </View>

            {/* Energy Slider */}
            <View style={styles.sliderColumn}>
              <Text style={styles.sliderColumnTitle}>Energy Level</Text>
              <View style={styles.verticalSliderContainer}>
                <Text style={styles.sliderTopLabel}>High energy</Text>
                <Pressable
                  style={styles.verticalSliderTrack}
                  onTouchStart={handleEnergyTouch}
                  onTouchMove={handleEnergyTouch}
                >
                  <LinearGradient
                    colors={['#00BFFF', '#9370DB']}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 0, y: 1 }}
                    style={styles.sliderGradient}
                  />
                  <View
                    style={[
                      styles.verticalSliderThumb,
                      { top: Math.max(0, Math.min(200, (1 - selectedEnergy) * 200)) },
                    ]}
                  />
                </Pressable>
                <Text style={styles.sliderBottomLabel}>Low energy</Text>
              </View>
            </View>
          </View>

          {/* Mood Result */}
          <View style={styles.resultCard}>
            <Text style={styles.resultTitle}>{getMoodState().title}</Text>
            <Text style={styles.resultDesc}>{getMoodState().desc}</Text>
            <View style={styles.moodValues}>
              <Text style={styles.valueText}>Pleasant: {Math.round(selectedPleasant * 100)}%</Text>
              <Text style={styles.valueText}>Energy: {Math.round(selectedEnergy * 100)}%</Text>
            </View>
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
    textAlign: 'center',
  },
  section: {
    marginBottom: spacing.xl,
  },
  label: {
    fontSize: 16,
    color: colors.text,
    marginBottom: spacing.md,
  },
  slidersContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  sliderColumn: {
    alignItems: 'center',
    flex: 1,
  },
  sliderColumnTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 16,
    textAlign: 'center',
  },
  verticalSliderContainer: {
    alignItems: 'center',
    height: 280,
  },
  sliderTopLabel: {
    fontSize: 12,
    fontWeight: '500',
    color: colors.textSubtle,
    marginBottom: 8,
    textAlign: 'center',
  },
  sliderBottomLabel: {
    fontSize: 12,
    fontWeight: '500',
    color: colors.textSubtle,
    marginTop: 8,
    textAlign: 'center',
  },
  verticalSliderTrack: {
    width: 60,
    height: 220,
    borderRadius: 30,
    position: 'relative',
    overflow: 'hidden',
  },
  sliderGradient: {
    width: '100%',
    height: '100%',
  },
  verticalSliderThumb: {
    position: 'absolute',
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#1B1D22',
    left: '50%',
    marginLeft: -16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.25,
    shadowRadius: 6,
    elevation: 6,
    borderWidth: 2,
    borderColor: '#FFFFFF',
  },
  resultCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#642975',
    paddingVertical: 16,
    paddingHorizontal: 20,
    marginTop: 16,
  },
  resultTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1B1D22',
    marginBottom: 4,
  },
  resultDesc: {
    fontSize: 14,
    color: '#666666',
    marginBottom: 12,
  },
  moodValues: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: 8,
    borderTopWidth: 1,
    borderTopColor: '#F0F0F0',
  },
  valueText: {
    fontSize: 12,
    color: '#999999',
    fontWeight: '500',
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
