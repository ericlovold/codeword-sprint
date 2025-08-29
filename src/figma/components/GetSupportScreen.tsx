import { useState } from 'react';
import { SimpleArrowRight } from './SimpleArrowRight';
import { StickyHeader } from './StickyHeader';
import { LifelinePopup } from './LifelinePopup';
import { CodewordPopup } from './CodewordPopup';
import { CodewordWarningPopup } from './CodewordWarningPopup';

interface GetSupportScreenProps {
  onCodewordSent?: () => void;
  onManageAllies?: () => void;
  selectedContacts?: { id: string; name: string; initials: string }[];
  hasCodewordSetup?: boolean;
  onNavigateToCodewordSetup?: () => void;
}

export function GetSupportScreen({ onCodewordSent, onManageAllies, selectedContacts, hasCodewordSetup, onNavigateToCodewordSetup }: GetSupportScreenProps) {
  const [showLifelinePopup, setShowLifelinePopup] = useState(false);
  const [showCodewordPopup, setShowCodewordPopup] = useState(false);
  const [showCodewordWarningPopup, setShowCodewordWarningPopup] = useState(false);

  const handleSendCodeword = () => {
    if (hasCodewordSetup) {
      setShowCodewordPopup(true);
    } else {
      setShowCodewordWarningPopup(true);
    }
  };

  const handleDial988 = () => {
    setShowLifelinePopup(true);
  };

  const handleDial911 = () => {
    window.location.href = 'tel:911';
  };

  const handleManageAllies = () => {
    onManageAllies?.();
  };

  return (
    <div className="h-full flex flex-col">
      <StickyHeader hideBorder={true} />
      
      {/* 988 Lifeline Popup */}
      <LifelinePopup 
        isOpen={showLifelinePopup} 
        onClose={() => setShowLifelinePopup(false)} 
      />
      
      {/* Codeword Popup */}
      <CodewordPopup 
        isOpen={showCodewordPopup} 
        onClose={() => setShowCodewordPopup(false)}
        onCodewordSent={onCodewordSent}
        selectedContacts={selectedContacts}
      />
      
      {/* Codeword Warning Popup */}
      <CodewordWarningPopup 
        isOpen={showCodewordWarningPopup} 
        onClose={() => setShowCodewordWarningPopup(false)}
        onSetupCodeword={() => onNavigateToCodewordSetup?.()}
      />
      
      {/* Main content area with solid purple background */}
      <div 
        className="flex-1 flex flex-col px-6 pt-24 pb-8"
        style={{
          backgroundColor: '#642975'
        }}
      >
        {/* Header */}
        <div className="mb-28">
          <h1 className="text-4xl font-medium text-white chat-text">
            Get Support
          </h1>
        </div>

        {/* Action Buttons */}
        <div className="space-y-4 max-w-md mx-auto w-full">
          {/* Send Codeword Button */}
          <button
            onClick={handleSendCodeword}
            className="w-full h-20 flex items-center justify-between px-8 rounded-full text-white text-xl font-medium chat-text transition-all hover:opacity-90"
            style={{ backgroundColor: '#C53E5C' }}
          >
            <span>Send Codeword</span>
            <SimpleArrowRight size={24} color="white" />
          </button>

          {/* Dial 988 Lifeline Button */}
          <button
            onClick={handleDial988}
            className="w-full h-20 flex items-center justify-between px-8 rounded-full bg-white text-xl font-medium chat-text transition-all hover:bg-gray-50 shadow-sm"
          >
            <div className="flex flex-col items-start justify-center">
              <span style={{ color: '#C53E5C' }}>988 Lifeline</span>
              <span className="text-sm font-normal" style={{ color: '#C53E5C' }}>
                Speak or text with a crisis counselor
              </span>
            </div>
            <SimpleArrowRight size={24} color="#C53E5C" />
          </button>

          {/* Dial 911 Emergency Button */}
          <button
            onClick={handleDial911}
            className="w-full h-20 flex items-center justify-between px-8 rounded-full bg-white text-xl font-medium chat-text transition-all hover:bg-gray-50 shadow-sm"
          >
            <span style={{ color: '#C53E5C' }}>Dial 911 Emergency</span>
            <SimpleArrowRight size={24} color="#C53E5C" />
          </button>

          {/* Manage My Allies Button */}
          <button
            onClick={handleManageAllies}
            className="w-full h-20 flex items-center justify-between px-8 rounded-full bg-white text-xl font-medium text-black chat-text transition-all hover:bg-gray-50 shadow-sm"
          >
            <span>Manage My Allies</span>
            <SimpleArrowRight size={24} color="black" />
          </button>
        </div>
      </div>
    </div>
  );
}