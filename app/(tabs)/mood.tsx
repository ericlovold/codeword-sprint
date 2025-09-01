import React, { useState } from 'react';
import { View, Text, Pressable, TextInput, Alert } from 'react-native';
import Screen from '../../src/components/Screen';
import { colors, radius, spacing } from '../../src/theme';

const moods = ['😞', '😕', '😐', '🙂', '😄'];

export default function Mood() {
  const [selected, setSelected] = useState<number | null>(null);
  const [note, setNote] = useState('');

  return (
    <Screen title="Mood">
      <View style={{ gap: spacing.lg }}>
        <Text style={{ color: colors.text }}>How are you feeling today?</Text>
        <View style={{ flexDirection: 'row', gap: 12 }}>
          {moods.map((m, i) => (
            <Pressable
              key={i}
              onPress={() => setSelected(i)}
              style={{
                width: 56,
                height: 56,
                borderRadius: radius.pill,
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: selected === i ? colors.lavender : colors.white,
                borderWidth: selected === i ? 2 : 1,
                borderColor: selected === i ? colors.purple : '#E5E7EB',
              }}
            >
              <Text style={{ fontSize: 24 }}>{m}</Text>
            </Pressable>
          ))}
        </View>

        <TextInput
          placeholder="Optional note…"
          value={note}
          onChangeText={setNote}
          multiline
          style={{
            backgroundColor: colors.white,
            borderRadius: radius.lg,
            padding: spacing.lg,
            minHeight: 100,
            borderWidth: 1,
            borderColor: '#E5E7EB',
          }}
        />

        <Pressable
          onPress={() => {
            Alert.alert(
              'Saved (demo)',
              `Mood: ${selected !== null ? moods[selected] : '—'}\nNote: ${note || '—'}`,
            );
            setNote('');
          }}
          style={{
            backgroundColor: colors.purple,
            paddingVertical: 14,
            borderRadius: radius.pill,
            alignItems: 'center',
          }}
        >
          <Text style={{ color: colors.white, fontWeight: '700' }}>Save</Text>
        </Pressable>
      </View>
    </Screen>
  );
}
