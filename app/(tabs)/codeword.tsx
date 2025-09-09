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
  Alert,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Icon from '../../src/components/Icon';
import { chatApi, ChatMessage } from '../../src/api/chat';
import {
  scheduleCriticalNotification,
  scheduleNotification,
} from '../../src/services/notificationService';

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
  const [sessionId, setSessionId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const flatListRef = useRef<FlatList>(null);

  // Initialize chat session on component mount with fallback URLs
  useEffect(() => {
    const initializeSession = async () => {
      // Try multiple URLs as fallback
      const urls = [
        'http://192.168.0.94:9989/v1',
        'http://localhost:9989/v1',
        'http://127.0.0.1:9989/v1',
      ];

      console.log('🔄 Attempting to connect to backend...');

      for (const url of urls) {
        try {
          console.log(`🔌 Trying URL: ${url}`);

          // Create session directly with fetch to test connection
          const response = await fetch(`${url}/session`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ device_id: `device-${Date.now()}` }),
            timeout: 5000,
          });

          if (response.ok) {
            const data = await response.json();
            setSessionId(data.session_id);
            console.log('✅ Chat session created successfully:', data.session_id);
            console.log('🎯 Connected to:', url);
            return; // Success!
          }
        } catch (error) {
          console.log(`❌ Failed to connect to ${url}:`, error.message);
        }
      }

      // All URLs failed
      console.error('🚨 All connection attempts failed');
      Alert.alert(
        'Connection Error',
        'Failed to connect to chat service. Please ensure the backend is running on http://192.168.0.94:9989',
      );
    };

    initializeSession();
  }, []);

  const sendMessage = async () => {
    if (text.trim().length === 0 || !sessionId || isLoading) return;

    const userMessage = {
      id: Date.now().toString(),
      role: 'user' as const,
      text: text.trim(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setText('');
    setIsLoading(true);

    // Auto-scroll to bottom
    setTimeout(() => {
      flatListRef.current?.scrollToEnd({ animated: true });
    }, 100);

    try {
      // Use real backend API
      const response = await chatApi.sendMessage(sessionId, userMessage.text);

      const aiResponse = {
        id: response.id || Date.now().toString(),
        role: 'ai' as const,
        text: response.content,
      };

      setMessages((prev) => [...prev, aiResponse]);

      // Handle crisis detection
      if (response.metadata?.crisis_level && response.metadata.crisis_level >= 13) {
        console.log(`Crisis detected! Level: ${response.metadata.crisis_level}`);
        try {
          await scheduleCriticalNotification(
            'Codeword Crisis Alert',
            'High crisis level detected. Support resources are available.',
            { crisis_level: response.metadata.crisis_level },
          );
        } catch (error) {
          console.error('Failed to send critical alert:', error);
        }
      } else if (response.metadata?.crisis_level && response.metadata.crisis_level >= 8) {
        console.log(`Elevated concern detected! Level: ${response.metadata.crisis_level}`);
        try {
          await scheduleNotification(
            'Codeword Check-in',
            'We noticed you might need extra support. How are you feeling?',
            { crisis_level: response.metadata.crisis_level },
          );
        } catch (error) {
          console.error('Failed to send notification:', error);
        }
      }

      setTimeout(() => {
        flatListRef.current?.scrollToEnd({ animated: true });
      }, 100);
    } catch (error) {
      console.error('Failed to send message:', error);

      // Show error message in chat
      const errorResponse = {
        id: Date.now().toString(),
        role: 'ai' as const,
        text: "I apologize, but I'm having trouble connecting right now. Please check your internet connection and try again.",
      };

      setMessages((prev) => [...prev, errorResponse]);

      setTimeout(() => {
        flatListRef.current?.scrollToEnd({ animated: true });
      }, 100);
    } finally {
      setIsLoading(false);
    }
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
    <KeyboardAvoidingView
      style={styles.flex}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 20}
    >
      <ImageBackground
        source={require('../../assets/icons/Gradient BG.png')}
        style={styles.container}
        resizeMode="cover"
      >
        <View style={styles.flex}>
          {/* Messages */}
          <FlatList
            ref={flatListRef}
            contentContainerStyle={[styles.listContent, { paddingBottom: 20 }]}
            data={messages}
            keyExtractor={(m) => m.id}
            renderItem={({ item }) => (
              <View
                style={[styles.bubble, item.role === 'user' ? styles.userBubble : styles.aiBubble]}
              >
                <Text
                  style={[
                    styles.bubbleText,
                    { color: item.role === 'user' ? '#FFFFFF' : '#1B1D22' },
                  ]}
                >
                  {item.text}
                </Text>
              </View>
            )}
            showsVerticalScrollIndicator={false}
            onContentSizeChange={() => {
              flatListRef.current?.scrollToEnd({ animated: true });
            }}
            style={styles.messagesContainer}
          />

          {/* Input Bar - Fixed at bottom */}
          <View style={[styles.inputContainer, { paddingBottom: insets.bottom + 80 }]}>
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
            <Pressable
              style={[styles.sendBtn, { opacity: isLoading ? 0.6 : 1 }]}
              onPress={sendMessage}
              disabled={isLoading || !sessionId}
            >
              <Text style={styles.arrowIcon}>{isLoading ? '...' : '→'}</Text>
            </Pressable>
          </View>
        </View>
      </ImageBackground>
    </KeyboardAvoidingView>
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

  // Messages
  messagesContainer: {
    flex: 1,
  },

  // Input
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    paddingHorizontal: 20,
    paddingTop: 12,
    backgroundColor: 'transparent',
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
