import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Pressable,
  FlatList,
  KeyboardAvoidingView,
  Platform,
  ImageBackground,
  Image,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Icon from '../../src/components/Icon';

const initialMessages = [
  {
    id: '1',
    role: 'ai' as const,
    text: "Hi Eric, I'm your Codeword AI coach, here to support you emotionally, detect crises, and help you navigate challenging responses from your ally.",
  },
  {
    id: '2',
    role: 'user' as const,
    text: "I'm feeling overwhelmed and need someone to talk to.",
  },
  {
    id: '3',
    role: 'ai' as const,
    text: "I'm really sorry you're feeling overwhelmed. That can be such a heavy and exhausting place to be in. You don't have to carry all of this alone. I'm here with you, and I want to support you however I can. Would you feel comfortable telling me a bit more about what's been going on or what's weighing on you most right now?",
  },
];

export default function CodewordScreen() {
  const insets = useSafeAreaInsets();
  const [text, setText] = useState('');
  const [messages, setMessages] = useState(initialMessages);
  const flatListRef = useRef<FlatList>(null);

  const sendMessage = async () => {
    if (text.trim().length === 0) return;

    const userMessage = {
      id: Date.now().toString(),
      role: 'user' as const,
      text: text.trim(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setText('');

    // Auto-scroll to bottom
    setTimeout(() => {
      flatListRef.current?.scrollToEnd({ animated: true });
    }, 100);

    // TODO: Replace with actual API call
    // Simulate AI response for now
    setTimeout(() => {
      const aiResponse = {
        id: (Date.now() + 1).toString(),
        role: 'ai' as const,
        text: 'I hear you. Thank you for sharing that with me. How are you feeling right now?',
      };

      setMessages((prev) => [...prev, aiResponse]);

      setTimeout(() => {
        flatListRef.current?.scrollToEnd({ animated: true });
      }, 100);
    }, 1500);
  };

  useEffect(() => {
    // Scroll to bottom when messages change
    if (messages.length > initialMessages.length) {
      setTimeout(() => {
        flatListRef.current?.scrollToEnd({ animated: true });
      }, 100);
    }
  }, [messages]);

  return (
    <ImageBackground
      source={require('../../assets/icons/Gradient BG.png')}
      style={styles.container}
      resizeMode="cover"
    >
      <KeyboardAvoidingView
        style={styles.flex}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        {/* Messages */}
        <FlatList
          ref={flatListRef}
          contentContainerStyle={[styles.listContent, { paddingBottom: insets.bottom + 160 }]}
          data={messages}
          keyExtractor={(m) => m.id}
          renderItem={({ item }) => (
            <View
              style={[styles.bubble, item.role === 'user' ? styles.userBubble : styles.aiBubble]}
            >
              <Text
                style={[styles.bubbleText, { color: item.role === 'user' ? '#FFFFFF' : '#1B1D22' }]}
              >
                {item.text}
              </Text>
            </View>
          )}
          showsVerticalScrollIndicator={false}
          onContentSizeChange={() => {
            flatListRef.current?.scrollToEnd({ animated: true });
          }}
        />

        {/* Input Bar - Outside tab bar */}
        <View style={[styles.inputContainer, { bottom: insets.bottom + 80 }]}>
          <View style={styles.inputWrapper}>
            <TextInput
              value={text}
              onChangeText={setText}
              placeholder="Type a message..."
              placeholderTextColor="#999999"
              style={styles.input}
              multiline={false}
              onSubmitEditing={sendMessage}
              blurOnSubmit={true}
              returnKeyType="send"
              enablesReturnKeyAutomatically={true}
            />
          </View>
          <Pressable style={styles.sendBtn} onPress={sendMessage}>
            <Text style={styles.arrowIcon}>→</Text>
          </Pressable>
        </View>
      </KeyboardAvoidingView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  flex: {
    flex: 1,
  },
  listContent: {
    paddingHorizontal: 20,
    paddingTop: 20,
    gap: 16,
  },

  // Bubbles
  bubble: {
    maxWidth: '85%',
    borderRadius: 20,
    paddingVertical: 14,
    paddingHorizontal: 18,
  },
  aiBubble: {
    alignSelf: 'flex-start',
    backgroundColor: '#FFFFFF',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
  },
  userBubble: {
    alignSelf: 'flex-end',
    backgroundColor: '#642975',
  },
  bubbleText: {
    fontSize: 15,
    lineHeight: 22,
  },

  // Input
  inputContainer: {
    position: 'absolute',
    left: 20,
    right: 20,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  inputWrapper: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    paddingHorizontal: 16,
    height: 44,
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 3,
  },
  input: {
    fontSize: 15,
    color: '#1B1D22',
    height: '100%',
  },
  sendBtn: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#642975',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 10,
    elevation: 5,
  },
  arrowIcon: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
