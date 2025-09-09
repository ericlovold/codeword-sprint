import React from 'react';
import { View, Text } from 'react-native';
const PURPLE = '#6B3FD1';

export const CHAT_HEADER_HEIGHT = 96;

export default function ChatHeader() {
  return (
    <View
      style={{
        height: CHAT_HEADER_HEIGHT,
        backgroundColor: PURPLE,
        paddingTop: 12,
        alignItems: 'center',
        justifyContent: 'flex-end',
        borderBottomLeftRadius: 24,
        borderBottomRightRadius: 24,
      }}
    >
      <Text style={{ color: 'white', fontSize: 22, fontWeight: '800', marginBottom: 10 }}>
        Codeword
      </Text>
    </View>
  );
}
