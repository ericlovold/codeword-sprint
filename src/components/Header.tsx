import React from 'react';
import { SafeAreaView, View, Text, Image, Platform } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

export default function Header({ title = 'Codeword' }: { title?: string }) {
  return (
    <LinearGradient colors={['#5F2C97', '#6A35B7']} start={{ x: 0, y: 0.2 }} end={{ x: 1, y: 1 }}>
      <SafeAreaView>
        <View
          style={{
            height: 72,
            alignItems: 'center',
            justifyContent: 'center',
            borderBottomLeftRadius: 26,
            borderBottomRightRadius: 26,
            overflow: 'hidden',
            paddingBottom: Platform.OS === 'ios' ? 8 : 4,
          }}
        >
          {/* Use the wordmark if you want, else text */}
          {/* <Image source={require("../../app/assets/icons/CodewordLogo.png")} style={{height:24, resizeMode:"contain"}} /> */}
          <Text
            style={{
              color: 'white',
              fontSize: 22,
              fontWeight: '700',
              letterSpacing: 0.4,
            }}
          >
            {title}
          </Text>
        </View>
      </SafeAreaView>
    </LinearGradient>
  );
}
