import React from 'react';
import { View, Text } from 'react-native';

export function BotBubble({ children }: { children: React.ReactNode }) {
  return (
    <View
      style={{
        backgroundColor: 'white',
        borderRadius: 16,
        padding: 16,
        marginVertical: 8,
        marginRight: 48,
        shadowColor: '#000',
        shadowOpacity: 0.05,
        shadowRadius: 8,
        shadowOffset: { width: 0, height: 2 },
        borderWidth: 1,
        borderColor: 'rgba(0,0,0,0.06)',
      }}
    >
      <Text
        style={{ color: '#2B2B2B', fontSize: 16, lineHeight: 24, fontFamily: 'Inter_400Regular' }}
      >
        {children}
      </Text>
    </View>
  );
}

export function UserBubble({ children }: { children: React.ReactNode }) {
  return (
    <View
      style={{
        backgroundColor: '#5A3FA6',
        borderRadius: 16,
        padding: 16,
        marginVertical: 8,
        marginLeft: 48,
      }}
    >
      <Text style={{ color: 'white', fontSize: 16, lineHeight: 24, fontFamily: 'Inter_500Medium' }}>
        {children}
      </Text>
    </View>
  );
}
