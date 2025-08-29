import { useState, useEffect } from 'react';
import { X } from 'lucide-react';

interface MoodTrackerScreenProps {
  onClose: () => void;
}

// Helper function to interpolate between two colors
const interpolateColor = (color1: string, color2: string, factor: number) => {
  // Convert hex to RGB
  const hex2rgb = (hex: string) => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
      r: parseInt(result[1], 16),
      g: parseInt(result[2], 16),
      b: parseInt(result[3], 16)
    } : { r: 0, g: 0, b: 0 };
  };

  // Convert RGB to hex
  const rgb2hex = (r: number, g: number, b: number) => {
    return "#" + [r, g, b].map(x => {
      const hex = Math.round(x).toString(16);
      return hex.length === 1 ? "0" + hex : hex;
    }).join("");
  };

  const c1 = hex2rgb(color1);
  const c2 = hex2rgb(color2);
  
  const r = c1.r + factor * (c2.r - c1.r);
  const g = c1.g + factor * (c2.g - c1.g);
  const b = c1.b + factor * (c2.b - c1.b);
  
  return rgb2hex(r, g, b);
};

// Generate dynamic gradient based on valence and arousal values with smooth interpolation
const generateDynamicGradient = (valence: number, arousal: number) => {
  // Convert 0-100 values to 0-1 range for easier calculations
  const v = valence / 100; // 0 = Unpleasant, 1 = Pleasant
  const a = arousal / 100;  // 0 = Low energy, 1 = High energy
  
  // Define corner colors for smooth interpolation
  const cornerColors = {
    // Pleasant + High Energy (top right)
    pleasantHighEnergy: { primary: '#FFD700', secondary: '#FF8C00', tertiary: '#FF6347' },
    // Pleasant + Low Energy (bottom right)
    pleasantLowEnergy: { primary: '#98FB98', secondary: '#87CEEB', tertiary: '#DDA0DD' },
    // Unpleasant + High Energy (top left)
    unpleasantHighEnergy: { primary: '#DC143C', secondary: '#8B0000', tertiary: '#4B0000' },
    // Unpleasant + Low Energy (bottom left)
    unpleasantLowEnergy: { primary: '#2F4F4F', secondary: '#483D8B', tertiary: '#191970' }
  };

  // Interpolate between corner colors based on valence and arousal
  const topColors = {
    primary: interpolateColor(cornerColors.unpleasantHighEnergy.primary, cornerColors.pleasantHighEnergy.primary, v),
    secondary: interpolateColor(cornerColors.unpleasantHighEnergy.secondary, cornerColors.pleasantHighEnergy.secondary, v),
    tertiary: interpolateColor(cornerColors.unpleasantHighEnergy.tertiary, cornerColors.pleasantHighEnergy.tertiary, v)
  };

  const bottomColors = {
    primary: interpolateColor(cornerColors.unpleasantLowEnergy.primary, cornerColors.pleasantLowEnergy.primary, v),
    secondary: interpolateColor(cornerColors.unpleasantLowEnergy.secondary, cornerColors.pleasantLowEnergy.secondary, v),
    tertiary: interpolateColor(cornerColors.unpleasantLowEnergy.tertiary, cornerColors.pleasantLowEnergy.tertiary, v)
  };

  const finalColors = {
    primary: interpolateColor(bottomColors.primary, topColors.primary, a),
    secondary: interpolateColor(bottomColors.secondary, topColors.secondary, a),
    tertiary: interpolateColor(bottomColors.tertiary, topColors.tertiary, a)
  };
  
  // Create gradient with smooth transitions and dynamic angle
  const gradientAngle = 135 + (v - 0.5) * 20 + (a - 0.5) * 10; // More subtle angle variation
  return {
    gradient: `linear-gradient(${gradientAngle}deg, ${finalColors.primary} 0%, ${finalColors.secondary} 50%, ${finalColors.tertiary} 100%)`,
    primaryColor: finalColors.primary,
    tertiaryColor: finalColors.tertiary
  };
};

