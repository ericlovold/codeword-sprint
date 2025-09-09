import { BackArrow } from './BackArrow';
import codewordIcon from 'figma:asset/5933c401654521e08d57623e75479b50a15714d7.png';

interface OnboardingCodewordProps {
  onContinue: () => void;
  onBack: () => void;
  currentIndex: number;
  totalScreens: number;
}

export function OnboardingCodeword({
  onContinue,
  onBack,
  currentIndex,
  totalScreens,
}: OnboardingCodewordProps) {
  return (
    <div
      className="size-full flex flex-col relative"
      style={{ background: 'linear-gradient(180deg, #f8f9fa 0%, rgba(100, 41, 117, 0.2) 100%)' }}
    >
      {/* Header with back arrow */}
      <div className="flex items-center justify-between p-6">
        <BackArrow onClick={onBack} />
        <div className="flex-1"></div>
      </div>

      {/* Main content */}
      <div className="flex-1 flex flex-col items-center justify-center px-8">
        {/* Icon */}
        <div className="mb-8 mt-8">
          <img
            src={codewordIcon}
            alt="Codeword Speech Bubble"
            className="w-40 h-40 object-contain"
          />
        </div>

        {/* Title */}
        <div className="text-center -mt-4">
          <h1
            className="text-4xl mb-4 text-black leading-tight"
            style={{ fontFamily: 'Inter', fontWeight: 500 }}
          >
            Choose Your Codeword
          </h1>
          <p className="text-gray-600 text-lg" style={{ fontFamily: 'Inter' }}>
            Pick a codeword that feels safe. This is your signal for when you need help. It's
            simple, quick, and powerful.
          </p>
        </div>
      </div>

      {/* Progress indicators - anchored position */}
      <div className="absolute bottom-32 left-1/2 transform -translate-x-1/2 flex gap-2">
        {Array.from({ length: totalScreens }).map((_, index) => (
          <div
            key={index}
            className={`w-2 h-2 rounded-full transition-colors duration-200 ${
              index === currentIndex ? 'bg-black' : 'bg-gray-400'
            }`}
          />
        ))}
      </div>

      {/* Home indicator */}
      <div className="flex justify-center pb-2">
        <div className="w-32 h-1 bg-black rounded-full"></div>
      </div>
    </div>
  );
}
