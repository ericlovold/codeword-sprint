import aiCoachIcon from 'figma:asset/40351abc3bcc292b373e39bd285e9cf166914150.png';
import successIcon from 'figma:asset/ccae4d3e7684238ce4571277ee146e7710676369.png';

interface CodewordSentScreenProps {
  onNavigateToResources: () => void;
  onNavigateToChat: () => void;
}

export function CodewordSentScreen({ onNavigateToResources, onNavigateToChat }: CodewordSentScreenProps) {
  return (
    <div 
      className="size-full flex flex-col items-center justify-center p-6 text-center"
      style={{
        backgroundColor: '#642975'
      }}
    >
      {/* Success Icon */}
      <div className="mb-8">
        <img 
          src={successIcon} 
          alt="Success" 
          className="w-32 h-32"
        />
      </div>

      {/* Main Heading */}
      <h1 className="text-white font-medium chat-text mb-4 max-w-sm" style={{ fontSize: '28px', lineHeight: '1.3' }}>
        Help is on the way
      </h1>

      {/* Subhead */}
      <p className="text-white/80 chat-text mb-12 max-w-sm" style={{ fontSize: '18px', lineHeight: '1.4' }}>
        In the meantime, you can explore our crisis resources or chat with the Codeword Ai Coach.
      </p>

      {/* Action Buttons */}
      <div className="px-8 pb-8 w-full space-y-4">
        {/* Navigate to Resources Button */}
        <button
          onClick={onNavigateToResources}
          className="w-full bg-white text-black rounded-full py-4 px-6 font-medium chat-text transition-all hover:bg-gray-50 active:scale-95"
          style={{ fontSize: '16px', fontFamily: 'Inter' }}
        >
          View Crisis Resources
        </button>
        
        {/* Chat with AI Coach Button */}
        <button
          onClick={onNavigateToChat}
          className="w-full text-white rounded-full py-4 px-6 font-medium chat-text transition-all hover:opacity-90 active:scale-95 flex items-center justify-center gap-3"
          style={{ 
            fontSize: '16px',
            background: 'linear-gradient(90deg, #A974B8 0%, #4FB3C4 100%)',
            fontFamily: 'Inter'
          }}
        >
          <img 
            src={aiCoachIcon} 
            alt="AI Coach" 
            className="w-8 h-8"
          />
          Chat with AI Coach
        </button>
      </div>
    </div>
  );
}