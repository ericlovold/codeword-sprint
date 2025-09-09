import { BackArrow } from './BackArrow';
import communicationIcon from 'figma:asset/1d5947778dc107ef6fc1cf8cee2eec0c7f314df0.png';

interface OnboardingAICoachingProps {
  onComplete: () => void;
  onBack: () => void;
  currentIndex: number;
  totalScreens: number;
}

export function OnboardingAICoaching({
  onComplete,
  onBack,
  currentIndex,
  totalScreens,
}: OnboardingAICoachingProps) {
  return (
    <div
      className="size-full flex flex-col relative"
      style={{ background: 'linear-gradient(180deg, #f8f9fa 0%, rgba(100, 41, 117, 0.35) 100%)' }}
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
            src={communicationIcon}
            alt="Communication Support"
            className="w-42 h-42 object-contain"
          />
        </div>

        {/* Title */}
        <div className="text-center">
          <h1
            className="text-4xl mb-4 text-black leading-tight"
            style={{ fontFamily: 'Inter', fontWeight: 500 }}
          >
            Personal AI Coaching
          </h1>
          <p className="text-gray-600 text-lg" style={{ fontFamily: 'Inter' }}>
            You and your allies get real-time AI-powered tips to guide you through support. With
            personalized coaching, you'll know exactly how to respond, helping you both feel
            understood and supported.
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

      {/* Continue button */}
      <div className="px-8 pb-8">
        <button
          onClick={onComplete}
          className="w-full bg-black text-white py-4 rounded-full"
          style={{ fontFamily: 'Inter', fontWeight: 500 }}
        >
          Get Started
        </button>
      </div>

      {/* Home indicator */}
      <div className="flex justify-center pb-2">
        <div className="w-32 h-1 bg-black rounded-full"></div>
      </div>
    </div>
  );
}
