import React, { useState } from 'react';
import { Check } from 'lucide-react';
import { StandardHeader } from './BackArrow';
import Rectangle25 from '../imports/Rectangle25';
import paulImage from 'figma:asset/36f161422b68d5928697d02ecfa03c4fdcd1d0d2.png';

interface CodewordAllySelectionScreenProps {
  selectedContacts: { id: string; name: string; initials: string }[];
  onContinue: (ally: { id: string; name: string }) => void;
  onSkip?: () => void;
  onBack: () => void;
}

export const CodewordAllySelectionScreen: React.FC<CodewordAllySelectionScreenProps> = ({
  selectedContacts,
  onContinue,
  onSkip,
  onBack,
}) => {
  const [selectedAlly, setSelectedAlly] = useState<string | null>(null);

  // Default allies in case selectedContacts is empty (fallback)
  const defaultAllies = [
    { id: '1', name: 'Emma Thompson', initials: 'ET' },
    { id: '2', name: 'Marcus Johnson', initials: 'MJ' },
    { id: '3', name: 'Sarah Davis', initials: 'SD' },
    { id: '4', name: 'Paul Gardner', initials: 'PG' },
    { id: '5', name: 'Lisa Anderson', initials: 'LA' },
  ];

  // Use the contacts selected from the previous screen, or default allies if none selected
  const allies = selectedContacts && selectedContacts.length > 0 ? selectedContacts : defaultAllies;

  const handleAllySelect = (allyId: string) => {
    setSelectedAlly(allyId);
  };

  const getInitialsBackgroundColor = (initials: string) => {
    // Generate a consistent color based on initials
    const colors = [
      '#6B7280', // Gray
      '#EF4444', // Red
      '#F59E0B', // Amber
      '#10B981', // Emerald
      '#3B82F6', // Blue
      '#8B5CF6', // Violet
      '#EC4899', // Pink
    ];

    const index = initials.charCodeAt(0) % colors.length;
    return colors[index];
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
                Who do you want to share a Codeword with?
              </h1>
            </div>

            {/* Allies list */}
            <div className="space-y-4">
              {allies.map((ally) => (
                <div
                  key={ally.id}
                  onClick={() => handleAllySelect(ally.id)}
                  className="flex items-center justify-between p-4 bg-white/60 backdrop-blur-sm rounded-xl cursor-pointer transition-all hover:bg-white/80"
                >
                  <div className="flex items-center space-x-4">
                    {/* Avatar */}
                    {ally.initials === 'PG' ? (
                      <img
                        src={paulImage}
                        alt={ally.name}
                        className="w-12 h-12 rounded-full object-cover"
                      />
                    ) : (
                      <div
                        className="w-12 h-12 rounded-full flex items-center justify-center"
                        style={{ backgroundColor: getInitialsBackgroundColor(ally.initials) }}
                      >
                        <span className="text-white font-medium chat-text text-lg">
                          {ally.initials}
                        </span>
                      </div>
                    )}

                    {/* Name */}
                    <span className="text-black font-medium chat-text text-lg">{ally.name}</span>
                  </div>

                  {/* Selection indicator */}
                  <div
                    className={`w-6 h-6 rounded-full border flex items-center justify-center ${
                      selectedAlly === ally.id
                        ? 'bg-[#642975] border-[#642975]'
                        : 'border-[#642975]'
                    }`}
                  >
                    {selectedAlly === ally.id && <Check size={14} className="text-white" />}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Fixed Action buttons */}
      <div className="relative z-10 px-6 py-6 shrink-0 space-y-3">
        <button
          onClick={() => {
            if (selectedAlly) {
              const ally = allies.find((a) => a.id === selectedAlly);
              if (ally) {
                onContinue(ally);
              }
            }
          }}
          disabled={!selectedAlly}
          className="w-full h-14 bg-black text-white font-medium chat-text rounded-full transition-all hover:bg-gray-800 disabled:bg-gray-400 disabled:cursor-not-allowed"
        >
          Continue
        </button>

        {onSkip && (
          <button
            onClick={onSkip}
            className="w-full h-14 bg-transparent border-2 border-black text-black font-medium chat-text rounded-full transition-all hover:border-gray-800 hover:text-gray-800"
          >
            Setup Later
          </button>
        )}
      </div>
    </div>
  );
};
