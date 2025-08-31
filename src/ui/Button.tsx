import { Pressable, ViewStyle } from 'react-native';
import Text from './Text';

type Props = {
  title: string;
  onPress?: () => void;
  variant?: 'primary' | 'secondary' | 'danger';
  style?: ViewStyle;
  disabled?: boolean;
};
export default function Button({ title, onPress, variant = 'primary', style, disabled }: Props) {
  const bg = variant === 'primary' ? '#5A3FA6' : variant === 'danger' ? '#DC2626' : '#EDE5FF';
  const color = variant === 'primary' || variant === 'danger' ? '#FFFFFF' : '#0F172A';
  return (
    <Pressable
      onPress={onPress}
      disabled={disabled}
      style={[
        {
          height: 56,
          borderRadius: 28,
          alignItems: 'center',
          justifyContent: 'center',
          paddingHorizontal: 20,
          backgroundColor: bg,
          opacity: disabled ? 0.5 : 1,
        },
        style,
      ]}
    >
      <Text variant="title" color={color}>
        {title}
      </Text>
    </Pressable>
  );
}
