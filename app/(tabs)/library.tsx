import React from 'react';
import { View, Text, ScrollView } from 'react-native';
import { GUIDE_SECTIONS, LIBRARY_PAGE_TITLE } from '../../src/content/library';
import { Accordion } from '../../src/components/Accordion';

export default function LibraryScreen() {
  return (
    <View className="flex-1">
      {/* Brand header */}
      <View className="pt-12 pb-4 bg-[#6B2FA1] rounded-b-3xl shadow-sm">
        <Text className="text-white text-center text-2xl font-semibold">Codeword</Text>
      </View>

      {/* Soft gradient backdrop (simple fallback) */}
      <View className="absolute inset-0" style={{ opacity: 0.07, backgroundColor: '#6B2FA1' }} />

      <ScrollView
        className="flex-1 px-4 pt-5"
        contentContainerStyle={{ paddingBottom: 28 }}
        keyboardShouldPersistTaps="handled"
      >
        <Text className="text-2xl font-semibold text-[#1e1b4b] mb-4">{LIBRARY_PAGE_TITLE}</Text>

        <Accordion items={GUIDE_SECTIONS} initiallyOpenId="be-calm" />
      </ScrollView>
    </View>
  );
}
