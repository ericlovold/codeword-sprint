import React from 'react';
import { View, Text, Pressable, Alert } from 'react-native';
import { useRouter } from 'expo-router';

// Export options for the screen header
export const options = {
  title: 'Get Help',
  // Can override with custom header if needed:
  // header: (props) => <BrandHeader title="Get Help" showBack />,
};

function PrimaryButton({ title, onPress }: { title: string; onPress: () => void }) {
  return (
    <Pressable
      onPress={onPress}
      style={{
        backgroundColor: '#5A2AA7',
        paddingVertical: 16,
        borderRadius: 20,
        alignItems: 'center',
        marginBottom: 12,
      }}
    >
      <Text style={{ color: 'white', fontWeight: '700', fontSize: 16 }}>{title}</Text>
    </Pressable>
  );
}

function OutlineButton({ title, onPress }: { title: string; onPress: () => void }) {
  return (
    <Pressable
      onPress={onPress}
      style={{
        borderColor: '#5A2AA7',
        borderWidth: 2,
        paddingVertical: 14,
        borderRadius: 20,
        alignItems: 'center',
        marginBottom: 12,
        backgroundColor: 'rgba(255,255,255,0.7)',
      }}
    >
      <Text style={{ color: '#5A2AA7', fontWeight: '700', fontSize: 16 }}>{title}</Text>
    </Pressable>
  );
}

export default function HelpScreen() {
  const router = useRouter();
  const demo = (msg: string) => Alert.alert('Demo', msg);

  return (
    <View style={{ flex: 1, padding: 16, paddingTop: 120, backgroundColor: '#EAF3F3' }}>
      <Text style={{ color: '#3A2F57', marginBottom: 16 }}>
        Choose an option. (Demo actions for now—no accidental calls.)
      </Text>

      <PrimaryButton title="Send Codeword Alert" onPress={() => demo('Send alert')} />
      <OutlineButton title="Call 988 (Mental Health)" onPress={() => demo('Dial 988')} />
      <OutlineButton title="Call 911 (Emergency)" onPress={() => demo('Dial 911')} />
      <OutlineButton title="Message Ally" onPress={() => demo('Open Ally DM')} />
      <OutlineButton title="Back to Chat" onPress={() => router.back()} />
    </View>
  );
}
