import React from 'react';
import { View, Text, ScrollView, Pressable } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { colors } from '../../src/design/tokens';
import Header from '../../src/components/Header';
import AccordionCard from '../../src/components/AccordionCard';
import Bullet from '../../src/components/Bullet';
import { GUIDES } from '../../src/data/guides';
import { useRouter } from 'expo-router';
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';

export default function Library() {
  const router = useRouter();
  const tabH = useBottomTabBarHeight();

  return (
    <LinearGradient
      colors={['#F1E9FF', '#DDE6F5', '#CFEDE6']}
      start={{ x: 0.3, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={{ flex: 1 }}
    >
      <Header title="Codeword" subtitle="Guides" />

      <ScrollView
        contentContainerStyle={{ padding: 16, paddingBottom: tabH + 24 }}
        showsVerticalScrollIndicator={false}
      >
        {/* First item is a link to the detailed screen */}
        <Pressable
          onPress={() => router.push('/library/questions')}
          style={{
            backgroundColor: 'rgba(255,255,255,0.92)',
            borderRadius: 24,
            borderWidth: 1,
            borderColor: colors.surface.ring,
            paddingVertical: 16,
            paddingHorizontal: 16,
            marginBottom: 12,
          }}
        >
          <View
            style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}
          >
            <Text style={{ fontSize: 18, fontWeight: '700', color: colors.text.title }}>
              {GUIDES[0].title}
            </Text>
            <Text style={{ color: colors.text.faint }}>›</Text>
          </View>
        </Pressable>

        {/* Remaining groups as accordions */}
        {GUIDES.slice(1).map((g) => (
          <AccordionCard key={g.id} title={g.title}>
            <View style={{ gap: 6 }}>
              {/* Optional "Ask AI Coach" pill */}
              <Pressable
                onPress={() => router.push('/(tabs)/chat')}
                style={{
                  alignSelf: 'flex-end',
                  marginBottom: 10,
                  backgroundColor: colors.brand.purple,
                  paddingHorizontal: 14,
                  paddingVertical: 8,
                  borderRadius: 999,
                }}
              >
                <Text style={{ color: 'white', fontWeight: '700' }}>Ask AI Coach</Text>
              </Pressable>

              {(g.bullets ?? []).map((b, i) => (
                <Bullet key={i}>{b}</Bullet>
              ))}
            </View>
          </AccordionCard>
        ))}
      </ScrollView>
    </LinearGradient>
  );
}
