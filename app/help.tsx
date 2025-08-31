import React from 'react';
import { View, Text } from 'react-native';

export default function HelpScreen() {
  return (
    <View style={{ flex: 1, padding: 24, gap: 12 }}>
      <Text style={{ fontSize: 28, fontWeight: '700' }}>Get Help</Text>
      <Text>Placeholder: 988, 911, Send Codeword, etc.</Text>
    </View>
  );
}
