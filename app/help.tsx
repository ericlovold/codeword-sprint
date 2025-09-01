import React from 'react';
import { View, Text, Pressable, Linking, Alert } from 'react-native';
import Screen from '../src/components/Screen';
import { colors, radius, spacing } from '../src/theme';
import { useRouter } from 'expo-router';

function ActionButton({
  label,
  onPress,
  tone = 'primary',
}: {
  label: string;
  onPress: () => void;
  tone?: 'primary' | 'ghost';
}) {
  const styles =
    tone === 'primary'
      ? { bg: colors.purple, fg: colors.white, borderColor: colors.purple }
      : { bg: 'transparent', fg: colors.purple, borderColor: colors.purple };

  return (
    <Pressable
      onPress={onPress}
      style={{
        paddingVertical: 14,
        paddingHorizontal: 16,
        borderRadius: radius.pill,
        backgroundColor: styles.bg as any,
        borderWidth: 2,
        borderColor: styles.borderColor,
        alignItems: 'center',
      }}
    >
      <Text style={{ color: styles.fg as any, fontWeight: '700', fontSize: 16 }}>{label}</Text>
    </Pressable>
  );
}

export default function Help() {
  const router = useRouter();

  return (
    <Screen title="Get Help" scroll={false}>
      <View style={{ gap: spacing.md }}>
        <Text style={{ color: colors.text, fontSize: 16 }}>
          Choose an option. (Demo actions for now — safe, no accidental calls.)
        </Text>

        <ActionButton
          label="Send Codeword Alert"
          onPress={() => Alert.alert('Demo', 'Codeword alert sent (stub).')}
        />
        <ActionButton
          label="Call 988 (Mental Health)"
          tone="ghost"
          onPress={() => Linking.openURL('tel:988')}
        />
        <ActionButton
          label="Call 911 (Emergency)"
          tone="ghost"
          onPress={() => Linking.openURL('tel:911')}
        />
        <ActionButton
          label="Message Ally"
          tone="ghost"
          onPress={() => Alert.alert('Demo', 'Open ally picker (stub).')}
        />
        <ActionButton label="Back to Chat" tone="ghost" onPress={() => router.back()} />
      </View>
    </Screen>
  );
}
