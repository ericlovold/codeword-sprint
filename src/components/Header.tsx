import React from 'react';
import { SafeAreaView, View, Text, Platform } from 'react-native';

export default function Header({ title = 'Codeword' }: { title?: string }) {
  return (
    <SafeAreaView>
      <View
        style={{
          backgroundColor: '#6A35B7',
          height: 72,
          alignItems: 'center',
          justifyContent: 'center',
          borderBottomLeftRadius: 26,
          borderBottomRightRadius: 26,
          paddingBottom: Platform.OS === 'ios' ? 8 : 4,
        }}
      >
        <Text style={{ color: 'white', fontSize: 22, fontWeight: '700' }}>{title}</Text>
      </View>
    </SafeAreaView>
  );
}
