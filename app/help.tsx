import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { View, Text, Pressable, Linking } from 'react-native';
import { useRouter } from 'expo-router';

function Action({ label, onPress, fill }: { label: string; onPress: () => void; fill?: boolean }) {
  return (
    <Pressable
      onPress={onPress}
      style={{
        paddingVertical: 16,
        paddingHorizontal: 18,
        borderRadius: 14,
        backgroundColor: fill ? '#6D4AE7' : 'white',
        borderWidth: fill ? 0 : 1,
        borderColor: '#E4E4EC',
      }}
    >
      <Text
        style={{
          fontSize: 17,
          fontWeight: '600',
          color: fill ? 'white' : '#1F1F28',
          textAlign: 'center',
        }}
      >
        {label}
      </Text>
    </Pressable>
  );
}

export default function HelpScreen() {
  const router = useRouter();
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
      <View style={{ padding: 20, gap: 14, flex: 1 }}>
        <Text style={{ fontSize: 28, fontWeight: '800', marginBottom: 6 }}>Get help</Text>
        <Action label="Call 911" onPress={() => Linking.openURL('tel:911')} fill />
        <Action label="Call 988 (Lifeline)" onPress={() => Linking.openURL('tel:988')} />
        <Action
          label="Call an ally"
          onPress={() => {
            /* TODO: ally picker */
          }}
        />
        <Action
          label="Send Codeword"
          onPress={() => {
            /* TODO: trigger codeword */
          }}
          fill
        />
        <Pressable
          onPress={() => router.back()}
          style={{ alignSelf: 'center', marginTop: 'auto', padding: 12 }}
        >
          <Text style={{ color: '#6D4AE7', fontWeight: '600' }}>Close</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}
