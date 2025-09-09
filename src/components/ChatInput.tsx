import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  TextInput,
  Pressable,
  Text,
  KeyboardAvoidingView,
  Platform,
  Animated,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

interface ChatInputProps {
  onSendMessage: (message: string) => void;
  isLoading?: boolean;
  placeholder?: string;
  disabled?: boolean;
}

// Animated Typing Dots Component with Tailwind
const TypingIndicator: React.FC<{ visible: boolean }> = ({ visible }) => {
  const dot1 = useRef(new Animated.Value(0)).current;
  const dot2 = useRef(new Animated.Value(0)).current;
  const dot3 = useRef(new Animated.Value(0)).current;
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (visible) {
      // Fade in container
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 200,
        useNativeDriver: true,
      }).start();

      // Animate dots with staggered effect
      const animateDot = (dot: Animated.Value, delay: number) => {
        return Animated.loop(
          Animated.sequence([
            Animated.delay(delay),
            Animated.timing(dot, {
              toValue: 1,
              duration: 400,
              useNativeDriver: true,
            }),
            Animated.timing(dot, {
              toValue: 0,
              duration: 400,
              useNativeDriver: true,
            }),
          ]),
        );
      };

      Animated.parallel([
        animateDot(dot1, 0),
        animateDot(dot2, 150),
        animateDot(dot3, 300),
      ]).start();
    } else {
      // Fade out and reset
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 200,
        useNativeDriver: true,
      }).start(() => {
        dot1.setValue(0);
        dot2.setValue(0);
        dot3.setValue(0);
      });
    }
  }, [visible, dot1, dot2, dot3, fadeAnim]);

  if (!visible) return null;

  return (
    <Animated.View
      className="flex-row items-center px-5 py-2 mb-1"
      style={{
        opacity: fadeAnim,
        transform: [
          {
            translateY: fadeAnim.interpolate({
              inputRange: [0, 1],
              outputRange: [10, 0],
            }),
          },
        ],
      }}
    >
      <Text className="text-sm text-gray-500 italic mr-2">Codeword is typing</Text>
      <View className="flex-row items-center space-x-1">
        {[dot1, dot2, dot3].map((dot, index) => (
          <Animated.View
            key={index}
            className="w-1.5 h-1.5 rounded-full bg-red-800"
            style={{
              opacity: dot.interpolate({
                inputRange: [0, 1],
                outputRange: [0.3, 1],
              }),
              transform: [
                {
                  scale: dot.interpolate({
                    inputRange: [0, 1],
                    outputRange: [0.8, 1.2],
                  }),
                },
              ],
            }}
          />
        ))}
      </View>
    </Animated.View>
  );
};

// Main Chat Input Component with Tailwind
export const ChatInput: React.FC<ChatInputProps> = ({
  onSendMessage,
  isLoading = false,
  placeholder = 'Type a message...',
  disabled = false,
}) => {
  const [message, setMessage] = useState('');
  const insets = useSafeAreaInsets();
  const inputRef = useRef<TextInput>(null);

  const handleSend = () => {
    if (message.trim() && !disabled && !isLoading) {
      onSendMessage(message.trim());
      setMessage('');
    }
  };

  const isButtonDisabled = !message.trim() || disabled || isLoading;

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 20}
      className="absolute bottom-0 left-0 right-0 bg-transparent"
    >
      {/* Typing Indicator */}
      <TypingIndicator visible={isLoading} />

      {/* Input Container with SafeAreaView */}
      <View
        className="pt-3 bg-white/98 border-t border-gray-200 shadow-lg"
        style={{
          paddingBottom: insets.bottom > 0 ? insets.bottom : 16,
          paddingHorizontal: 16,
          shadowColor: '#000',
          shadowOffset: { width: 0, height: -2 },
          shadowOpacity: 0.05,
          shadowRadius: 4,
          elevation: 5,
        }}
      >
        <View className="flex-row items-center space-x-3">
          <TextInput
            ref={inputRef}
            value={message}
            onChangeText={setMessage}
            placeholder={placeholder}
            placeholderTextColor="#999999"
            className="flex-1 bg-gray-100 rounded-full px-4 py-2.5 text-base text-gray-900 border border-gray-200"
            multiline={false}
            editable={!disabled && !isLoading}
            onSubmitEditing={handleSend}
            blurOnSubmit={false}
            returnKeyType="send"
            enablesReturnKeyAutomatically={true}
            maxLength={500}
            style={{
              maxHeight: 100,
            }}
          />

          <Pressable
            onPress={handleSend}
            disabled={isButtonDisabled}
            className={`w-11 h-11 rounded-full justify-center items-center ${
              isButtonDisabled
                ? 'bg-gray-400'
                : 'bg-red-800 shadow-lg shadow-red-800/20 active:scale-95'
            }`}
            style={({ pressed }) => [
              {
                transform: pressed && !isButtonDisabled ? [{ scale: 0.95 }] : [{ scale: 1 }],
                shadowColor: '#8B0000',
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.2,
                shadowRadius: 4,
                elevation: 3,
              },
            ]}
          >
            <Text className="text-white text-lg font-bold">{isLoading ? '...' : '→'}</Text>
          </Pressable>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};

export default ChatInput;
