import { useState } from 'react';
import { StandardHeader } from './BackArrow';
import Rectangle25 from '../imports/Rectangle25';

interface NotificationSettingsScreenProps {
  onContinue: () => void;
  onBack: () => void;
}

export function NotificationSettingsScreen({ onContinue, onBack }: NotificationSettingsScreenProps) {
  const [notificationsEnabled, setNotificationsEnabled] = useState(false);
  const [criticalAlertsEnabled, setCriticalAlertsEnabled] = useState(false);

  const handleEnableNotifications = () => {
    // In a real app, this would request notification permissions
    setNotificationsEnabled(true);
  };

  const handleEnableCriticalAlerts = () => {
    // In a real app, this would request critical alerts permission
    setCriticalAlertsEnabled(true);
  };

  const canContinue = notificationsEnabled && criticalAlertsEnabled;

  return (
    <div className="size-full flex flex-col relative overflow-hidden">
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

      {/* Header with back arrow */}
      <StandardHeader onBack={onBack} />

      {/* Content */}
      <div className="relative z-10 flex-1 flex flex-col justify-between px-6 pb-8">
        <div className="flex-1 flex flex-col justify-center max-w-md mx-auto w-full">
          {/* Title */}
          <h1 className="text-4xl font-medium text-black chat-text mb-6 text-center">
            Enable Critical Alerts
          </h1>

          {/* Description */}
          <p className="text-gray-600 chat-text text-center mb-8 leading-relaxed">
            To ensure your Codeword reaches your allies even when their phones are on Do Not Disturb, 
            we need to enable critical alerts and notifications.
          </p>

          {/* Notification Settings */}
          <div className="space-y-4 mb-8">
            {/* Regular Notifications */}
            <div className="bg-white rounded-2xl p-6 shadow-sm">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-lg font-medium text-black chat-text">
                  Allow Notifications
                </h3>
                <div className={`w-6 h-6 rounded-full border flex items-center justify-center ${
                  notificationsEnabled 
                    ? 'bg-[#642975] border-[#642975]' 
                    : 'border-gray-300'
                }`}>
                  {notificationsEnabled && (
                    <svg width="14" height="10" viewBox="0 0 14 10" fill="none">
                      <path d="M1 5L5 9L13 1" stroke="white" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  )}
                </div>
              </div>
              <p className="text-sm text-gray-600 chat-text mb-4">
                Receive notifications when allies send their Codeword
              </p>
              {!notificationsEnabled && (
                <button
                  onClick={handleEnableNotifications}
                  className="w-full h-12 bg-[#642975] text-white font-medium chat-text rounded-full transition-all hover:opacity-90"
                >
                  Enable Notifications
                </button>
              )}
            </div>

            {/* Critical Alerts */}
            <div className="bg-white rounded-2xl p-6 shadow-sm">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-lg font-medium text-black chat-text">
                  Critical Alerts
                </h3>
                <div className={`w-6 h-6 rounded-full border flex items-center justify-center ${
                  criticalAlertsEnabled 
                    ? 'bg-[#642975] border-[#642975]' 
                    : 'border-gray-300'
                }`}>
                  {criticalAlertsEnabled && (
                    <svg width="14" height="10" viewBox="0 0 14 10" fill="none">
                      <path d="M1 5L5 9L13 1" stroke="white" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  )}
                </div>
              </div>
              <p className="text-sm text-gray-600 chat-text mb-4">
                Override Do Not Disturb for emergency Codeword alerts
              </p>
              {!criticalAlertsEnabled && (
                <button
                  onClick={handleEnableCriticalAlerts}
                  disabled={!notificationsEnabled}
                  className="w-full h-12 bg-[#642975] text-white font-medium chat-text rounded-full transition-all hover:opacity-90 disabled:bg-gray-400 disabled:cursor-not-allowed"
                >
                  Enable Critical Alerts
                </button>
              )}
            </div>
          </div>

          {/* Info Note */}
          <div className="mb-6">
            <p className="text-sm text-gray-500 chat-text text-center">
              You can change these settings anytime in your device's Settings app
            </p>
          </div>
        </div>

        {/* Continue Button */}
        <button
          onClick={onContinue}
          disabled={!canContinue}
          className="w-full h-14 bg-black text-white font-medium chat-text rounded-full transition-all hover:bg-gray-800 disabled:bg-gray-400 disabled:cursor-not-allowed"
        >
          Continue
        </button>
      </div>
    </div>
  );
}