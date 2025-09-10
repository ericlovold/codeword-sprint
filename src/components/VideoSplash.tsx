import React, { useEffect, useRef } from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import { Video, ResizeMode, AVPlaybackStatus } from 'expo-av';

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

interface VideoSplashProps {
  onComplete: () => void;
}

export default function VideoSplash({ onComplete }: VideoSplashProps) {
  const video = useRef<Video>(null);
  const hasCompleted = useRef(false);

  const handlePlaybackStatusUpdate = (status: AVPlaybackStatus) => {
    if (status.isLoaded && status.didJustFinish && !hasCompleted.current) {
      hasCompleted.current = true;
      onComplete();
    }
  };

  return (
    <View style={styles.container}>
      <Video
        ref={video}
        style={styles.video}
        source={require('../../assets/videos/CodewordLogo.mp4')}
        resizeMode={ResizeMode.CONTAIN}
        shouldPlay={true}
        isLooping={false}
        isMuted={false}
        onPlaybackStatusUpdate={handlePlaybackStatusUpdate}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#642975', // Purple background to match brand
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  video: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    width: screenWidth + 2, // Add slight overflow to prevent edge lines
    height: screenHeight + 2,
    marginLeft: -1, // Center the overflow
    marginTop: -1,
  },
});
