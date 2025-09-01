import React from 'react';
import { View, Text, ScrollView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { colors, radii } from '../src/design/tokens';
import ActionButton from '../src/components/ActionButton';
import { callNumber, smsNumber, DEMO_MODE } from '../src/utils/call';
import { useRouter } from 'expo-router';

export default function HelpModal() {
  const insets = useSafeAreaInsets();
  const router = useRouter();

  return (
    <LinearGradient
      colors={[colors.brand.purple, colors.brand.purple700]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={{ flex: 1 }}
    >
      <View
        style={{
          paddingTop: insets.top + 8,
          paddingHorizontal: 16,
          paddingBottom: 16,
        }}
      >
        <Text style={{ color: 'white', fontSize: 24, fontWeight: '900', textAlign: 'center' }}>
          Get Help
        </Text>
      </View>

      {/* Card body */}
      <View
        style={{
          flex: 1,
          backgroundColor: 'white',
          borderTopLeftRadius: radii.xl,
          borderTopRightRadius: radii.xl,
          padding: 16,
        }}
      >
        <ScrollView contentContainerStyle={{ paddingVertical: 8 }}>
          <Text style={{ color: colors.text.faint, marginBottom: 16 }}>
            Choose an option. {DEMO_MODE ? '(Demo safe—no accidental calls.)' : ''}
          </Text>

          <ActionButton
            label="Send Codeword Alert"
            onPress={() => {
              // TODO: wire to backend alert
              router.back();
            }}
            style={{ marginBottom: 12 }}
          />

          <ActionButton
            variant="outline"
            label="Call 988 (Mental Health)"
            onPress={() => callNumber('988')}
            style={{ marginBottom: 12 }}
          />

          <ActionButton
            variant="outline"
            label="Call 911 (Emergency)"
            onPress={() => callNumber('911')}
            style={{ marginBottom: 12 }}
          />

          <ActionButton
            variant="outline"
            label="Message Ally"
            onPress={() => smsNumber('5551234567', 'Hey—can you check in with me?')}
            style={{ marginBottom: 12 }}
          />

          <ActionButton variant="outline" label="Back to Chat" onPress={() => router.back()} />
        </ScrollView>
      </View>
    </LinearGradient>
  );
}
