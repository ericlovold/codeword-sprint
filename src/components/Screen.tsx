import React from 'react';
import { SafeAreaView, View, Text, ScrollView, KeyboardAvoidingView, Platform } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { colors, radius, spacing } from '../theme';

type Props = {
  title?: string;
  children: React.ReactNode;
  scroll?: boolean;
  footerInset?: number; // extra space above tab bar / composer
};

export default function Screen({ title, children, scroll = true, footerInset = 0 }: Props) {
  const Container: any = scroll ? ScrollView : View;

  return (
    <LinearGradient colors={[colors.bgTop, colors.bgBottom]} style={{ flex: 1 }}>
      <SafeAreaView style={{ flex: 1 }}>
        {/* Purple header */}
        <View
          style={{
            backgroundColor: colors.purple,
            borderBottomLeftRadius: radius.xl,
            borderBottomRightRadius: radius.xl,
            paddingVertical: spacing.lg,
            paddingHorizontal: spacing.xl,
          }}
        >
          {title ? (
            <Text
              style={{
                textAlign: 'center',
                color: colors.white,
                fontWeight: '700',
                fontSize: 22,
              }}
            >
              {title}
            </Text>
          ) : null}
        </View>

        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : undefined}
          style={{ flex: 1 }}
          keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 0}
        >
          <Container
            contentContainerStyle={{
              padding: spacing.xl,
              paddingBottom: spacing.xl + footerInset,
              gap: spacing.lg,
            }}
            style={{ flex: 1 }}
          >
            {children}
          </Container>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </LinearGradient>
  );
}
