// app/prototype.tsx
import React from 'react';
import { WebView } from 'react-native-webview';

export default function Prototype() {
  return (
    <WebView source={{ uri: 'https://www.figma.com/proto/<your-proto-id>' }} style={{ flex: 1 }} />
  );
}
