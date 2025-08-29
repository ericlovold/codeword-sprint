import { useState } from 'react';
import { StickyHeader } from './StickyHeader';
import { ChatHeader } from './ChatHeader';
import { MessageBubble } from './MessageBubble';
import { MessageInput } from './MessageInput';
import gradientBackground from 'figma:asset/75a87984cd26ef9a82b5b068b27bba77182e682d.png';

interface Message {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: Date;
}

export function ChatInterface() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: "Hi Eric, I'm your Codeword AI coach, here to support you emotionally, detect crises, and help you navigate challenging responses from your ally.",
      isUser: false,
      timestamp: new Date(),
    },
    {
      id: '2',
      text: "I'm feeling overwhelmed and need someone to talk to.",
      isUser: true,
      timestamp: new Date(),
    },
    {
      id: '3',
      text: "I'm really sorry you're feeling overwhelmed. That can be such a heavy and exhausting place to be in. You don't have to carry all of this alone. I'm here with you, and I want to support you however I can.\n\nWould you feel comfortable telling me a bit more about what's been going on or what's weighing on you most right now?",
      isUser: false,
      timestamp: new Date(),
    },
  ]);

  const handleSendMessage = (messageText: string) => {
    const newMessage: Message = {
      id: Date.now().toString(),
      text: messageText,
      isUser: true,
      timestamp: new Date(),
    };
    
    setMessages(prev => [...prev, newMessage]);
    
    // Simulate AI response after a delay
    setTimeout(() => {
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        text: "Thank you for sharing that with me. I can hear how much you're going through right now. Can you tell me more about what's been most challenging for you today?",
        isUser: false,
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, aiResponse]);
    }, 1000);
  };

  return (
    <div className="h-full flex flex-col relative overflow-hidden">
      <StickyHeader />
      
      {/* Main content area with custom gradient background */}
      <div 
        className="flex-1 flex flex-col relative overflow-hidden"
        style={{
          backgroundImage: `url(${gradientBackground})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat'
        }}
      >
        <ChatHeader />
        
        {/* Messages area */}
        <div className="flex-1 overflow-y-auto px-4 pb-4">
          <div className="space-y-1">
            {messages.map((message) => (
              <MessageBubble
                key={message.id}
                message={message.text}
                isUser={message.isUser}
              />
            ))}
          </div>
        </div>
        
        <MessageInput onSendMessage={handleSendMessage} />
      </div>
    </div>
  );
}