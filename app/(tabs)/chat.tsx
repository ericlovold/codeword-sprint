import React, { useMemo, useRef, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  TextInput,
  Pressable,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Ionicons from '@expo/vector-icons/Ionicons';
type Msg = { id: string; role: 'assistant' | 'user'; text: string };
const seed: Msg[] = [
  { id: '1', role: 'assistant', text: "Hi Eric, I'm your Codeword AI coach…" },
  { id: '2', role: 'user', text: "I'm feeling overwhelmed and need someone to talk to." },
  {
    id: '3',
    role: 'assistant',
    text: "I'm really sorry you're feeling overwhelmed. Would you feel comfortable telling me a bit more about what's been going on?",
  },
];

export default function Chat() {
  const [messages, setMessages] = useState<Msg[]>(seed);
  const [draft, setDraft] = useState('');
  const listRef = useRef<FlatList<Msg>>(null);
  const data = useMemo(() => messages.slice().reverse(), [messages]);

  function send() {
    const text = draft.trim();
    if (!text) return;
    setMessages((prev) => [...prev, { id: String(Date.now()), role: 'user', text }]);
    setDraft('');
    setTimeout(() => listRef.current?.scrollToOffset({ offset: 0, animated: true }), 0);
  }

  return (
    <View style={{ flex: 1 }}>
      <LinearGradient colors={['#F3EEFF', '#CDEDF0']} style={StyleSheet.absoluteFill} />
      <View style={{ paddingTop: 12, paddingHorizontal: 20, paddingBottom: 4 }}>
        <Text style={{ fontSize: 22, fontWeight: '800', color: '#2B2B2B' }}>Chat</Text>
      </View>

      <FlatList
        ref={listRef}
        data={data}
        keyExtractor={(m) => m.id}
        inverted
        contentContainerStyle={{ padding: 16, paddingBottom: 100 }}
        renderItem={({ item }) => <Bubble role={item.role} text={item.text} />}
      />

      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
        <View style={styles.inputRow}>
          <TextInput
            value={draft}
            onChangeText={setDraft}
            placeholder="Type a message…"
            placeholderTextColor="#9AA3AF"
            style={styles.input}
          />
          <Pressable onPress={send} hitSlop={8} style={styles.send}>
            <Ionicons name="arrow-up" size={20} color="#fff" />
          </Pressable>
        </View>
      </KeyboardAvoidingView>

      {/* Floating semicolon center action */}
    </View>
  );
}

function Bubble({ role, text }: { role: 'assistant' | 'user'; text: string }) {
  const isUser = role === 'user';
  return (
    <View style={[styles.bubble, isUser ? styles.right : styles.left]}>
      <Text style={isUser ? styles.rightText : styles.leftText}>{text}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  bubble: {
    maxWidth: '86%',
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderRadius: 16,
    marginVertical: 8,
    flexShrink: 1,
  },
  left: {
    alignSelf: 'flex-start',
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E7E7E7',
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 2 },
  },
  right: {
    alignSelf: 'flex-end',
    backgroundColor: '#6D3ACF',
  },
  leftText: { color: '#2A2652', fontSize: 18, lineHeight: 26 },
  rightText: { color: '#FFFFFF', fontSize: 18, lineHeight: 26 },
  inputRow: {
    padding: 12,
    paddingBottom: 18,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    backgroundColor: 'rgba(255,255,255,0.85)',
  },
  input: {
    flex: 1,
    height: 46,
    backgroundColor: '#F3F3F6',
    borderRadius: 12,
    paddingHorizontal: 14,
    fontSize: 16,
    color: '#111',
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: '#E5E7EB',
  },
  send: {
    width: 46,
    height: 46,
    borderRadius: 23,
    backgroundColor: '#6D3ACF',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
