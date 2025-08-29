import { ArrowRight } from 'lucide-react';
import { StickyHeader } from './StickyHeader';
import gradientBackground from 'figma:asset/2d5def61f9723efdfba6defb429eadace5c3a6f9.png';

interface SupportOptionsScreenProps {
  onNavigate?: (screen: 'home' | 'chat' | 'support' | 'supportOptions') => void;
}

export function SupportOptionsScreen({ onNavigate }: SupportOptionsScreenProps) {
  const handleSetUpAllies = () => {
    console.log('Set Up My Allies clicked');
    // This would navigate to allies setup
  };

  const handleDial988 = () => {
    window.location.href = 'tel:988';
  };

  const handleDial911 = () => {
    window.location.href = 'tel:911';
  };

  const handleManageAllies = () => {
    console.log('Manage My Allies clicked');
    // This would navigate to allies management
  };

  return (
    <div className="h-full flex flex-col">
      <StickyHeader />
      
      {/* Main content area with gradient background */}
      <div 
        className="flex-1 flex flex-col px-6 pt-16 pb-8"
        style={{
          backgroundImage: `url(${gradientBackground})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat'
        }}
      >
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-medium text-black chat-text">
            Get Support
          </h1>
        </div>

        {/* Content */}
        <div className="space-y-4 max-w-md mx-auto w-full">
          {/* Set Up My Allies Card */}
          <div className="bg-white rounded-3xl p-8 shadow-sm">
            <div className="flex items-start justify-between mb-6">
              {/* Handshake Icon */}
              <div className="w-16 h-16 flex items-center justify-center">
                <svg 
                  width="48" 
                  height="48" 
                  viewBox="0 0 48 48" 
                  fill="none" 
                  xmlns="http://www.w3.org/2000/svg"
                  className="text-purple-400"
                >
                  <path 
                    d="M20 14L16 18L12 22L8 26L12 30L16 34L20 38M28 14L32 18L36 22L40 26L36 30L32 34L28 38M24 8L24 40" 
                    stroke="currentColor" 
                    strokeWidth="2" 
                    strokeLinecap="round" 
                    strokeLinejoin="round"
                  />
                  <path 
                    d="M16 18L24 26L32 18M16 30L24 22L32 30" 
                    stroke="currentColor" 
                    strokeWidth="2" 
                    strokeLinecap="round" 
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
              <ArrowRight size={24} className="text-gray-400 mt-2" />
            </div>
            
            <button 
              onClick={handleSetUpAllies}
              className="text-left w-full"
            >
              <h2 className="text-2xl font-medium text-black chat-text mb-3">
                Set Up My Allies
              </h2>
              <p className="text-base text-gray-600 chat-text leading-relaxed">
                Connect your contacts to create and share a Codeword with your ally.
              </p>
            </button>
          </div>

          {/* Emergency Options */}
          <div className="space-y-3">
            {/* Dial 988 Lifeline Button */}
            <button
              onClick={handleDial988}
              className="w-full flex items-center justify-between px-6 py-5 rounded-3xl bg-white text-lg font-medium chat-text transition-all hover:bg-gray-50 shadow-sm"
            >
              <div className="flex flex-col items-start">
                <span style={{ color: '#E91E63' }}>Dial 988 Lifeline</span>
                <span className="text-sm font-normal" style={{ color: '#E91E63' }}>
                  Speak with a crisis counselor
                </span>
              </div>
              <ArrowRight size={20} style={{ color: '#E91E63' }} />
            </button>

            {/* Dial 911 Emergency Button */}
            <button
              onClick={handleDial911}
              className="w-full flex items-center justify-between px-6 py-5 rounded-3xl bg-white text-lg font-medium chat-text transition-all hover:bg-gray-50 shadow-sm"
            >
              <span style={{ color: '#E91E63' }}>Dial 911 Emergency</span>
              <ArrowRight size={20} style={{ color: '#E91E63' }} />
            </button>

            {/* Manage My Allies Button */}
            <button
              onClick={handleManageAllies}
              className="w-full flex items-center justify-between px-6 py-5 rounded-3xl bg-white text-lg font-medium text-black chat-text transition-all hover:bg-gray-50 shadow-sm"
            >
              <span>Manage My Allies</span>
              <ArrowRight size={20} className="text-black" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}