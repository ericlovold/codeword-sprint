import React, { useState } from 'react';
import { View, Text, Pressable, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { librarySections } from '../../src/data/library';

function Card({ children, style }: any) {
  return (
    <View
      style={[
        {
          backgroundColor: 'white',
          borderRadius: 16,
          paddingVertical: 14,
          paddingHorizontal: 16,
          shadowColor: '#000',
          shadowOpacity: 0.08,
          shadowRadius: 8,
          shadowOffset: { width: 0, height: 2 },
          elevation: 2,
          marginBottom: 12,
        },
        style,
      ]}
    >
      {children}
    </View>
  );
}

export default function LibraryScreen() {
  const router = useRouter();
  const [openId, setOpenId] = useState<string | null>('be-calm'); // default open like wireframe

  return (
    <View style={{ flex: 1, backgroundColor: '#F3EAF7' /* subtle bg under gradient */ }}>
      <ScrollView
        contentContainerStyle={{ paddingHorizontal: 16, paddingTop: 16, paddingBottom: 28 }}
        showsVerticalScrollIndicator={false}
      >
        <Text style={{ fontSize: 28, fontWeight: '700', color: '#2C2240', marginBottom: 12 }}>
          Guides
        </Text>

        {librarySections.map((section) => {
          const isOpen = openId === section.id;
          return (
            <Card key={section.id} style={{ overflow: 'hidden' }}>
              <Pressable
                onPress={() => setOpenId(isOpen ? null : section.id)}
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                }}
              >
                <Text style={{ fontSize: 18, fontWeight: '700', color: '#1D1235' }}>
                  {section.title}
                </Text>
                <Text style={{ fontSize: 18, color: '#6B5FA8' }}>{isOpen ? '▾' : '▸'}</Text>
              </Pressable>

              {isOpen && (
                <View style={{ marginTop: 12, gap: 10 }}>
                  {section.items.map((it) => (
                    <Card key={it.id} style={{ backgroundColor: '#F7F3FB', marginBottom: 8 }}>
                      <Pressable
                        onPress={() => {
                          if (it.linkTo) router.push(it.linkTo);
                        }}
                      >
                        <Text
                          style={{
                            fontSize: 16,
                            fontWeight: '600',
                            color: '#2C2240',
                            marginBottom: it.bullets?.length ? 8 : 0,
                          }}
                        >
                          {it.title}
                        </Text>

                        {it.bullets?.length ? (
                          <View style={{ gap: 6 }}>
                            {it.bullets.map((b, idx) => (
                              <View key={idx} style={{ flexDirection: 'row', gap: 8 }}>
                                <Text style={{ color: '#7C6CA8' }}>•</Text>
                                <Text style={{ color: '#3A2F57', flex: 1 }}>{b}</Text>
                              </View>
                            ))}
                          </View>
                        ) : null}
                      </Pressable>
                    </Card>
                  ))}
                </View>
              )}
            </Card>
          );
        })}
      </ScrollView>
    </View>
  );
}
