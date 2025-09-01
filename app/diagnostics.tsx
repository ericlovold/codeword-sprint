import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { RUNTIME } from '../src/config/runtime';

export default function Diagnostics() {
  return (
    <ScrollView contentContainerStyle={s.c}>
      <Text style={s.h}>Diagnostics</Text>
      <Text>Build: 1.0.0 (100)</Text>
      <Text>Config: ai_config@1.0.0</Text>
      <Text>Safety: phrases_v1.2 (hash: abc123)</Text>
      <Text>Endpoint: {RUNTIME.API_BASE_URL}</Text>
      <Text>Env: {RUNTIME.ENV}</Text>
      <Text>Circuit: (see net.ts)</Text>
    </ScrollView>
  );
}
const s = StyleSheet.create({
  c: { padding: 16, gap: 8 },
  h: { fontSize: 22, fontWeight: '700', marginBottom: 8 },
});
