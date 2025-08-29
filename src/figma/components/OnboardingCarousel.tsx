import { useState, useRef } from 'react';
import { OnboardingCodeword } from './OnboardingCodeword';
import { OnboardingAllies } from './OnboardingAllies';
import { OnboardingWhenToUse } from './OnboardingWhenToUse';
import { OnboardingAICoaching } from './OnboardingAICoaching';

interface OnboardingCarouselProps {
  onComplete: () => void;
  onBack: () => void;
}

export function OnboardingCarousel({ onComplete, onBack }: OnboardingCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const carouselRef = useRef<HTMLDivElement>(null);

  const screens = [
    'codeword',
    'allies',
    'when-to-use',
    'ai-coaching'
  ];

  const minSwipeDistance = 50;

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
    setIsDragging(false);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!touchStart) return;
    setTouchEnd(e.targetTouches[0].clientX);
    
    const distance = Math.abs(e.targetTouches[0].clientX - touchStart);
    if (distance > 10) {
      setIsDragging(true);
    }
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd || !isDragging) return;
    
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;

    if (isLeftSwipe && currentIndex < screens.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
    if (isRightSwipe && currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }

    setTouchStart(null);
    setTouchEnd(null);
    setIsDragging(false);
  };

  // Mouse event handlers for desktop support
  const handleMouseDown = (e: React.MouseEvent) => {
    setTouchEnd(null);
    setTouchStart(e.clientX);
    setIsDragging(false);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!touchStart) return;
    setTouchEnd(e.clientX);
    
    const distance = Math.abs(e.clientX - touchStart);
    if (distance > 10) {
      setIsDragging(true);
    }
  };

  const handleMouseUp = () => {
    if (!touchStart || !touchEnd || !isDragging) return;
    
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;

    if (isLeftSwipe && currentIndex < screens.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
    if (isRightSwipe && currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }

    setTouchStart(null);
    setTouchEnd(null);
    setIsDragging(false);
  };

  const handleNext = () => {
    if (currentIndex < screens.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const handleBackButton = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    } else {
      // If at the first screen in carousel, go back to welcome
      onBack();
    }
  };

  const handleAICoachingComplete = () => {
    // This is called when user clicks "Get Started" on AI Coaching screen
    onComplete();
  };

  const renderScreen = (screenType: string, index: number) => {
    switch (screenType) {
      case 'codeword':
        return (
          <OnboardingCodeword 
            onContinue={handleNext} 
            onBack={handleBackButton}
            currentIndex={currentIndex}
            totalScreens={screens.length}
          />
        );
      case 'allies':
        return (
          <OnboardingAllies 
            onContinue={handleNext} 
            onBack={handleBackButton}
            currentIndex={currentIndex}
            totalScreens={screens.length}
          />
        );
      case 'when-to-use':
        return (
          <OnboardingWhenToUse 
            onContinue={handleNext} 
            onBack={handleBackButton}
            currentIndex={currentIndex}
            totalScreens={screens.length}
          />
        );
      case 'ai-coaching':
        return (
          <OnboardingAICoaching 
            onComplete={handleAICoachingComplete} 
            onBack={handleBackButton}
            currentIndex={currentIndex}
            totalScreens={screens.length}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="size-full overflow-hidden relative">
      <div
        ref={carouselRef}
        className="size-full flex transition-transform duration-300 ease-out"
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
      >
        {screens.map((screen, index) => (
          <div key={screen} className="size-full flex-shrink-0">
            {renderScreen(screen, index)}
          </div>
        ))}
      </div>
    </div>
  );
}