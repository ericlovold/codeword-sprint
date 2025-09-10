import React, { useState } from 'react';
import { View, Text, StyleSheet, Pressable, SafeAreaView, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import * as Contacts from 'expo-contacts';

export default function ConnectAlliesScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const [contactsGranted, setContactsGranted] = useState(false);

  const handleBack = () => {
    router.back();
  };

  const handleAllowAccess = async () => {
    const { status } = await Contacts.requestPermissionsAsync();

    if (status === 'granted') {
      setContactsGranted(true);
      // Navigate to the select allies screen
      router.push('/select-allies');
    } else {
      Alert.alert(
        'Contacts Permission Required',
        'We need access to your contacts to help you add allies. You can enable this in your device settings.',
        [
          { text: 'Cancel', style: 'cancel' },
          {
            text: 'Open Settings',
            onPress: () => {
              // In production, you would open settings here
              // Linking.openSettings();
            },
          },
        ],
      );
    }
  };

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
        {/* Icon */}
        <View style={styles.iconContainer}>
          <View style={styles.iconCircles}>
            <View style={[styles.circle, styles.circleLeft]} />
            <View style={[styles.circle, styles.circleCenter]} />
            <View style={[styles.circle, styles.circleRight]} />
          </View>
          <View style={styles.iconPeople}>
            <View style={[styles.person, styles.personLeft]} />
            <View style={[styles.person, styles.personCenter]} />
            <View style={[styles.person, styles.personRight]} />
          </View>
        </View>

        {/* Title */}
        <Text style={styles.title}>Connect your allies</Text>

        {/* Description */}
        <Text style={styles.description}>
          Choose who you want to add to your list of allies. We need access to your contacts to
          continue.
        </Text>
      </View>

      {/* Allow Access Button */}
      <View style={[styles.footer, { paddingBottom: insets.bottom + 40 }]}>
        <Pressable style={styles.allowButton} onPress={handleAllowAccess}>
          <Text style={styles.allowButtonText}>Allow Access</Text>
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
  iconContainer: {
    width: 120,
    height: 120,
    marginBottom: 60,
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconCircles: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: -10,
  },
  circle: {
    width: 32,
    height: 32,
    borderRadius: 16,
    borderWidth: 2,
    borderColor: '#642975',
    backgroundColor: 'transparent',
  },
  circleLeft: {
    marginRight: -8,
  },
  circleCenter: {
    zIndex: 2,
  },
  circleRight: {
    marginLeft: -8,
  },
  iconPeople: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
  person: {
    width: 36,
    height: 50,
    borderRadius: 18,
    borderTopLeftRadius: 18,
    borderTopRightRadius: 18,
    borderBottomLeftRadius: 4,
    borderBottomRightRadius: 4,
    borderWidth: 2,
    borderColor: '#642975',
    backgroundColor: 'transparent',
  },
  personLeft: {
    marginRight: -10,
    height: 45,
  },
  personCenter: {
    zIndex: 2,
    backgroundColor: '#F5F3F5',
  },
  personRight: {
    marginLeft: -10,
    height: 45,
  },
  title: {
    fontSize: 32,
    fontWeight: '700',
    color: '#1B1D22',
    textAlign: 'center',
    marginBottom: 24,
  },
  description: {
    fontSize: 16,
    color: '#666666',
    textAlign: 'center',
    lineHeight: 24,
    maxWidth: 300,
  },
  footer: {
    paddingHorizontal: 20,
  },
  allowButton: {
    backgroundColor: '#1B1D22',
    borderRadius: 25,
    paddingVertical: 16,
    alignItems: 'center',
  },
  allowButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
  },
});
