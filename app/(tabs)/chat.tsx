import React, { useState } from 'react';
import { ScrollView, View } from 'react-native';
import ScreenShell from '../../src/components/ScreenShell';
import MessageBubble from '../../src/components/MessageBubble';
import InputBar from '../../src/components/InputBar';

export default function Chat() {
  const [msgs, setMsgs] = useState([
    {
      id: 'sys1',
      role: 'ai',
      text: "Hi Eric, I'm your Codeword AI coach, here to support you emotionally, detect crises, and help you navigate challenging responses from your ally.",
    },
    { id: 'u1', role: 'user', text: "I'm feeling overwhelmed and need someone to talk to." },
    {
      id: 'ai1',
      role: 'ai',
      text: "I'm really sorry you're feeling overwhelmed. You don't have to carry all of this alone. Would you feel comfortable telling me a bit more about what's been going on or what's weighing on you most right now?",
    },
  ] as { id: string; role: 'user' | 'ai'; text: string }[]);

  const onSend = (t: string) =>
    setMsgs((prev) => [...prev, { id: String(Date.now()), role: 'user', text: t }]);

  return (
    <ScreenShell>
      <ScrollView
        contentContainerStyle={{ paddingBottom: 16 }}
        showsVerticalScrollIndicator={false}
      >
        <View style={{ height: 8 }} />
        {msgs.map((m) => (
          <MessageBubble key={m.id} role={m.role}>
            {m.text}
          </MessageBubble>
        ))}
      </ScrollView>
      <InputBar onSend={onSend} />
    </ScreenShell>
  );
}
