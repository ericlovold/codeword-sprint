import { useState, useRef, useEffect } from 'react';
import { MessageBubble } from './MessageBubble';
import { StickyHeader } from './StickyHeader';
import { X } from 'lucide-react';
import arrowIcon from 'figma:asset/2a558c40cc10bf0344fb6df1324270c5466bf875.png';
import gradientBackground from 'figma:asset/75a87984cd26ef9a82b5b068b27bba77182e682d.png';

interface Message {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: Date;
}

interface ChatOverlayProps {
  isOpen: boolean;
  onClose: () => void;
  guideTitle?: string;
}

export function ChatOverlay({ isOpen, onClose, guideTitle }: ChatOverlayProps) {
  // Different initial messages based on context
  const getInitialMessage = () => {
    if (guideTitle === "Crisis Communication Support") {
      return {
        id: '1',
        text: "I'm here to help you communicate effectively with your allies. Try saying:\n\n\"I'm going through a difficult time and could use your support\"\n\"I'm not feeling safe right now and wanted to reach out\"\n\"Can you talk? I'm struggling and need someone to listen\"\n\"I trust you and wanted you to know what's happening\"\n\nWhat specific situation are you dealing with? I can help you find the right words.",
        isUser: false,
        timestamp: new Date()
      };
    } else {
      return {
        id: '1',
        text: "Hi Eric, I'm your Ai Codeword Coach. How can I help guide you through your conversation with Marty? It sounds like he is struggling today.",
        isUser: false,
        timestamp: new Date()
      };
    }
  };

  const [messages, setMessages] = useState<Message[]>([getInitialMessage()]);
  const [inputValue, setInputValue] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = () => {
    if (!inputValue.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputValue,
      isUser: true,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');

    // Simulate AI response with context-specific guidance
    setTimeout(() => {
      let responseText = "I understand your situation. Let me provide some guidance based on crisis intervention best practices. Remember, you're taking the right steps by seeking support.";
      
      if (guideTitle === "Crisis Communication Support") {
        responseText = "That's a great question. Remember to be honest and direct about your feelings. You could also say things like 'I'm having thoughts that worry me' or 'I need someone I trust to know what I'm going through.' Would you like me to help you practice what to say for your specific situation?";
      }
      
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        text: responseText,
        isUser: false,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, aiResponse]);
    }, 1000);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex flex-col">
      {/* Gradient background matching AI Coach chat */}
      <div 
        className="absolute inset-0" 
        style={{
          backgroundImage: `url(${gradientBackground})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat'
        }}
      />
      
      {/* Main chat interface */}
      <div className="relative z-10 flex flex-col h-full">
        {/* Header with logo */}
        <div className="relative">
          <StickyHeader hideBorder={true} />
          <button
            onClick={onClose}
            className="absolute top-5 right-4 p-2 rounded-full bg-black/20 backdrop-blur-sm hover:bg-black/30 transition-colors z-20"
          >
            <X className="w-6 h-6 text-white drop-shadow-sm" />
          </button>
        </div>

        {/* Messages area */}
        <div className="flex-1 overflow-y-auto px-4 py-6">
          <div className="max-w-sm mx-auto space-y-1 mt-8">
            {messages.map((message) => (
              <MessageBubble
                key={message.id}
                message={message.text}
                isUser={message.isUser}
              />
            ))}
            <div ref={messagesEndRef} />
          </div>
        </div>

        {/* Input area */}
        <div className="p-4 bg-transparent backdrop-blur-sm">
          <form onSubmit={(e) => { e.preventDefault(); handleSendMessage(); }} className="flex items-center gap-3">
            <div className="flex-1">
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Type a message..."
                className="w-full px-4 py-3 rounded-full bg-gray-100 text-gray-800 placeholder-gray-500 border-0 focus:outline-none focus:ring-1 chat-text"
                style={{ 
                  '--tw-ring-color': '#642975'
                } as React.CSSProperties}
              />
            </div>
            <button
              type="submit"
              disabled={!inputValue.trim()}
              className="w-12 h-12 hover:opacity-90 rounded-full flex items-center justify-center text-white transition-opacity disabled:opacity-50"
              style={{ backgroundColor: '#642975' }}
            >
              <img 
                src={arrowIcon} 
                alt="Send" 
                className="w-8 h-8 object-contain"
              />
            </button>
          </form>
        </div>

        {/* iOS Style Keyboard */}
        <div className="bg-gray-200 border-t border-gray-300 p-2 pb-20">
          <div className="space-y-2">
            {/* Numbers row */}
            <div className="flex justify-center space-x-1">
              {['1', '2', '3', '4', '5', '6', '7', '8', '9', '0'].map((key) => (
                <button
                  key={key}
                  className="w-8 h-10 bg-white rounded-md shadow-sm text-gray-900 text-lg hover:bg-gray-100 transition-colors chat-text flex items-center justify-center"
                >
                  {key}
                </button>
              ))}
            </div>
            
            {/* Top letter row */}
            <div className="flex justify-center space-x-1">
              {['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'].map((key) => (
                <button
                  key={key}
                  className="w-8 h-10 bg-white rounded-md shadow-sm text-gray-900 text-lg hover:bg-gray-100 transition-colors chat-text flex items-center justify-center"
                >
                  {key}
                </button>
              ))}
            </div>
            
            {/* Middle letter row */}
            <div className="flex justify-center space-x-1">
              {['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L'].map((key) => (
                <button
                  key={key}
                  className="w-8 h-10 bg-white rounded-md shadow-sm text-gray-900 text-lg hover:bg-gray-100 transition-colors chat-text flex items-center justify-center"
                >
                  {key}
                </button>
              ))}
            </div>
            
            {/* Bottom letter row with shift and delete */}
            <div className="flex justify-center items-center space-x-1">
              <button className="w-12 h-10 bg-gray-400 rounded-md shadow-sm text-white text-sm hover:bg-gray-500 transition-colors chat-text flex items-center justify-center">
                ⇧
              </button>
              {['Z', 'X', 'C', 'V', 'B', 'N', 'M'].map((key) => (
                <button
                  key={key}
                  className="w-8 h-10 bg-white rounded-md shadow-sm text-gray-900 text-lg hover:bg-gray-100 transition-colors chat-text flex items-center justify-center"
                >
                  {key}
                </button>
              ))}
              <button className="w-12 h-10 bg-gray-400 rounded-md shadow-sm text-white text-sm hover:bg-gray-500 transition-colors chat-text flex items-center justify-center">
                ⌫
              </button>
            </div>
            
            {/* Bottom row with numbers, space, and return */}
            <div className="flex justify-center items-center space-x-1">
              <button className="w-12 h-10 bg-gray-400 rounded-md shadow-sm text-white text-sm hover:bg-gray-500 transition-colors chat-text flex items-center justify-center">
                123
              </button>
              <button className="w-10 h-10 bg-white rounded-md shadow-sm text-gray-900 text-lg hover:bg-gray-100 transition-colors chat-text flex items-center justify-center">
                🌐
              </button>
              <button className="flex-1 h-10 bg-white rounded-md shadow-sm text-gray-900 text-lg hover:bg-gray-100 transition-colors chat-text flex items-center justify-center mx-2">
                space
              </button>
              <button className="w-16 h-10 bg-blue-500 rounded-md shadow-sm text-white text-sm hover:bg-blue-600 transition-colors chat-text flex items-center justify-center">
                return
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}