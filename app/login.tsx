import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  SafeAreaView,
  Alert,
  ActivityIndicator,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import * as AppleAuthentication from 'expo-apple-authentication';
import { storage } from '../src/utils/storage';
import { useAuth } from '../src/contexts/AuthContext';
import Svg, { Path } from 'react-native-svg';

export default function LoginScreen() {
  const router = useRouter();
  const { signIn, signInAsGuest } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [authMethod, setAuthMethod] = useState<string | null>(null);

  const handleAppleSignIn = async () => {
    try {
      setIsLoading(true);
      setAuthMethod('apple');

      const credential = await AppleAuthentication.signInAsync({
        requestedScopes: [
          AppleAuthentication.AppleAuthenticationScope.FULL_NAME,
          AppleAuthentication.AppleAuthenticationScope.EMAIL,
        ],
      });

      if (!credential.identityToken) {
        throw new Error('No identity token received from Apple');
      }

      // Use the auth context to handle sign-in
      await signIn({
        provider: 'apple',
        idToken: credential.identityToken,
        userInfo: {
          user: credential.user,
          email: credential.email,
          fullName: credential.fullName,
        },
      });

      // Mark onboarding as completed and navigate to main app
      await storage.setOnboardingCompleted();
      router.replace('/(tabs)');
    } catch (error: any) {
      console.error('Apple Sign-In failed:', error);

      if (error.code !== 'ERR_CANCELED') {
        const message =
          error.message || 'Unable to sign in with Apple. Please try again or use another method.';
        Alert.alert('Sign In Failed', message, [{ text: 'OK' }]);
      }
    } finally {
      setIsLoading(false);
      setAuthMethod(null);
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      setIsLoading(true);
      setAuthMethod('google');

      // TODO: Implement Google OAuth
      // For now, show placeholder
      Alert.alert(
        'Coming Soon',
        'Google Sign-In will be available in a future update. Please use Apple Sign-In for now.',
        [{ text: 'OK' }],
      );
    } catch (error) {
      console.error('Google Sign-In failed:', error);
      Alert.alert('Sign In Failed', 'Please try again.');
    } finally {
      setIsLoading(false);
      setAuthMethod(null);
    }
  };

  const handleEmailSignIn = async () => {
    // For now, navigate to onboarding as guest user
    Alert.alert(
      'Email Sign-In',
      'Email authentication will be available soon. Continue as guest?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Continue as Guest',
          onPress: async () => {
            try {
              setIsLoading(true);
              setAuthMethod('guest');

              // Sign in as guest using auth context
              await signInAsGuest();

              // Mark onboarding as completed
              await storage.setOnboardingCompleted();

              // Navigate to main app
              router.replace('/(tabs)');
            } catch (error) {
              console.error('Guest sign in failed:', error);
              Alert.alert('Error', 'Failed to continue as guest. Please try again.');
            } finally {
              setIsLoading(false);
              setAuthMethod(null);
            }
          },
        },
      ],
    );
  };

  const handleBackToWelcome = () => {
    router.back();
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
        {/* Back Button */}
        <View style={styles.header}>
          <Pressable onPress={handleBackToWelcome} style={styles.backButton}>
            <Text style={styles.backIcon}>‹</Text>
          </Pressable>
        </View>

        <View style={styles.content}>
          {/* Title */}
          <View style={styles.textContainer}>
            <Text style={styles.title}>Welcome Back</Text>
            <Text style={styles.subtitle}>
              Sign in to access your support network and continue your journey.
            </Text>
          </View>

          {/* Sign In Options */}
          <View style={styles.buttonsContainer}>
            {/* Apple Sign In */}
            <Pressable
              style={[styles.appleButton, authMethod === 'apple' && styles.buttonLoading]}
              onPress={handleAppleSignIn}
              disabled={isLoading}
            >
              {authMethod === 'apple' ? (
                <ActivityIndicator color="#FFFFFF" />
              ) : (
                <>
                  <Svg
                    width="20"
                    height="24"
                    viewBox="0 0 20 24"
                    fill="none"
                    style={styles.buttonIcon}
                  >
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
                </>
              )}
            </Pressable>

            {/* Google Sign In */}
            <Pressable
              style={[styles.googleButton, authMethod === 'google' && styles.buttonLoading]}
              onPress={handleGoogleSignIn}
              disabled={isLoading}
            >
              {authMethod === 'google' ? (
                <ActivityIndicator color="#1B1D22" />
              ) : (
                <>
                  <Svg
                    width="20"
                    height="20"
                    viewBox="0 0 20 20"
                    fill="none"
                    style={styles.buttonIcon}
                  >
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
                </>
              )}
            </Pressable>

            {/* Email Option */}
            <Pressable style={styles.emailButton} onPress={handleEmailSignIn} disabled={isLoading}>
              <Text style={styles.emailButtonText}>Sign in with Email</Text>
            </Pressable>

            {/* Terms */}
            <Text style={styles.termsText}>
              By signing in, you agree to our Terms of Service and Privacy Policy
            </Text>
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
  header: {
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
    fontSize: 28,
    color: '#1B1D22',
    fontWeight: '300',
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
    justifyContent: 'center',
  },
  textContainer: {
    alignItems: 'center',
    marginBottom: 60,
  },
  title: {
    fontSize: 32,
    fontWeight: '700',
    color: '#1B1D22',
    textAlign: 'center',
    marginBottom: 16,
  },
  subtitle: {
    fontSize: 16,
    color: '#6B6E76',
    textAlign: 'center',
    lineHeight: 22,
    paddingHorizontal: 20,
  },
  buttonsContainer: {
    gap: 16,
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
  emailButton: {
    backgroundColor: 'transparent',
    borderWidth: 2,
    borderColor: '#642975',
    borderRadius: 24,
    paddingVertical: 16,
    alignItems: 'center',
  },
  buttonLoading: {
    opacity: 0.7,
  },
  appleButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
    marginLeft: 8,
  },
  googleButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1B1D22',
    marginLeft: 8,
  },
  emailButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#642975',
  },
  buttonIcon: {
    marginRight: 8,
  },
  termsText: {
    fontSize: 12,
    color: '#999999',
    textAlign: 'center',
    lineHeight: 18,
    marginTop: 20,
    paddingHorizontal: 20,
  },
});
