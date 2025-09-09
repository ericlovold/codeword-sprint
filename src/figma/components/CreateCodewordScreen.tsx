import React, { useState } from 'react';
import { StandardHeader } from './BackArrow';
import Rectangle25 from '../imports/Rectangle25';

interface CreateCodewordScreenProps {
  selectedAlly: { id: string; name: string } | null;
  onContinue: (codeword: string) => void;
  onBack: () => void;
}

export const CreateCodewordScreen: React.FC<CreateCodewordScreenProps> = ({
  selectedAlly,
  onContinue,
  onBack,
}) => {
  const [codeword, setCodeword] = useState('');

  // Extract first name from the selected ally
  const allyFirstName = selectedAlly ? selectedAlly.name.split(' ')[0] : 'your ally';

  const handleContinue = () => {
    if (codeword.trim()) {
      onContinue(codeword.trim());
    }
  };

  return (
    <div className="h-screen w-full flex flex-col relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <div
          className="size-full"
          style={{
            background: 'linear-gradient(180deg, #f8f9fa 0%, rgba(100, 41, 117, 0.3) 100%)',
          }}
        />
        <Rectangle25 />
      </div>

      {/* Fixed Header with back arrow */}
      <StandardHeader onBack={onBack} />

      {/* Scrollable Content - Centered */}
      <div className="relative z-10 flex-1 overflow-y-auto">
        <div className="flex items-center justify-center min-h-full px-6">
          <div className="w-full max-w-md py-6">
            {/* Title */}
            <div className="mb-8 text-center">
              <h1 className="text-black text-2xl font-medium chat-text leading-tight">
                Create a Codeword with {allyFirstName}
              </h1>
              <p className="text-gray-600 chat-text text-lg mt-4">
                Your Codeword is a unique and personal word that you will use with your ally.
              </p>
            </div>

            {/* Codeword Input */}
            <div className="mb-6">
              <input
                type="text"
                value={codeword}
                onChange={(e) => setCodeword(e.target.value)}
                placeholder="Enter your codeword"
                className="w-full px-4 py-3 bg-white chat-text text-black placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-[#642975]"
                maxLength={50}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Fixed Continue button */}
      <div className="relative z-10 px-6 pb-6 shrink-0">
        <button
          onClick={handleContinue}
          disabled={!codeword.trim()}
          className="w-full h-14 bg-black text-white font-medium chat-text rounded-full transition-all hover:bg-gray-800 disabled:bg-gray-400 disabled:cursor-not-allowed"
        >
          Continue
        </button>
      </div>
    </div>
  );
};
