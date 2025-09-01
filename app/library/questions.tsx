import React from 'react';
import { View, Text, ScrollView } from 'react-native';
import Header from '../../src/components/Header';
import { colors } from '../../src/design/tokens';
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
import { LinearGradient } from 'expo-linear-gradient';

const QUESTIONS = [
  "'I care about you—what's feeling hardest right now?'",
  "'Are you feeling safe in this moment?'",
  "'What would help you feel more supported?'",
  "'Would you like me to stay with you while we talk?'",
  "'Would it help to reach out to a professional together?'",
];

export default function QuestionsScreen() {
  const tabH = useBottomTabBarHeight();

  return (
    <LinearGradient
      colors={['#F1E9FF', '#DDE6F5', '#CFEDE6']}
      start={{ x: 0.3, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={{ flex: 1 }}
    >
      <Header title="Codeword" />
      <ScrollView
        contentContainerStyle={{
          padding: 20,
          paddingBottom: tabH + 32,
          gap: 14,
        }}
        showsVerticalScrollIndicator={false}
      >
        <Text style={{ fontSize: 26, fontWeight: '800', color: colors.text.title }}>
          Questions to ask at the moment of crisis
        </Text>

        {QUESTIONS.map((q, i) => (
          <View
            key={i}
            style={{
              backgroundColor: 'rgba(255,255,255,0.95)',
              borderRadius: 20,
              padding: 16,
              borderWidth: 1,
              borderColor: colors.surface.ring,
            }}
          >
            <Text style={{ fontSize: 18, color: colors.text.body }}>{q}</Text>
          </View>
        ))}
      </ScrollView>
    </LinearGradient>
  );
}
