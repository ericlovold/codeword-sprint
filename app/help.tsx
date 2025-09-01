// app/help.tsx
import React, { useMemo } from 'react';
import { View, Text, ScrollView, Pressable, Alert, Linking } from 'react-native';
import { useRouter } from 'expo-router';

const BRAND = '#6B2FA1';
const DEMO = true; // set to false when you want real actions

function Button({
  label,
  onPress,
  variant = 'primary', // "primary" | "outline"
}: {
  label: string;
  onPress: () => void;
  variant?: 'primary' | 'outline';
}) {
  const styles = useMemo(() => {
    const base = {
      paddingHorizontal: 20,
      paddingVertical: 16,
      borderRadius: 24,
      marginVertical: 8,
    };
    if (variant === 'primary') {
      return { ...base, backgroundColor: BRAND };
    }
    return {
      ...base,
      borderWidth: 2,
      borderColor: BRAND,
      backgroundColor: 'rgba(255,255,255,0.8)',
    };
  }, [variant]);

  const textStyle =
    variant === 'primary'
      ? { color: '#fff', fontSize: 17, fontWeight: '600', textAlign: 'center' as const }
      : { color: BRAND, fontSize: 17, fontWeight: '600', textAlign: 'center' as const };

  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [styles, { opacity: pressed ? 0.9 : 1 }]}
      accessibilityRole="button"
      accessibilityLabel={label}
    >
      <Text style={textStyle}>{label}</Text>
    </Pressable>
  );
}

export default function HelpScreen() {
  const router = useRouter();

  const confirm = (title: string, onOk: () => void) => {
    Alert.alert(title, DEMO ? 'Demo only — no real call/message will happen.' : '', [
      { text: 'Cancel', style: 'cancel' },
      { text: DEMO ? 'OK (demo)' : 'OK', onPress: onOk },
    ]);
  };

  const call = (num: string) => {
    if (DEMO) return; // demo: do nothing
    Linking.openURL(`tel:${num}`);
  };

  const sendCodeword = () => {
    confirm('Send Codeword alert?', () => {
      // TODO: wire to backend ally notification
    });
  };

  const call988 = () => confirm('Call 988 (Mental Health)?', () => call('988'));
  const call911 = () => confirm('Call 911 (Emergency)?', () => call('911'));
  const messageAlly = () => {
    confirm('Message Ally?', () => {
      // TODO: backend / SMS integration
    });
  };

  return (
    <View style={{ flex: 1 }}>
      {/* Simple soft gradient fallback */}
      <View
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: '#f5ecff',
        }}
      />
      <View
        style={{
          position: 'absolute',
          left: 0,
          right: 0,
          bottom: 0,
          top: '33%',
          backgroundColor: '#d9f1ee',
        }}
      />

      <ScrollView
        style={{ flex: 1, paddingHorizontal: 16, paddingTop: 16 }}
        contentContainerStyle={{ paddingBottom: 24 }}
        keyboardShouldPersistTaps="handled"
      >
        <Text style={{ fontSize: 24, fontWeight: '600', color: '#1e1b4b', marginBottom: 4 }}>
          Get Help
        </Text>
        <Text style={{ fontSize: 16, color: '#4b4b6b', marginBottom: 16 }}>
          Choose an option. (Demo actions for now — safe, no accidental calls.)
        </Text>

        <Button label="Send Codeword Alert" onPress={sendCodeword} variant="primary" />
        <Button label="Call 988 (Mental Health)" onPress={call988} variant="outline" />
        <Button label="Call 911 (Emergency)" onPress={call911} variant="outline" />
        <Button label="Message Ally" onPress={messageAlly} variant="outline" />
        <Button
          label="Back to Chat"
          onPress={() => (router.canGoBack() ? router.back() : router.replace('/(tabs)/chat'))}
          variant="outline"
        />
      </ScrollView>
    </View>
  );
}
