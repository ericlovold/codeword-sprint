import React from 'react';
import { View, Text, StyleSheet, Pressable, SafeAreaView, Image } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import Svg, { Path } from 'react-native-svg';

export default function WelcomeScreen() {
  const router = useRouter();

  const handleGetStarted = () => {
    // Navigate to onboarding flow
    router.push('/onboarding');
  };

  const handleHaveAccount = () => {
    // Navigate to login
    router.push('/login');
  };

  const handleContinueWithApple = () => {
    // Apple Sign In
    console.log('Continue with Apple');
  };

  const handleContinueWithGoogle = () => {
    // Google Sign In
    console.log('Continue with Google');
  };

  return (
    <LinearGradient
      colors={['#F4F3F7', '#E8E5F0']}
      locations={[0, 1]}
      start={{ x: 0, y: 0 }}
      end={{ x: 0, y: 1 }}
      style={styles.container}
    >
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.content}>
          {/* Semicolon Logo */}
          <View style={styles.logoContainer}>
            <Image
              source={require('../assets/icons/brand/SemicolonIconPurple.png')}
              style={styles.semicolonLogo}
              resizeMode="contain"
            />
          </View>

          {/* Welcome Text */}
          <View style={styles.textContainer}>
            <Text style={styles.title}>Welcome to{'\n'}Codeword</Text>
            <Text style={styles.subtitle}>
              You're not alone. Codeword helps you reach out to trusted allies when you need support
              most. Let's get started.
            </Text>
          </View>

          {/* Action Buttons */}
          <View style={styles.buttonsContainer}>
            {/* Get Started - Primary */}
            <Pressable style={styles.primaryButton} onPress={handleGetStarted}>
              <Text style={styles.primaryButtonText}>Get Started</Text>
            </Pressable>

            {/* I have an account */}
            <Pressable style={styles.secondaryButton} onPress={handleHaveAccount}>
              <Text style={styles.secondaryButtonText}>I have an account</Text>
            </Pressable>

            {/* Continue with Apple */}
            <Pressable style={styles.appleButton} onPress={handleContinueWithApple}>
              <Svg width="20" height="24" viewBox="0 0 20 24" fill="none" style={styles.buttonIcon}>
                <Path
                  d="M15.769 12.343c.028-3.102 2.543-4.602 2.656-4.672-1.446-2.113-3.698-2.402-4.496-2.431-1.914-.195-3.732 1.126-4.703 1.126-.971 0-2.47-1.098-4.06-1.069C3.098 5.327.82 6.647.82 10.465c0 1.896.366 3.888 1.098 5.88 1.025 2.799 4.728 10.052 8.606 9.92 1.864-.067 2.563-1.202 4.814-1.202 2.251 0 2.887 1.202 4.852 1.165 4.006-.067 7.415-6.77 8.41-9.583-4.84-2.238-5.703-6.606-5.83-6.802z"
                  fill="#FFFFFF"
                />
                <Path
                  d="M13.065 3.588c.825-1 1.381-2.387 1.23-3.773-1.188.048-2.626.792-3.48 1.792-.763.885-1.432 2.301-1.252 3.658 1.325.103 2.677-.673 3.502-1.677z"
                  fill="#FFFFFF"
                />
              </Svg>
              <Text style={styles.appleButtonText}>Continue with Apple</Text>
            </Pressable>

            {/* Continue with Google */}
            <Pressable style={styles.googleButton} onPress={handleContinueWithGoogle}>
              <Svg width="20" height="20" viewBox="0 0 20 20" fill="none" style={styles.buttonIcon}>
                <Path
                  d="M19.99 10.187c0-.82-.069-1.417-.216-2.037H10.2v3.698h5.62c-.113.857-.719 2.146-2.065 3.008l-.019.124 3.005 2.323.208.02c1.909-1.759 3.011-4.35 3.011-7.136z"
                  fill="#4285F4"
                />
                <Path
                  d="M10.2 19.931c2.753 0 5.064-.886 6.753-2.414l-3.194-2.467c-.862.587-2.017.997-3.559.997-2.694 0-4.978-1.759-5.79-4.149l-.12.01-3.124 2.415-.041.114c1.677 3.331 5.122 5.494 9.075 5.494z"
                  fill="#34A853"
                />
                <Path
                  d="M4.41 11.898c-.214-.63-.336-1.304-.336-1.998s.122-1.368.336-1.998l-.007-.132L1.139 5.381l-.104.05C.369 6.69 0 8.294 0 9.9s.369 3.21 1.035 4.468l3.375-2.47z"
                  fill="#FBBC05"
                />
                <Path
                  d="M10.2 3.853c1.914 0 3.206.828 3.938 1.521l2.844-2.781C15.253.688 12.953 0 10.2 0 6.247 0 2.802 2.163 1.035 5.431l3.375 2.469C5.222 5.612 7.506 3.853 10.2 3.853z"
                  fill="#EB4335"
                />
              </Svg>
              <Text style={styles.googleButtonText}>Continue with Google</Text>
            </Pressable>

            {/* Home Indicator */}
            <View style={styles.homeIndicator} />
          </View>
        </View>
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
  content: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 60,
    paddingBottom: 40,
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 80,
  },
  semicolonLogo: {
    width: 60,
    height: 100,
  },
  textContainer: {
    alignItems: 'center',
    marginBottom: 60,
  },
  title: {
    fontSize: 36,
    fontWeight: '700',
    color: '#1B1D22',
    textAlign: 'center',
    marginBottom: 20,
    lineHeight: 42,
  },
  subtitle: {
    fontSize: 16,
    color: '#6B6E76',
    textAlign: 'center',
    lineHeight: 24,
    paddingHorizontal: 20,
  },
  buttonsContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    gap: 12,
  },
  primaryButton: {
    backgroundColor: '#642975',
    borderRadius: 24,
    paddingVertical: 18,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  primaryButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  secondaryButton: {
    backgroundColor: 'transparent',
    borderWidth: 2,
    borderColor: '#1B1D22',
    borderRadius: 24,
    paddingVertical: 16,
    alignItems: 'center',
  },
  secondaryButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1B1D22',
  },
  appleButton: {
    backgroundColor: '#000000',
    borderRadius: 24,
    paddingVertical: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  appleButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
    marginLeft: 8,
  },
  googleButton: {
    backgroundColor: '#FFFFFF',
    borderRadius: 24,
    paddingVertical: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  googleButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1B1D22',
    marginLeft: 8,
  },
  buttonIcon: {
    marginRight: 8,
  },
  homeIndicator: {
    width: 134,
    height: 5,
    backgroundColor: '#000000',
    borderRadius: 2.5,
    alignSelf: 'center',
    marginTop: 20,
  },
});
