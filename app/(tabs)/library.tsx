import React, { useState } from 'react';
import {
  Platform,
  UIManager,
  LayoutAnimation,
  View,
  Text,
  Pressable,
  FlatList,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
import { useRouter } from 'expo-router';
import { GUIDES, type Guide } from '../../src/data/guides';

// Enable smooth expand/collapse on Android
if (Platform.OS === 'android' && UIManager.setLayoutAnimationEnabledExperimental) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

function Bullet({ children }: { children: React.ReactNode }) {
  return (
    <View className="flex-row items-start mb-2">
      <View className="mt-2 mr-3 h-1.5 w-1.5 rounded-full bg-violet-500" />
      <Text className="flex-1 text-base leading-6 text-slate-700">{children}</Text>
    </View>
  );
}

function AccordionItem({ guide }: { guide: Guide }) {
  const [open, setOpen] = useState(false);
  const router = useRouter();

  const toggle = () => {
    if (guide.route) {
      router.push(guide.route);
      return;
    }
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setOpen((v) => !v);
  };

  return (
    <View className="mb-3 overflow-hidden rounded-2xl">
      <Pressable
        onPress={toggle}
        className="flex-row items-center justify-between rounded-2xl border border-violet-100/70 bg-white/90 px-4 py-4"
      >
        <Text className="text-lg font-semibold text-slate-800">{guide.title}</Text>
        <Text className="text-2xl text-slate-500">{guide.route ? '›' : open ? '▾' : '▸'}</Text>
      </Pressable>

      {open && guide.bullets && (
        <View className="rounded-b-2xl border border-t-0 border-violet-100/70 bg-white/80 px-4 py-4">
          {guide.bullets.map((b, i) => (
            <Bullet key={i}>{b}</Bullet>
          ))}

          {/* Ask AI Coach pill */}
          <Pressable onPress={() => router.push('/(tabs)/chat')} className="self-end mt-3">
            <LinearGradient
              colors={['#6E34F5', '#47C6B5']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={{ borderRadius: 999, paddingHorizontal: 14, paddingVertical: 8 }}
            >
              <Text className="text-white font-semibold">Ask AI Coach</Text>
            </LinearGradient>
          </Pressable>
        </View>
      )}
    </View>
  );
}

export default function LibraryScreen() {
  const insets = useSafeAreaInsets();
  const tabH = useBottomTabBarHeight();

  return (
    <LinearGradient
      colors={['#F1E9FF', '#DDE6F5', '#CFEDE6']}
      start={{ x: 0.3, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={{ flex: 1 }}
    >
      <View style={{ paddingTop: insets.top + 8 }} className="px-5">
        {/* Top header to match Figma shell */}
        <View className="mb-4 rounded-3xl bg-violet-700 px-4 py-4">
          <Text className="text-center text-2xl font-extrabold text-white">Codeword</Text>
        </View>

        <Text className="mb-3 text-2xl font-bold text-slate-800">Guides</Text>

        <FlatList
          data={GUIDES}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => <AccordionItem guide={item} />}
          contentContainerStyle={{ paddingBottom: tabH + 24 }}
          showsVerticalScrollIndicator={false}
        />
      </View>
    </LinearGradient>
  );
}