// Mood mapping based on valence (pleasant/unpleasant) and arousal (high/low energy)
const getMoodFromValues = (valence: number, arousal: number) => {
  // Convert 0-100 values to -1 to 1 range
  const v = (valence - 50) / 50; // Pleasant(1) to Unpleasant(-1)
  const a = (arousal - 50) / 50;  // High energy(1) to Low energy(-1)
  
  // Define mood categories based on quadrants
  if (v > 0.3 && a > 0.3) return { mood: "Elated", description: "Feeling joyful and energetic" };
  if (v > 0.3 && a < -0.3) return { mood: "Content", description: "Feeling peaceful and satisfied" };
  if (v < -0.3 && a > 0.3) return { mood: "Enraged", description: "Full of extreme anger" };
  if (v < -0.3 && a < -0.3) return { mood: "Depressed", description: "Feeling sad and low energy" };
  
  // Mid-range values
  if (v > 0.1 && Math.abs(a) <= 0.3) return { mood: "Pleasant", description: "Feeling good and balanced" };
  if (v < -0.1 && Math.abs(a) <= 0.3) return { mood: "Unpleasant", description: "Feeling uncomfortable" };
  if (Math.abs(v) <= 0.3 && a > 0.1) return { mood: "Energetic", description: "Feeling active and alert" };
  if (Math.abs(v) <= 0.3 && a < -0.1) return { mood: "Calm", description: "Feeling relaxed and quiet" };
  
  return { mood: "Neutral", description: "Feeling balanced and centered" };
};

