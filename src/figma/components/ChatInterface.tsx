import { useState, useEffect } from 'react';
import { StickyHeader } from './StickyHeader';
import { ChatHeader } from './ChatHeader';
import { MessageBubble } from './MessageBubble';
import { MessageInput } from './MessageInput';
import { chatApi, ChatMessage } from '../../api/chat';
import gradientBackground from 'figma:asset/75a87984cd26ef9a82b5b068b27bba77182e682d.png';

interface Message {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: Date;
  metadata?: any;
}

export function ChatInterface() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: "Hi! I'm your Codeword AI coach, here to support you emotionally, detect crises, and help you navigate challenging situations. I'm powered by GPT-4o and connected to the XCAi platform for enhanced support.",
      isUser: false,
      timestamp: new Date(),
    },
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Check API health on component mount
  useEffect(() => {
    const checkHealth = async () => {
      try {
        const health = await chatApi.healthCheck();
        console.log('Chat API health:', health);
      } catch (err) {
        console.error('Chat API health check failed:', err);
        setError('Unable to connect to chat service. Please check your connection.');
      }
    };

    checkHealth();
  }, []);

  const handleSendMessage = async (messageText: string) => {
    if (!messageText.trim() || isLoading) return;

    // Clear any previous errors
    setError(null);

    // Add user message to UI immediately
    const newMessage: Message = {
      id: Date.now().toString(),
      text: messageText,
      isUser: true,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, newMessage]);
    setIsLoading(true);

    try {
      // Build conversation history for API call
      const conversationHistory: ChatMessage[] = messages.map((msg) => ({
        role: msg.isUser ? ('user' as const) : ('assistant' as const),
        content: msg.text,
      }));

      // Call the XCAi platform API
      const response = await chatApi.sendWithHistory(messageText, conversationHistory);

      // Add AI response to messages
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        text: response.message.content,
        isUser: false,
        timestamp: new Date(),
        metadata: response.metadata,
      };

      setMessages((prev) => [...prev, aiResponse]);

      // Log crisis detection if present
      if (response.metadata?.crisis_level && response.metadata.crisis_level !== 'none') {
        console.warn(
          `Crisis detected: ${response.metadata.crisis_level}`,
          response.metadata.crisis_keywords,
        );
      }
    } catch (err) {
      console.error('Chat API error:', err);
      const errorMessage = err instanceof Error ? err.message : 'Failed to send message';
      setError(errorMessage);

      // Add error message to chat
      const errorResponse: Message = {
        id: (Date.now() + 2).toString(),
        text: `⚠️ I'm having trouble connecting right now. ${errorMessage}`,
        isUser: false,
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, errorResponse]);
    } finally {
      setIsLoading(false);
    }
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
          backgroundRepeat: 'no-repeat',
        }}
      >
        <ChatHeader />

        {/* Messages area */}
        <div className="flex-1 overflow-y-auto px-4 pb-4">
          <div className="space-y-1">
            {messages.map((message) => (
              <MessageBubble key={message.id} message={message.text} isUser={message.isUser} />
            ))}
          </div>
        </div>

        <MessageInput onSendMessage={handleSendMessage} />
      </div>
    </div>
  );
}
