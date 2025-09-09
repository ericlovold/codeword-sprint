import { useState } from 'react';
import { StandardHeader } from './BackArrow';
import Rectangle25 from '../imports/Rectangle25';

interface YourInfoScreenProps {
  onContinue: () => void;
  onBack: () => void;
}

export function YourInfoScreen({ onContinue, onBack }: YourInfoScreenProps) {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    dateOfBirth: '',
    isVeteran: true as boolean | null,
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleVeteranSelect = (isVeteran: boolean) => {
    setFormData((prev) => ({
      ...prev,
      isVeteran,
    }));
  };

  const isFormValid =
    formData.firstName.trim() !== '' &&
    formData.lastName.trim() !== '' &&
    formData.email.trim() !== '' &&
    formData.phone.trim() !== '';

  const handleSubmit = () => {
    if (isFormValid) {
      onContinue();
    }
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

      {/* Scrollable Content */}
      <div className="relative z-10 flex-1 overflow-y-auto">
        <div className="px-6 py-6">
          <div className="mb-8">
            <h1 className="text-3xl font-medium text-black chat-text mb-4">Your Info</h1>
            <p className="text-gray-600 chat-text text-lg">
              We need a few pieces of information to finish setting up your account.
            </p>
          </div>

          <div className="space-y-3">
            {/* First Name */}
            <div>
              <label className="block text-black chat-text font-medium mb-2">First Name *</label>
              <input
                type="text"
                value={formData.firstName}
                onChange={(e) => handleInputChange('firstName', e.target.value)}
                className="w-full px-4 py-3 bg-white chat-text text-black placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-[#642975]"
                placeholder="Enter your first name"
              />
            </div>

            {/* Last Name */}
            <div>
              <label className="block text-black chat-text font-medium mb-2">Last Name *</label>
              <input
                type="text"
                value={formData.lastName}
                onChange={(e) => handleInputChange('lastName', e.target.value)}
                className="w-full px-4 py-3 bg-white chat-text text-black placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-[#642975]"
                placeholder="Enter your last name"
              />
            </div>

            {/* Email */}
            <div>
              <label className="block text-black chat-text font-medium mb-2">Email Address *</label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
                className="w-full px-4 py-3 bg-white chat-text text-black placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-[#642975]"
                placeholder="Enter your email address"
              />
            </div>

            {/* Phone */}
            <div>
              <label className="block text-black chat-text font-medium mb-2">Phone Number *</label>
              <input
                type="tel"
                value={formData.phone}
                onChange={(e) => handleInputChange('phone', e.target.value)}
                className="w-full px-4 py-3 bg-white chat-text text-black placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-[#642975]"
                placeholder="Enter your phone number"
              />
            </div>

            {/* Date of Birth */}
            <div>
              <label className="block text-black chat-text font-medium mb-2">Date of Birth</label>
              <input
                type="date"
                value={formData.dateOfBirth}
                onChange={(e) => handleInputChange('dateOfBirth', e.target.value)}
                className="w-full px-4 py-3 bg-white chat-text text-black placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-[#642975]"
              />
            </div>

            {/* Veteran Status */}
            <div>
              <label className="block text-black chat-text font-medium mb-4">
                Are you a veteran?
              </label>
              <div className="flex gap-4">
                <button
                  type="button"
                  onClick={() => handleVeteranSelect(true)}
                  className={`flex-1 py-4 px-6 rounded-full transition-all chat-text font-medium ${
                    formData.isVeteran === true
                      ? 'bg-black text-white'
                      : 'bg-white text-gray-600 border border-gray-200 hover:bg-gray-50'
                  }`}
                >
                  Yes
                </button>
                <button
                  type="button"
                  onClick={() => handleVeteranSelect(false)}
                  className={`flex-1 py-4 px-6 rounded-full transition-all chat-text font-medium ${
                    formData.isVeteran === false
                      ? 'bg-black text-white'
                      : 'bg-white text-gray-600 border border-gray-200 hover:bg-gray-50'
                  }`}
                >
                  No
                </button>
              </div>
            </div>

            <div className="text-sm text-gray-500 chat-text">* Required fields</div>
          </div>
        </div>
      </div>

      {/* Fixed Continue button */}
      <div className="relative z-10 px-6 py-6 shrink-0">
        <button
          onClick={handleSubmit}
          disabled={!isFormValid}
          className={`w-full h-14 font-medium chat-text rounded-full transition-all ${
            isFormValid
              ? 'bg-black text-white hover:bg-gray-800'
              : 'bg-gray-300 text-gray-500 cursor-not-allowed'
          }`}
        >
          Continue
        </button>
      </div>
    </div>
  );
}