export function MoodTrackerScreen({ onClose }: MoodTrackerScreenProps) {
  const [valenceValue, setValenceValue] = useState(50); // 0 = Unpleasant, 100 = Pleasant
  const [arousalValue, setArousalValue] = useState(75); // 0 = Low energy, 100 = High energy
  const [currentMood, setCurrentMood] = useState(getMoodFromValues(50, 75));
  const [currentGradientData, setCurrentGradientData] = useState(generateDynamicGradient(50, 75));

  useEffect(() => {
    setCurrentMood(getMoodFromValues(valenceValue, arousalValue));
    setCurrentGradientData(generateDynamicGradient(valenceValue, arousalValue));
  }, [valenceValue, arousalValue]);

  const handleSave = () => {
    // In a real app, this would save to a database
    console.log('Saving mood:', currentMood, { valence: valenceValue, arousal: arousalValue });
    onClose();
  };

  return (
    <div 
      className="size-full flex flex-col relative" 
      style={{ 
        background: `linear-gradient(180deg, #f8f9fa 0%, ${currentGradientData.primaryColor}15 100%)`,
        transition: 'background 1.2s cubic-bezier(0.4, 0.0, 0.2, 1)'
      }}
    >
      {/* Header with close button */}
      <div className="flex items-center justify-between p-6">
        <div className="flex-1"></div>
        <button
          onClick={onClose}
          className="p-2 transition-colors"
        >
          <X className="w-6 h-6 text-black" />
        </button>
      </div>

      {/* Title */}
      <div className="text-center mb-8">
        <h1 className="text-2xl" style={{ fontFamily: 'Inter', fontWeight: 500, color: '#000' }}>
          How are you feeling?
        </h1>
      </div>

      {/* Main slider container */}
      <div className="flex-1 flex flex-col justify-center items-center px-8 mb-6">
        <div 
          className="relative w-full max-w-none rounded-3xl overflow-hidden flex-1 min-h-96"
          style={{
            background: currentGradientData.gradient,
            transition: 'background 1.2s cubic-bezier(0.4, 0.0, 0.2, 1)',
            marginLeft: '32px',
            marginRight: '32px'
          }}
        >
          {/* Slider labels */}
          <div className="absolute top-6 left-6 right-1/2 mr-3 text-center text-white" style={{ fontFamily: 'Inter', fontWeight: 500 }}>
            Pleasant
          </div>
          <div className="absolute top-6 right-6 left-1/2 ml-3 text-center text-white" style={{ fontFamily: 'Inter', fontWeight: 500 }}>
            High energy
          </div>
          <div className="absolute bottom-6 left-6 right-1/2 mr-3 text-center text-white" style={{ fontFamily: 'Inter', fontWeight: 500 }}>
            Unpleasant
          </div>
          <div className="absolute bottom-6 right-6 left-1/2 ml-3 text-center text-white" style={{ fontFamily: 'Inter', fontWeight: 500 }}>
            Low energy
          </div>

          {/* Left slider track (Valence) */}
          <div className="absolute left-6 top-16 bottom-16 right-1/2 mr-3">
            <div className="relative h-full">
              {/* Slider track */}
              <div className="absolute inset-0 bg-white/40 rounded-3xl backdrop-blur-sm"></div>
              
              {/* Center line indicator */}
              <div className="absolute left-4 right-4 h-px bg-white/80 top-1/2 transform -translate-y-px"></div>
              
              {/* Slider thumb */}
              <div 
                className="absolute left-1/2 transform -translate-x-1/2 w-28 h-12 bg-black rounded-full cursor-pointer transition-all duration-300 ease-out"
                style={{ 
                  top: `${10 + (80 - (valenceValue * 0.8))}%`,
                  marginTop: '-24px',
                  transition: 'top 0.1s ease-out, transform 0.3s ease-out, box-shadow 0.3s ease-out'
                }}
                onMouseDown={(e) => {
                  e.preventDefault();
                  const startY = e.clientY;
                  const startValue = valenceValue;
                  const sliderRect = e.currentTarget.parentElement?.getBoundingClientRect();
                  
                  const handleMouseMove = (moveEvent: MouseEvent) => {
                    if (!sliderRect) return;
                    const deltaY = moveEvent.clientY - startY;
                    const sliderHeight = sliderRect.height - 48; // Account for thumb size
                    const valueChange = -(deltaY / sliderHeight) * 125; // Scale to account for 80% range
                    const newValue = Math.max(0, Math.min(100, startValue + valueChange));
                    setValenceValue(newValue);
                  };
                  
                  const handleMouseUp = () => {
                    document.removeEventListener('mousemove', handleMouseMove);
                    document.removeEventListener('mouseup', handleMouseUp);
                  };
                  
                  document.addEventListener('mousemove', handleMouseMove);
                  document.addEventListener('mouseup', handleMouseUp);
                }}
                onTouchStart={(e) => {
                  e.preventDefault();
                  const startY = e.touches[0].clientY;
                  const startValue = valenceValue;
                  const sliderRect = e.currentTarget.parentElement?.getBoundingClientRect();
                  
                  const handleTouchMove = (moveEvent: TouchEvent) => {
                    if (!sliderRect) return;
                    const deltaY = moveEvent.touches[0].clientY - startY;
                    const sliderHeight = sliderRect.height - 48;
                    const valueChange = -(deltaY / sliderHeight) * 125; // Scale to account for 80% range
                    const newValue = Math.max(0, Math.min(100, startValue + valueChange));
                    setValenceValue(newValue);
                  };
                  
                  const handleTouchEnd = () => {
                    document.removeEventListener('touchmove', handleTouchMove as any);
                    document.removeEventListener('touchend', handleTouchEnd);
                  };
                  
                  document.addEventListener('touchmove', handleTouchMove as any);
                  document.addEventListener('touchend', handleTouchEnd);
                }}
              ></div>
            </div>
          </div>

          {/* Right slider track (Arousal) */}
          <div className="absolute right-6 top-16 bottom-16 left-1/2 ml-3">
            <div className="relative h-full">
              {/* Slider track */}
              <div className="absolute inset-0 bg-white/40 rounded-3xl backdrop-blur-sm"></div>
              
              {/* Center line indicator */}
              <div className="absolute left-4 right-4 h-px bg-white/80 top-1/2 transform -translate-y-px"></div>
              
              {/* Slider thumb */}
              <div 
                className="absolute left-1/2 transform -translate-x-1/2 w-28 h-12 bg-black rounded-full cursor-pointer transition-all duration-300 ease-out"
                style={{ 
                  top: `${10 + (80 - (arousalValue * 0.8))}%`,
                  marginTop: '-24px',
                  transition: 'top 0.1s ease-out, transform 0.3s ease-out, box-shadow 0.3s ease-out'
                }}
                onMouseDown={(e) => {
                  e.preventDefault();
                  const startY = e.clientY;
                  const startValue = arousalValue;
                  const sliderRect = e.currentTarget.parentElement?.getBoundingClientRect();
                  
                  const handleMouseMove = (moveEvent: MouseEvent) => {
                    if (!sliderRect) return;
                    const deltaY = moveEvent.clientY - startY;
                    const sliderHeight = sliderRect.height - 48; // Account for thumb size
                    const valueChange = -(deltaY / sliderHeight) * 125; // Scale to account for 80% range
                    const newValue = Math.max(0, Math.min(100, startValue + valueChange));
                    setArousalValue(newValue);
                  };
                  
                  const handleMouseUp = () => {
                    document.removeEventListener('mousemove', handleMouseMove);
                    document.removeEventListener('mouseup', handleMouseUp);
                  };
                  
                  document.addEventListener('mousemove', handleMouseMove);
                  document.addEventListener('mouseup', handleMouseUp);
                }}
                onTouchStart={(e) => {
                  e.preventDefault();
                  const startY = e.touches[0].clientY;
                  const startValue = arousalValue;
                  const sliderRect = e.currentTarget.parentElement?.getBoundingClientRect();
                  
                  const handleTouchMove = (moveEvent: TouchEvent) => {
                    if (!sliderRect) return;
                    const deltaY = moveEvent.touches[0].clientY - startY;
                    const sliderHeight = sliderRect.height - 48;
                    const valueChange = -(deltaY / sliderHeight) * 125; // Scale to account for 80% range
                    const newValue = Math.max(0, Math.min(100, startValue + valueChange));
                    setArousalValue(newValue);
                  };
                  
                  const handleTouchEnd = () => {
                    document.removeEventListener('touchmove', handleTouchMove as any);
                    document.removeEventListener('touchend', handleTouchEnd);
                  };
                  
                  document.addEventListener('touchmove', handleTouchMove as any);
                  document.addEventListener('touchend', handleTouchEnd);
                }}
              ></div>
            </div>
          </div>
        </div>
      </div>

      {/* Mood result card */}
      <div className="px-8 mb-6">
        <div 
          className="rounded-2xl p-6 border-2 flex items-center justify-between"
          style={{ 
            borderColor: '#642975',
            background: `linear-gradient(135deg, ${currentGradientData.primaryColor}20 0%, ${currentGradientData.tertiaryColor}20 100%)`,
            transition: 'background 1.2s cubic-bezier(0.4, 0.0, 0.2, 1), border-color 1.2s cubic-bezier(0.4, 0.0, 0.2, 1)'
          }}
        >
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <h3 className="text-lg" style={{ fontFamily: 'Inter', fontWeight: 600, color: '#000' }}>
                {currentMood.mood}
              </h3>
            </div>
            <p className="text-gray-600 text-sm" style={{ fontFamily: 'Inter' }}>
              {currentMood.description}
            </p>
          </div>
        </div>
      </div>

      {/* Share button at bottom */}
      <div className="px-8 mb-6">
        <button
          onClick={handleSave}
          className="w-full px-6 py-4 bg-black text-white rounded-full hover:bg-gray-800"
          style={{ fontFamily: 'Inter', fontWeight: 500 }}
        >
          Share with my Ally
        </button>
      </div>

      {/* Home indicator */}
      <div className="flex justify-center pb-2">
        <div className="w-32 h-1 bg-black rounded-full"></div>
      </div>
    </div>
  );
}