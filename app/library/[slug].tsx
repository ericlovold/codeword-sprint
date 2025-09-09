import React from 'react';
import { View, Text, ScrollView } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import ScreenShell from '../../src/components/ScreenShell';
import { colors } from '../../src/theme/tokens';

export default function LibraryGuide() {
  const { slug } = useLocalSearchParams();

  return (
    <ScreenShell>
      <ScrollView>
        <View style={{ padding: 20 }}>
          <Text style={{ fontSize: 24, fontWeight: 'bold', color: colors.text, marginBottom: 16 }}>
            Guide: {slug}
          </Text>
          <Text style={{ fontSize: 16, color: colors.text, lineHeight: 24 }}>
            This is a detailed guide page for the selected topic.
          </Text>
        </View>
      </ScrollView>
    </ScreenShell>
  );
}
