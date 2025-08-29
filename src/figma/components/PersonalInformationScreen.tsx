import { StandardHeader } from './BackArrow';
import Rectangle25 from '../imports/Rectangle25';
import { User, Camera } from 'lucide-react';

interface PersonalInformationScreenProps {
  onBack: () => void;
}

export function PersonalInformationScreen({ onBack }: PersonalInformationScreenProps) {
  return (
    <div className="size-full flex flex-col relative">
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

      {/* Header */}
      <StandardHeader onBack={onBack} />

      {/* Content */}
      <div className="relative z-10 flex-1 px-6 py-8 overflow-y-auto">
        <div className="max-w-md mx-auto space-y-6">
          {/* Title */}
          <div className="text-center mb-8">
            <h1 className="text-2xl text-black chat-text" style={{ fontWeight: 600 }}>
              Personal Information
            </h1>
            <p className="text-gray-600 mt-2 chat-text">
              Update your profile details
            </p>
          </div>

          {/* Profile Photo */}
          <div className="text-center mb-8">
            <div className="inline-block relative">
              <div className="w-24 h-24 rounded-full flex items-center justify-center shadow-lg mx-auto" style={{ backgroundColor: '#642975' }}>
                <User size={40} className="text-white" />
              </div>
              <button className="absolute bottom-0 right-0 w-8 h-8 rounded-full bg-white shadow-lg flex items-center justify-center border-2 border-gray-100 hover:bg-gray-50 transition-colors">
                <Camera size={16} className="text-gray-600" />
              </button>
            </div>
          </div>

          {/* Form Fields */}
          <div className="space-y-4">
            <div>
              <label className="block text-black chat-text font-medium mb-2">
                Full Name
              </label>
              <input
                type="text"
                defaultValue="Your Name"
                className="w-full px-4 py-3 bg-white chat-text text-black placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-[#642975]"
                placeholder="Enter your full name"
              />
            </div>

            <div>
              <label className="block text-black chat-text font-medium mb-2">
                Email Address
              </label>
              <input
                type="email"
                defaultValue="your.email@example.com"
                className="w-full px-4 py-3 bg-white chat-text text-black placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-[#642975]"
                placeholder="Enter your email"
              />
            </div>

            <div>
              <label className="block text-black chat-text font-medium mb-2">
                Phone Number
              </label>
              <input
                type="tel"
                defaultValue="+1 (555) 123-4567"
                className="w-full px-4 py-3 bg-white chat-text text-black placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-[#642975]"
                placeholder="Enter your phone number"
              />
            </div>

            <div>
              <label className="block text-black chat-text font-medium mb-2">
                Date of Birth
              </label>
              <input
                type="date"
                className="w-full px-4 py-3 bg-white chat-text text-black placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-[#642975]"
              />
            </div>
          </div>

          {/* Save Button */}
          <div className="pt-6">
            <button 
              className="w-full py-4 rounded-full bg-black text-white hover:bg-gray-800 transition-colors chat-text font-medium"
            >
              Save Changes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}