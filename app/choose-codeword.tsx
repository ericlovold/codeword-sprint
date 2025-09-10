import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  Dimensions,
  SafeAreaView,
  Image,
  ScrollView,
  NativeScrollEvent,
  NativeSyntheticEvent,
} from 'react-native';
import { useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const { width: screenWidth } = Dimensions.get('window');

interface OnboardingSlide {
  id: number;
  icon: any;
  title: string;
  description: string;
}

const onboardingSlides: OnboardingSlide[] = [
  {
    id: 1,
    icon: require('../assets/icons/Onboarding Icon 01.png'),
    title: 'Choose Your\nCodeword',
    description:
      "Pick a codeword that feels safe. This is your signal for when you need help. It's simple, quick, and powerful.",
  },
  {
    id: 2,
    icon: require('../assets/icons/Onboarding Icon 02.png'),
    title: 'Connect Your\nAllies',
    description:
      "Add trusted friends and family who can respond when you send your codeword. They'll be notified instantly.",
  },
  {
    id: 3,
    icon: require('../assets/icons/Onboarding Icon 03.png'),
    title: 'When to Use Your\nCodeword',
    description:
      "Feeling overwhelmed?\nSend your Codeword to alert your allies. They'll be notified instantly, ready to help when you need it most.",
  },
  {
    id: 4,
    icon: require('../assets/icons/Onboarding Icon 04.png'),
    title: 'Personal AI\nCoaching',
    description:
      "You and your allies get real-time AI-powered tips to guide you through support. With personalized coaching, you'll know exactly how to respond, helping you both feel understood and supported.",
  },
];

export default function ChooseCodewordScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const [currentSlide, setCurrentSlide] = useState(0);
  const scrollViewRef = useRef<ScrollView>(null);

  const nextSlide = () => {
    if (currentSlide < onboardingSlides.length - 1) {
      const newIndex = currentSlide + 1;
      setCurrentSlide(newIndex);
      scrollViewRef.current?.scrollTo({ x: newIndex * screenWidth, animated: true });
    } else {
      // Navigate to terms and conditions after onboarding
      router.push('/terms-conditions');
    }
  };

  const prevSlide = () => {
    if (currentSlide > 0) {
      const newIndex = currentSlide - 1;
      setCurrentSlide(newIndex);
      scrollViewRef.current?.scrollTo({ x: newIndex * screenWidth, animated: true });
    }
  };

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
    scrollViewRef.current?.scrollTo({ x: index * screenWidth, animated: true });
  };

  const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const slideIndex = Math.round(event.nativeEvent.contentOffset.x / screenWidth);
    if (slideIndex !== currentSlide && slideIndex >= 0 && slideIndex < onboardingSlides.length) {
      setCurrentSlide(slideIndex);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header with Back Button */}
      <View style={styles.header}>
        <Pressable
          onPress={prevSlide}
          style={[styles.backButton, currentSlide === 0 && styles.backButtonHidden]}
        >
          <Text style={styles.backIcon}>‹</Text>
        </Pressable>
      </View>

      {/* Horizontal Scrollable Content */}
      <ScrollView
        ref={scrollViewRef}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={handleScroll}
        scrollEventThrottle={16}
        style={styles.scrollView}
      >
        {onboardingSlides.map((slide, index) => (
          <View key={slide.id} style={styles.slideContainer}>
            {/* Icon */}
            <View style={styles.iconContainer}>
              <View style={styles.speechBubble}>
                <Image source={slide.icon} style={styles.slideIcon} resizeMode="contain" />
                {/* Speech bubble tail */}
                <View style={styles.speechBubbleTail} />
              </View>
            </View>

            {/* Title */}
            <Text style={styles.title}>{slide.title}</Text>

            {/* Description */}
            <Text style={styles.description}>{slide.description}</Text>
          </View>
        ))}
      </ScrollView>

      {/* Progress Dots */}
      <View style={styles.pagination}>
        {onboardingSlides.map((_, index) => (
          <Pressable
            key={index}
            onPress={() => goToSlide(index)}
            style={[
              styles.dot,
              {
                backgroundColor: index === currentSlide ? '#642975' : '#E0E0E0',
                width: index === currentSlide ? 24 : 8,
              },
            ]}
          />
        ))}
      </View>

      {/* Continue Button / Get Started Button */}
      <View style={[styles.footer, { paddingBottom: insets.bottom + 20 }]}>
        {currentSlide === onboardingSlides.length - 1 ? (
          <Pressable style={styles.getStartedButton} onPress={nextSlide}>
            <Text style={styles.getStartedText}>Get Started</Text>
          </Pressable>
        ) : (
          <Pressable style={styles.continueButton} onPress={nextSlide}>
            <View style={styles.continueButtonContent} />
          </Pressable>
        )}
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
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 10,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    paddingHorizontal: 20,
    paddingTop: 50,
    height: 90,
    backgroundColor: 'transparent',
  },
  backButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  backButtonHidden: {
    opacity: 0,
  },
  backIcon: {
    fontSize: 28,
    color: '#1B1D22',
    fontWeight: '300',
  },
  scrollView: {
    flex: 1,
  },
  slideContainer: {
    width: screenWidth,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 40,
    paddingTop: 60,
  },
  iconContainer: {
    alignItems: 'center',
    marginBottom: 60,
  },
  speechBubble: {
    backgroundColor: '#FFFFFF',
    borderRadius: 24,
    borderWidth: 2,
    borderColor: '#642975',
    padding: 30,
    position: 'relative',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  slideIcon: {
    width: 80,
    height: 80,
  },
  speechBubbleTail: {
    position: 'absolute',
    bottom: -8,
    right: 30,
    width: 16,
    height: 16,
    backgroundColor: '#FFFFFF',
    borderRightWidth: 2,
    borderBottomWidth: 2,
    borderColor: '#642975',
    transform: [{ rotate: '45deg' }],
  },
  title: {
    fontSize: 32,
    fontWeight: '700',
    color: '#1B1D22',
    textAlign: 'center',
    marginBottom: 24,
    lineHeight: 38,
  },
  description: {
    fontSize: 16,
    color: '#666666',
    textAlign: 'center',
    lineHeight: 24,
    maxWidth: 300,
  },
  pagination: {
    position: 'absolute',
    bottom: 100,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 8,
    paddingVertical: 20,
  },
  dot: {
    height: 8,
    borderRadius: 4,
  },
  footer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingBottom: 40,
  },
  continueButton: {
    width: 60,
    height: 4,
    backgroundColor: '#1B1D22',
    borderRadius: 2,
  },
  continueButtonContent: {
    width: '100%',
    height: '100%',
    backgroundColor: '#1B1D22',
    borderRadius: 2,
  },
  getStartedButton: {
    backgroundColor: '#1B1D22',
    borderRadius: 25,
    paddingVertical: 16,
    paddingHorizontal: 60,
    alignItems: 'center',
  },
  getStartedText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
});
