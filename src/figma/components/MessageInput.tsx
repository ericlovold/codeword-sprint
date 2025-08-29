import { useState } from 'react';
import arrowIcon from 'figma:asset/2a558c40cc10bf0344fb6df1324270c5466bf875.png';

interface MessageInputProps {
  onSendMessage: (message: string) => void;
}

export function MessageInput({ onSendMessage }: MessageInputProps) {
  const [message, setMessage] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim()) {
      onSendMessage(message);
      setMessage('');
    }
  };

  return (
    <div className="p-4 bg-transparent backdrop-blur-sm">
      <form onSubmit={handleSubmit} className="flex items-center gap-3">
        <div className="flex-1">
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Type a message..."
            className="w-full px-4 py-3 rounded-full bg-gray-100 text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-1 chat-text"
            style={{ 
              '--tw-ring-color': '#642975'
            } as React.CSSProperties}
          />
        </div>
        <button
          type="submit"
          className="w-12 h-12 hover:opacity-90 rounded-full flex items-center justify-center text-white transition-opacity"
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
  );
}