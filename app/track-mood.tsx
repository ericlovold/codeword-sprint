import React, { useState } from 'react';
import { View, Text, StyleSheet, Pressable, SafeAreaView, Modal, PanResponder } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function TrackMoodScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const [showModal, setShowModal] = useState(true);
  const [selectedPleasant, setSelectedPleasant] = useState(0.8); // Start high for "Content"
  const [selectedEnergy, setSelectedEnergy] = useState(0.2); // Start low for "Content"

  const handleClose = () => {
    setShowModal(false);
    router.back();
  };

  const handleShare = () => {
    // Share mood with ally logic
    console.log('Sharing mood:', { pleasant: selectedPleasant, energy: selectedEnergy });
    handleClose();
  };

  const getMoodLabel = () => {
    if (selectedPleasant > 0.5 && selectedEnergy > 0.5)
      return { title: 'Elated', desc: 'Feeling joyful and energetic' };
    if (selectedPleasant > 0.5 && selectedEnergy <= 0.5)
      return { title: 'Content', desc: 'Feeling peaceful and satisfied' };
    if (selectedPleasant <= 0.5 && selectedEnergy > 0.5)
      return { title: 'Enraged', desc: 'Full of extreme anger' };
    return { title: 'Low', desc: 'Feeling tired or down' };
  };

  const mood = getMoodLabel();

  return (
    <Modal
      visible={showModal}
      transparent={true}
      animationType="slide"
      onRequestClose={handleClose}
    >
      <View style={styles.container}>
        <SafeAreaView style={styles.safeArea}>
          <View style={styles.content}>
            {/* Header */}
            <View style={styles.header}>
              <Pressable onPress={handleClose} style={styles.closeButton}>
                <Text style={styles.closeText}>✕</Text>
              </Pressable>
            </View>

            {/* Title */}
            <Text style={styles.title}>How are you feeling?</Text>

            {/* Mood Grid */}
            <View style={styles.gridContainer}>
              {/* Gradient Background */}
              <LinearGradient
                colors={['#00FF7F', '#00BFFF', '#9370DB']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={styles.gradientBox}
              >
                {/* Axis Labels */}
                <Text style={[styles.axisLabel, styles.topLabel]}>Pleasant</Text>
                <Text style={[styles.axisLabel, styles.rightLabel]}>High energy</Text>
                <Text style={[styles.axisLabel, styles.bottomLabel]}>Unpleasant</Text>
                <Text style={[styles.axisLabel, styles.leftLabel]}>Low energy</Text>

                {/* Sliders Container */}
                <View style={styles.slidersContainer}>
                  {/* Vertical Slider Track (Pleasant/Unpleasant) */}
                  <View style={[styles.sliderTrack, styles.verticalTrack]} />

                  {/* Horizontal Slider Track (Energy) */}
                  <View style={[styles.sliderTrack, styles.horizontalTrack]} />

                  {/* Pleasant Thumb */}
                  <View
                    style={[
                      styles.sliderThumb,
                      styles.verticalThumb,
                      { top: (1 - selectedPleasant) * 240 },
                    ]}
                  />

                  {/* Energy Thumb */}
                  <View
                    style={[
                      styles.sliderThumb,
                      styles.horizontalThumb,
                      { left: selectedEnergy * 240 },
                    ]}
                  />
                </View>
              </LinearGradient>
            </View>

            {/* Mood Result */}
            <View style={styles.resultCard}>
              <Text style={styles.resultTitle}>{mood.title}</Text>
              <Text style={styles.resultDesc}>{mood.desc}</Text>
            </View>

            {/* Share Button */}
            <Pressable style={styles.shareButton} onPress={handleShare}>
              <Text style={styles.shareButtonText}>Share with my Ally</Text>
            </Pressable>
          </View>
        </SafeAreaView>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  safeArea: {
    flex: 1,
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
  },
  header: {
    alignItems: 'flex-end',
    paddingTop: 20,
  },
  closeButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  closeText: {
    fontSize: 24,
    color: '#1B1D22',
    fontWeight: '300',
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: '#1B1D22',
    textAlign: 'center',
    marginBottom: 40,
  },
  gridContainer: {
    alignItems: 'center',
    marginBottom: 40,
  },
  gradientBox: {
    width: 300,
    height: 300,
    borderRadius: 24,
    position: 'relative',
    overflow: 'hidden',
  },
  axisLabel: {
    position: 'absolute',
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  topLabel: {
    top: 20,
    left: '50%',
    transform: [{ translateX: -40 }],
  },
  rightLabel: {
    right: 20,
    top: '50%',
    transform: [{ translateY: -10 }],
  },
  bottomLabel: {
    bottom: 20,
    left: '50%',
    transform: [{ translateX: -45 }],
  },
  leftLabel: {
    left: 20,
    top: '50%',
    transform: [{ translateY: -10 }],
  },
  slidersContainer: {
    position: 'absolute',
    top: 60,
    left: 60,
    width: 240,
    height: 240,
  },
  sliderTrack: {
    position: 'absolute',
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    borderRadius: 4,
  },
  verticalTrack: {
    width: 8,
    top: 0,
    bottom: 0,
    left: '50%',
    transform: [{ translateX: -4 }],
  },
  horizontalTrack: {
    height: 8,
    left: 0,
    right: 0,
    top: '50%',
    transform: [{ translateY: -4 }],
  },
  sliderThumb: {
    position: 'absolute',
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#1B1D22',
  },
  verticalThumb: {
    left: '50%',
    marginLeft: -16,
    top: 0,
  },
  horizontalThumb: {
    top: '50%',
    marginTop: -16,
    left: 0,
  },
  resultCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    borderWidth: 2,
    borderColor: '#642975',
    paddingVertical: 20,
    paddingHorizontal: 24,
    marginBottom: 30,
  },
  resultTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1B1D22',
    marginBottom: 4,
  },
  resultDesc: {
    fontSize: 16,
    color: '#666666',
  },
  shareButton: {
    backgroundColor: '#1B1D22',
    borderRadius: 24,
    paddingVertical: 18,
    alignItems: 'center',
  },
  shareButtonText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#FFFFFF',
  },
});
