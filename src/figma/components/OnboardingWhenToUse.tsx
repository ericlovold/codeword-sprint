import { BackArrow } from './BackArrow';
import mentalHealthIcon from 'figma:asset/81f9016f0937f92e98e8c6d926d54865ed069e35.png';

interface OnboardingWhenToUseProps {
  onContinue: () => void;
  onBack: () => void;
  currentIndex: number;
  totalScreens: number;
}

export function OnboardingWhenToUse({ onContinue, onBack, currentIndex, totalScreens }: OnboardingWhenToUseProps) {
  return (
    <div className="size-full flex flex-col relative" style={{ background: 'linear-gradient(180deg, #f8f9fa 0%, rgba(100, 41, 117, 0.3) 100%)' }}>
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
            src={mentalHealthIcon}
            alt="Mental Health Mind Pattern" 
            className="w-32 h-32 object-contain"
          />
        </div>

        {/* Title */}
        <div className="text-center mt-4">
          <h1 className="text-4xl mb-4 text-black leading-tight" style={{ fontFamily: 'Inter', fontWeight: 500 }}>
            When to Use Your Codeword
          </h1>
          <p className="text-gray-600 text-lg" style={{ fontFamily: 'Inter' }}>
            Feeling overwhelmed?<br />
            Send your Codeword to alert your allies. They'll be notified instantly, ready to help when you need it most.
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