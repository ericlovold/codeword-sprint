import React, { useState } from 'react';
import {
  View,
  TextInput,
  StyleSheet,
  Pressable,
  Image,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { tokens } from '../theme/tokens';

export default function InputBar({ onSend }: { onSend: (t: string) => void }) {
  const [text, setText] = useState('');
  const tabH = useBottomTabBarHeight();
  const insets = useSafeAreaInsets();
  const bottomPad = (insets.bottom || 8) + tabH + 6;

  return (
    <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      <View style={[styles.row, { marginBottom: bottomPad }]}>
        <TextInput
          value={text}
          onChangeText={setText}
          placeholder="Type a message..."
          placeholderTextColor={tokens.colors.gray}
          style={styles.input}
          multiline={false}
          blurOnSubmit={true}
          returnKeyType="send"
          enablesReturnKeyAutomatically
          onSubmitEditing={() => {
            if (text.trim()) {
              onSend(text.trim());
              setText('');
            }
          }}
        />
        <Pressable
          onPress={() => {
            if (text.trim()) {
              onSend(text.trim());
              setText('');
            }
          }}
          style={styles.send}
        >
          <Image
            source={require('../../assets/icons/brand/SendChevron.png')}
            style={{ width: 22, height: 22, tintColor: '#fff' }}
          />
        </Pressable>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  row: { flexDirection: 'row', alignItems: 'center' },
  input: {
    flex: 1,
    backgroundColor: tokens.colors.inputBg,
    borderRadius: 24,
    paddingVertical: 12,
    paddingHorizontal: 16,
    marginRight: 10,
    fontSize: 16,
    color: tokens.colors.ink,
  },
  send: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: tokens.colors.brand,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
