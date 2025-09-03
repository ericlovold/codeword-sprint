import React from 'react';
import { ScrollView, View, Text } from 'react-native';
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
import ScreenShell from '../../src/components/ScreenShell';
import MessageBubble from '../../src/components/MessageBubble';
import InputBar from '../../src/components/InputBar';
import { useChatAgent } from '../../src/agent/useChatAgent';
import { colors } from '../../src/theme/tokens';

export default function Chat() {
  const { messages, status, partialReply, sendMessage } = useChatAgent();
  const tabH = useBottomTabBarHeight();

  return (
    <ScreenShell>
      <ScrollView
        contentContainerStyle={{ paddingBottom: tabH + 12 }}
        showsVerticalScrollIndicator={false}
      >
        <View style={{ height: 8 }} />
        {messages.map((m, i) => (
          <MessageBubble key={i} role={m.role}>
            {m.text}
          </MessageBubble>
        ))}
        {partialReply && <MessageBubble role="ai">{partialReply}</MessageBubble>}
        {status === 'typing' && !partialReply && (
          <View style={{ padding: 16 }}>
            <Text style={{ color: colors.gray }}>AI is typing...</Text>
          </View>
        )}
      </ScrollView>
      <InputBar onSend={sendMessage} />
    </ScreenShell>
  );
}
