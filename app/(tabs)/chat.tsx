import React, { useRef, useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  TouchableOpacity,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import ChatHeader, { CHAT_HEADER_HEIGHT } from '../../src/components/ChatHeader';

const PURPLE = '#6B3FD1';

export default function ChatTab() {
  const insets = useSafeAreaInsets();
  const tabBarHeight = useBottomTabBarHeight();
  const [messages, setMessages] = useState<string[]>([
    "Hi Eric, I'm your Codeword AI coach, here to support you emotionally, detect crises, and help you navigate challenging responses from your ally.",
    "I'm feeling overwhelmed and need someone to talk to.",
    "I'm really sorry you're feeling overwhelmed. You don't have to carry all of this alone. Would you feel comfortable telling me a bit more about what's been going on or what's weighing on you most right now?",
  ]);
  const [input, setInput] = useState('');
  const scrollRef = useRef<ScrollView>(null);

  const INPUT_H = 56;

  function send() {
    if (!input.trim()) return;
    setMessages((prev) => [
      ...prev,
      input.trim(),
      `(demo) I hear you: "${input.trim()}". Tell me more.`,
    ]);
    setInput('');
    requestAnimationFrame(() => scrollRef.current?.scrollToEnd({ animated: true }));
  }

  return (
    <KeyboardAvoidingView
      style={{ flex: 1, backgroundColor: '#F6F1FF' }}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      keyboardVerticalOffset={tabBarHeight} // keeps iOS keyboard from covering input
    >
      {/* Pinned header */}
      <ChatHeader />

      {/* Messages */}
      <ScrollView
        ref={scrollRef}
        bounces={false} // stop the peek-under
        contentContainerStyle={{
          paddingTop: CHAT_HEADER_HEIGHT + 12,
          paddingHorizontal: 16,
          paddingBottom: tabBarHeight + 80 + insets.bottom,
          gap: 12,
        }}
        showsVerticalScrollIndicator={false}
        onContentSizeChange={() => scrollRef.current?.scrollToEnd({ animated: true })}
      >
        {messages.map((m, i) => {
          const isUser = i % 2 === 1; // demo alternation
          return (
            <View
              key={i}
              style={{
                alignSelf: isUser ? 'flex-end' : 'flex-start',
                maxWidth: '86%',
                backgroundColor: isUser ? PURPLE : 'white',
                padding: 14,
                borderRadius: 16,
                shadowColor: '#000',
                shadowOpacity: 0.06,
                shadowRadius: 10,
              }}
            >
              <Text style={{ color: isUser ? 'white' : '#2b2b2b', fontSize: 18, lineHeight: 24 }}>
                {m}
              </Text>
            </View>
          );
        })}
      </ScrollView>

      {/* Input docked above tab bar */}
      <View
        style={{
          position: 'absolute',
          left: 12,
          right: 12,
          bottom: tabBarHeight + 12,
          height: INPUT_H,
          backgroundColor: 'white',
          borderRadius: 28,
          paddingHorizontal: 16,
          alignItems: 'center',
          flexDirection: 'row',
          shadowColor: '#000',
          shadowOpacity: 0.08,
          shadowRadius: 12,
        }}
      >
        <TextInput
          style={{ flex: 1, fontSize: 16 }}
          placeholder="Type a message..."
          value={input}
          onChangeText={setInput}
          onSubmitEditing={send}
          returnKeyType="send"
        />
        <TouchableOpacity
          onPress={send}
          accessibilityLabel="Send"
          style={{
            width: 36,
            height: 36,
            borderRadius: 18,
            backgroundColor: PURPLE,
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Ionicons name="arrow-up" size={18} color="white" />
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}
