import React from 'react';
import { StandardHeader } from './BackArrow';
import Rectangle25 from '../imports/Rectangle25';
import paulGardnerPhoto from 'figma:asset/36f161422b68d5928697d02ecfa03c4fdcd1d0d2.png';

interface ReviewInviteScreenProps {
  codeword: string;
  selectedAlly: { id: string; name: string } | null;
  onSendInvite: () => void;
  onBack: () => void;
}

export const ReviewInviteScreen: React.FC<ReviewInviteScreenProps> = ({
  codeword,
  selectedAlly,
  onSendInvite,
  onBack,
}) => {

  return (
    <div className="h-screen w-full flex flex-col relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <div 
          className="size-full"
          style={{
            background: 'linear-gradient(180deg, #f8f9fa 0%, rgba(100, 41, 117, 0.3) 100%)'
          }}
        />
        <Rectangle25 />
      </div>

      {/* Fixed Header with back arrow */}
      <StandardHeader onBack={onBack} />

      {/* Scrollable Content */}
      <div className="relative z-10 flex-1 overflow-y-auto">
        <div className="px-6 py-6 pt-12">
          {/* Title */}
          <div className="mb-8">
            <h1 className="text-black text-2xl font-medium chat-text leading-tight mb-4">
              Review
            </h1>
            <p className="text-gray-600 chat-text text-lg">
              Please review the information below before sending an invite to your ally.
            </p>
          </div>

          {/* Review Content */}
          <div className="space-y-6">
            {/* Combined Ally and Codeword Section */}
            <div className="bg-white/60 backdrop-blur-sm rounded-xl p-6">
              <h3 className="text-black font-medium chat-text text-lg mb-6">
                Your Codeword Setup
              </h3>
              
              {/* Selected Ally */}
              <div className="mb-6">
                <h4 className="text-black font-medium chat-text mb-3">
                  Selected Ally
                </h4>
                {selectedAlly ? (
                  <div className="flex items-center space-x-4">
                    {selectedAlly.name === 'Paul Gardner' ? (
                      <img 
                        src={paulGardnerPhoto}
                        alt={selectedAlly.name}
                        className="w-12 h-12 rounded-full object-cover"
                      />
                    ) : (
                      <div className="w-12 h-12 rounded-full flex items-center justify-center text-white font-medium text-lg" style={{ backgroundColor: '#642975' }}>
                        {selectedAlly.name.split(' ').map(n => n[0]).join('').toUpperCase()}
                      </div>
                    )}
                    <span className="text-black font-medium chat-text text-lg">
                      {selectedAlly.name}
                    </span>
                  </div>
                ) : (
                  <p className="text-gray-600 chat-text">
                    No ally selected
                  </p>
                )}
              </div>

              {/* Codeword */}
              <div>
                <h4 className="text-black font-medium chat-text mb-3">
                  Your Codeword
                </h4>
                <span className="text-black font-medium chat-text text-lg">
                  "{codeword}"
                </span>
              </div>
            </div>

            {/* What happens next */}
            <div>
              <h3 className="text-black font-medium chat-text text-lg mb-4">
                What happens next?
              </h3>
              <p className="text-gray-700 chat-text">
                Your ally will receive an invite to join your support network. You can start using Codeword for crisis support and intervention.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Fixed Send Invite Button */}
      <div className="relative z-10 px-6 pb-6 shrink-0">
        <button
          onClick={onSendInvite}
          className="w-full h-14 bg-black text-white font-medium chat-text rounded-full transition-all hover:bg-gray-800"
        >
          Send Codeword Invite
        </button>
      </div>
    </div>
  );
};