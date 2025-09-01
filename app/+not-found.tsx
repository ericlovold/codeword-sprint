// app/+not-found.tsx
import { Link } from 'expo-router';
import { View, Text } from 'react-native';

export default function NotFound() {
  return (
    <View
      style={{ flex: 1, alignItems: 'center', justifyContent: 'center', paddingHorizontal: 24 }}
    >
      <Text style={{ fontSize: 24, fontWeight: '600', marginBottom: 8 }}>Page not found</Text>
      <Text style={{ fontSize: 16, marginBottom: 24, textAlign: 'center' }}>
        Something went sideways. Let's get you back to safety.
      </Text>
      <Link href="/(tabs)/chat" style={{ color: '#6B2FA1', fontSize: 18, fontWeight: '600' }}>
        Go to Chat
      </Link>
    </View>
  );
}
