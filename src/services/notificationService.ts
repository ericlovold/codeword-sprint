import * as Notifications from 'expo-notifications';
import { Audio } from 'expo-av';
import { Platform } from 'react-native';

// Configure notification handler
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: true,
  }),
});

// Audio configuration for critical-like behavior
export async function configureCriticalAudio() {
  // Skip audio configuration in development to avoid errors
  // This will be properly configured in production builds
  try {
    if (Platform.OS === 'ios' && __DEV__ === false) {
      // Only configure audio in production builds
      await Audio.setAudioModeAsync({
        playsInSilentModeIOS: true,
        allowsRecordingIOS: false,
        staysActiveInBackground: true,
        shouldDuckAndroid: true,
        playThroughEarpieceAndroid: false,
      });
    }
  } catch (error) {
    // Silently skip audio configuration
  }
}

// Play critical alert sound
export async function playCriticalSound() {
  try {
    const { sound } = await Audio.Sound.createAsync(
      require('../../assets/sounds/critical-alert.wav'),
      {
        shouldPlay: true,
        volume: 1.0,
      },
    );

    // Unload sound after playing
    sound.setOnPlaybackStatusUpdate((status) => {
      if (status.isLoaded && status.didJustFinish) {
        sound.unloadAsync();
      }
    });
  } catch (error) {
    console.error('Error playing critical sound:', error);
  }
}

// Request notification permissions
export async function requestNotificationPermissions() {
  const { status: existingStatus } = await Notifications.getPermissionsAsync();
  let finalStatus = existingStatus;

  if (existingStatus !== 'granted') {
    const { status } = await Notifications.requestPermissionsAsync({
      ios: {
        allowAlert: true,
        allowBadge: true,
        allowSound: true,
        allowAnnouncements: true,
        allowCriticalAlerts: true, // Apple approval granted
      },
    });
    finalStatus = status;
  }

  if (finalStatus !== 'granted') {
    console.log('Failed to get push token for push notification!');
    return false;
  }

  return true;
}

// Schedule a true Critical Alert notification (Apple approved)
export async function scheduleCriticalNotification(title: string, body: string, data?: any) {
  // Configure audio for critical behavior
  await configureCriticalAudio();

  // Schedule the Critical Alert notification
  const notificationId = await Notifications.scheduleNotificationAsync({
    content: {
      title,
      body,
      sound: {
        critical: true, // Enable critical alert sound
        name: 'critical-alert.wav', // Custom critical alert sound
        volume: 1.0,
      },
      priority: Notifications.AndroidNotificationPriority.HIGH,
      data: {
        ...data,
        isCritical: true,
      },
      // iOS specific Critical Alert properties
      launchImageName: undefined,
      badge: 1,
      interruptionLevel: 'critical', // iOS 15+ Critical Alert
    },
    trigger: null, // Trigger immediately
  });

  return notificationId;
}

// Schedule a regular notification
export async function scheduleNotification(title: string, body: string, data?: any) {
  const notificationId = await Notifications.scheduleNotificationAsync({
    content: {
      title,
      body,
      sound: true,
      priority: Notifications.AndroidNotificationPriority.DEFAULT,
      data,
    },
    trigger: null,
  });

  return notificationId;
}

// Initialize notification service
export async function initializeNotifications() {
  try {
    // Request permissions
    const hasPermission = await requestNotificationPermissions();

    if (hasPermission) {
      // Configure audio for critical-like behavior
      await configureCriticalAudio();

      // Only try to get push token if we have a project ID configured
      // This requires EAS build or proper Expo project setup
      try {
        const token = await Notifications.getExpoPushTokenAsync({
          projectId: 'your-project-id', // This will be configured during EAS build
        });
        console.log('Push token:', token.data);
        return token.data;
      } catch (tokenError) {
        console.log('Push token not available in development mode');
        // Continue without push token - local notifications will still work
      }
    }
  } catch (error) {
    console.log('Notification initialization skipped:', error);
    // Continue without notifications in development
  }

  return null;
}

// Handle incoming notifications
export function setupNotificationListeners() {
  // Handle notifications when app is in foreground
  const notificationListener = Notifications.addNotificationReceivedListener(
    async (notification) => {
      console.log('Notification received:', notification);

      // Check if it's a critical notification
      if (notification.request.content.data?.isCritical) {
        await playCriticalSound();
      }
    },
  );

  // Handle notification interactions (when user taps)
  const responseListener = Notifications.addNotificationResponseReceivedListener((response) => {
    console.log('Notification response:', response);
    // Handle navigation based on notification data
    const data = response.notification.request.content.data;
    if (data?.screen) {
      // Navigate to specific screen
      // router.push(data.screen);
    }
  });

  return () => {
    Notifications.removeNotificationSubscription(notificationListener);
    Notifications.removeNotificationSubscription(responseListener);
  };
}
