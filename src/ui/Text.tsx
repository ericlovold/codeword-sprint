import { Text as RNText, TextProps } from 'react-native';

type Variant = 'display' | 'h1' | 'h2' | 'title' | 'body' | 'label';
const map: Record<Variant, { fontSize: number; fontWeight: any; color: string }> = {
  display: { fontSize: 36, fontWeight: '800', color: '#0F172A' },
  h1: { fontSize: 28, fontWeight: '800', color: '#0F172A' },
  h2: { fontSize: 22, fontWeight: '700', color: '#0F172A' },
  title: { fontSize: 18, fontWeight: '700', color: '#0F172A' },
  body: { fontSize: 16, fontWeight: '400', color: '#0F172A' },
  label: { fontSize: 14, fontWeight: '600', color: '#0F172A' },
};

export default function Text({
  children,
  style,
  ...rest
}: TextProps & { variant?: Variant; color?: string }) {
  const variant = (rest as any).variant ?? 'body';
  const color = (rest as any).color ?? map[variant].color;
  const base = map[variant];
  return (
    <RNText
      {...rest}
      style={[{ fontSize: base.fontSize, fontWeight: base.fontWeight, color }, style]}
    >
      {children}
    </RNText>
  );
}
