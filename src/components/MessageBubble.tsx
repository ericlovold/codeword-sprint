import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { tokens } from '../theme/tokens';

export default function MessageBubble({
  role,
  children,
}: {
  role: 'user' | 'ai';
  children: React.ReactNode;
}) {
  const isUser = role === 'user';
  return (
    <View style={[styles.wrap, isUser ? styles.right : styles.left]}>
      <View style={[styles.bubble, isUser ? styles.user : styles.ai]}>
        <Text style={[styles.text, isUser && { color: tokens.colors.brandOn }]}>{children}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: { marginVertical: 8, width: '100%' },
  left: { alignItems: 'flex-start' },
  right: { alignItems: 'flex-end' },
  bubble: {
    maxWidth: '86%',
    borderRadius: 18,
    paddingVertical: 12,
    paddingHorizontal: 16,
    ...{
      shadowColor: '#000',
      shadowOpacity: 0.08,
      shadowRadius: 10,
      shadowOffset: { width: 0, height: 3 },
      elevation: 3,
    },
  },
  ai: { backgroundColor: tokens.colors.bubbleAI },
  user: { backgroundColor: tokens.colors.bubbleUser },
  text: { fontSize: 16, color: tokens.colors.ink, lineHeight: 22 },
});
