import { BackArrow } from './BackArrow';
import Rectangle25 from '../imports/Rectangle25';

interface AlliesAddedScreenProps {
  onContinue: () => void;
  onBack: () => void;
}

export function AlliesAddedScreen({ onContinue, onBack }: AlliesAddedScreenProps) {
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
            <h1 className="text-3xl font-medium text-black chat-text mb-4">
              Nice! We were able to add your allies.
            </h1>
            <p className="text-gray-600 chat-text text-lg">
              Let's get your Codeword set up for each of them.
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