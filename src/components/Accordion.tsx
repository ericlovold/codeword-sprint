import React, { useState } from 'react';
import { View, Text, Pressable, LayoutAnimation, Platform, UIManager } from 'react-native';

if (Platform.OS === 'android' && UIManager.setLayoutAnimationEnabledExperimental) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

export type AccordionItem = {
  id: string;
  title: string;
  bullets?: string[];
  body?: string;
};

export function Accordion({
  items,
  initiallyOpenId,
}: {
  items: AccordionItem[];
  initiallyOpenId?: string;
}) {
  const [openId, setOpenId] = useState<string | null>(initiallyOpenId ?? null);

  return (
    <View className="gap-3">
      {items.map((it) => {
        const open = it.id === openId;
        return (
          <View
            key={it.id}
            className="rounded-2xl overflow-hidden bg-white/80"
            style={{ borderWidth: 1, borderColor: 'rgba(0,0,0,0.06)' }}
          >
            <Pressable
              onPress={() => {
                LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
                setOpenId(open ? null : it.id);
              }}
              className="flex-row items-center justify-between px-4 py-4"
            >
              <Text className="text-base font-medium text-[#1e1b4b]">{it.title}</Text>
              <Text className="text-xl">{open ? '▾' : '▸'}</Text>
            </Pressable>

            {open && (
              <View className="px-5 pb-4 pt-1">
                {it.body ? (
                  <Text className="text-[15px] leading-6 text-[#2f2a59]">{it.body}</Text>
                ) : null}
                {it.bullets?.length ? (
                  <View className="mt-2">
                    {it.bullets.map((b, i) => (
                      <View className="flex-row items-start mb-2" key={i}>
                        <Text className="mt-[2px] mr-2">•</Text>
                        <Text className="flex-1 text-[15px] leading-6 text-[#2f2a59]">{b}</Text>
                      </View>
                    ))}
                  </View>
                ) : null}
              </View>
            )}
          </View>
        );
      })}
    </View>
  );
}
