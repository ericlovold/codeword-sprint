interface MessageBubbleProps {
  message: string;
  isUser: boolean;
  time?: string;
}

export function MessageBubble({ message, isUser, time }: MessageBubbleProps) {
  return (
    <div className={`flex ${isUser ? 'justify-end' : 'justify-start'} mb-4`}>
      <div
        className={`max-w-[280px] px-4 py-3 rounded-2xl ${
          isUser
            ? 'text-white border shadow-sm'
            : 'bg-white text-gray-800 shadow-sm border border-gray-200'
        }`}
        style={isUser ? { 
          backgroundColor: '#642975', 
          borderColor: '#642975',
          opacity: 0.9 
        } : {}}
      >
        <p className={`chat-text ${isUser ? 'text-white' : ''} leading-relaxed`} style={!isUser ? { color: '#642975' } : {}}>
          {message}
        </p>
        {time && (
          <p className={`text-xs mt-1 chat-text ${isUser ? 'text-white/70' : 'text-gray-500'}`}>
            {time}
          </p>
        )}
      </div>
    </div>
  );
}