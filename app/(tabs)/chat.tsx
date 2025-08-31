import React, { useRef, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  KeyboardAvoidingView,
  Platform,
  ImageBackground,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
import { chatClient } from '../../src/lib/chatClient';

type Msg = { id: string; role: 'user' | 'assistant'; text: string };

const INITIAL: Msg[] = [
  {
    id: 'm1',
    role: 'assistant',
    text: "Hi Eric, I'm your Codeword AI coach, here to support you emotionally, detect crises, and help you navigate challenging responses from your ally.",
  },
  { id: 'm2', role: 'user', text: "I'm feeling overwhelmed and need someone to talk to." },
  {
    id: 'm3',
    role: 'assistant',
    text: "I'm really sorry you're feeling overwhelmed. You don't have to carry all of this alone. Would you feel comfortable telling me a bit more about what's been going on or what's weighing on you most right now?",
  },
];

export default function Chat() {
  const [msgs, setMsgs] = useState<Msg[]>(INITIAL);
  const [text, setText] = useState('');
  const listRef = useRef<FlatList<Msg>>(null);

  const insets = useSafeAreaInsets();
  const tabH = useBottomTabBarHeight();

  const send = async () => {
    const t = text.trim();
    if (!t) return;
    setText('');
    const uid = Math.random().toString(36).slice(2);
    setMsgs((p) => [...p, { id: uid, role: 'user', text: t }]);
    const tid = `t-${uid}`;
    setMsgs((p) => [...p, { id: tid, role: 'assistant', text: '…' }]);
    requestAnimationFrame(() => listRef.current?.scrollToEnd({ animated: true }));

    const reply = await chatClient.send(t);
    setMsgs((p) =>
      p.filter((m) => m.id !== tid).concat({ id: `a-${uid}`, role: 'assistant', text: reply }),
    );
    requestAnimationFrame(() => listRef.current?.scrollToEnd({ animated: true }));
  };

  const renderItem = ({ item }: { item: Msg }) => {
    const isMe = item.role === 'user';
    return (
      <View style={{ paddingHorizontal: 16, paddingVertical: 8 }}>
        <View
          style={{
            alignSelf: isMe ? 'flex-end' : 'flex-start',
            backgroundColor: isMe ? '#6A35B7' : 'white',
            paddingHorizontal: 16,
            paddingVertical: 12,
            borderRadius: 18,
            maxWidth: '88%',
            shadowColor: '#000',
            shadowOpacity: 0.08,
            shadowRadius: 6,
            shadowOffset: { width: 0, height: 2 },
          }}
        >
          <Text style={{ color: isMe ? 'white' : '#322B4C', fontSize: 17, lineHeight: 24 }}>
            {item.text}
          </Text>
        </View>
      </View>
    );
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1, backgroundColor: '#F3EFFA' }}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      keyboardVerticalOffset={insets.top} // keep header locked
    >
      {/* Subtle top->bottom gradient using a static PNG if you want, otherwise simple color blend */}
      <ImageBackground source={undefined} style={{ flex: 1 }} imageStyle={{ resizeMode: 'cover' }}>
        <FlatList
          ref={listRef}
          data={msgs}
          keyExtractor={(m) => m.id}
          renderItem={renderItem}
          contentContainerStyle={{ paddingTop: 16, paddingBottom: tabH + 80 }}
          onContentSizeChange={() => listRef.current?.scrollToEnd({ animated: false })}
        />

        {/* Input pinned above tab bar */}
        <View
          style={{
            position: 'absolute',
            left: 12,
            right: 12,
            bottom: Math.max(12, tabH - insets.bottom + 8),
            backgroundColor: 'white',
            borderRadius: 24,
            flexDirection: 'row',
            alignItems: 'center',
            paddingHorizontal: 14,
            paddingVertical: Platform.OS === 'ios' ? 12 : 8,
            shadowColor: '#000',
            shadowOpacity: 0.08,
            shadowRadius: 8,
            shadowOffset: { width: 0, height: 2 },
          }}
        >
          <TextInput
            value={text}
            onChangeText={setText}
            placeholder="Type a message…"
            returnKeyType="send"
            onSubmitEditing={send}
            style={{ flex: 1, fontSize: 16, paddingVertical: 6 }}
          />
          <TouchableOpacity onPress={send} accessibilityLabel="Send message">
            <Ionicons name="arrow-up-circle" size={32} color="#6A35B7" />
          </TouchableOpacity>
        </View>
      </ImageBackground>
    </KeyboardAvoidingView>
  );
}
