import { BackArrow } from './BackArrow';
import Rectangle25 from '../imports/Rectangle25';
import successIcon from 'figma:asset/394ad9ebe9821f64e093530b45eda06c93f33b25.png';

interface InviteSentScreenProps {
  selectedAlly: { id: string; name: string } | null;
  onContinue: () => void;
  onBack: () => void;
}

export function InviteSentScreen({ selectedAlly, onContinue, onBack }: InviteSentScreenProps) {
  // Extract first name from selectedAlly
  const firstName = selectedAlly ? selectedAlly.name.split(' ')[0] : 'your ally';
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
      <div className="relative z-10 flex items-center justify-start p-6 pt-12 shrink-0">
        <BackArrow onClick={onBack} />
      </div>

      {/* Scrollable Content */}
      <div className="relative z-10 flex-1 overflow-y-auto">
        <div className="flex items-center justify-center min-h-full px-6">
          <div className="text-center py-6">
            {/* Success Icon */}
            <div className="mb-8 flex justify-center">
              <img 
                src={successIcon} 
                alt="Success checkmark"
                className="w-24 h-24"
              />
            </div>
            
            <h1 className="text-3xl font-medium text-black chat-text mb-4">
              Perfect! Your invite has been sent to {firstName}.
            </h1>
            <p className="text-gray-600 chat-text text-lg">
              Your ally will receive an invitation to join your support network.
            </p>
          </div>
        </div>
      </div>

      {/* Fixed Continue button */}
      <div className="relative z-10 px-6 pb-6 shrink-0">
        <button
          onClick={onContinue}
          className="w-full h-14 bg-black text-white font-medium chat-text rounded-full transition-all hover:bg-gray-800"
        >
          Continue
        </button>
      </div>
    </div>
  );
}