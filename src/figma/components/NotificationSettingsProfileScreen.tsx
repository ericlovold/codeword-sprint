import { StandardHeader } from './BackArrow';
import Rectangle25 from '../imports/Rectangle25';
import { Bell, Smartphone, Volume2, Vibrate } from 'lucide-react';
import aiTipsIcon from 'figma:asset/b063168647014d3947ae820f6953f5b849fd6bad.png';

interface NotificationSettingsProfileScreenProps {
  onBack: () => void;
}

export function NotificationSettingsProfileScreen({
  onBack,
}: NotificationSettingsProfileScreenProps) {
  return (
    <div className="size-full flex flex-col relative">
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

      {/* Header */}
      <StandardHeader onBack={onBack} />

      {/* Content */}
      <div className="relative z-10 flex-1 px-6 py-8 overflow-y-auto">
        <div className="max-w-md mx-auto space-y-6">
          {/* Title */}
          <div className="text-center mb-8">
            <h1 className="text-2xl text-black chat-text" style={{ fontWeight: 600 }}>
              Notifications
            </h1>
            <p className="text-gray-600 mt-2 chat-text">Manage your notification preferences</p>
          </div>

          {/* Codeword Alerts */}
          <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-100">
            <h3 className="text-lg text-gray-900 mb-4 chat-text" style={{ fontWeight: 500 }}>
              Codeword Alerts
            </h3>

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 rounded-full flex items-center justify-center bg-gray-100">
                    <Bell size={18} style={{ color: '#642975' }} />
                  </div>
                  <div>
                    <h4 className="text-sm text-gray-900 chat-text" style={{ fontWeight: 500 }}>
                      Push Notifications
                    </h4>
                    <p className="text-xs text-gray-500 chat-text">
                      Receive alerts when allies send their Codeword
                    </p>
                  </div>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" className="sr-only peer" defaultChecked />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#642975]"></div>
                </label>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 rounded-full flex items-center justify-center bg-gray-100">
                    <Smartphone size={18} style={{ color: '#642975' }} />
                  </div>
                  <div>
                    <h4 className="text-sm text-gray-900 chat-text" style={{ fontWeight: 500 }}>
                      Critical Alerts
                    </h4>
                    <p className="text-xs text-gray-500 chat-text">
                      Override Do Not Disturb for emergency alerts
                    </p>
                  </div>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" className="sr-only peer" defaultChecked />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#642975]"></div>
                </label>
              </div>
            </div>
          </div>

          {/* General Notifications */}
          <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-100">
            <h3 className="text-lg text-gray-900 mb-4 chat-text" style={{ fontWeight: 500 }}>
              General Notifications
            </h3>

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 rounded-full flex items-center justify-center bg-gray-100">
                    <Bell size={18} style={{ color: '#642975' }} />
                  </div>
                  <div>
                    <h4 className="text-sm text-gray-900 chat-text" style={{ fontWeight: 500 }}>
                      App Updates
                    </h4>
                    <p className="text-xs text-gray-500 chat-text">
                      Get notified about new features and updates
                    </p>
                  </div>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" className="sr-only peer" defaultChecked />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#642975]"></div>
                </label>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 rounded-full flex items-center justify-center bg-gray-100">
                    <img
                      src={aiTipsIcon}
                      alt="AI Tips & Resources"
                      className="w-5 h-5 object-contain"
                    />
                  </div>
                  <div>
                    <h4 className="text-sm text-gray-900 chat-text" style={{ fontWeight: 500 }}>
                      Ai Tips & Resources
                    </h4>
                    <p className="text-xs text-gray-500 chat-text">
                      Receive helpful tips and Ai coaching resources
                    </p>
                  </div>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" className="sr-only peer" />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#642975]"></div>
                </label>
              </div>
            </div>
          </div>

          {/* Alert Settings */}
          <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-100">
            <h3 className="text-lg text-gray-900 mb-4 chat-text" style={{ fontWeight: 500 }}>
              Alert Settings
            </h3>

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 rounded-full flex items-center justify-center bg-gray-100">
                    <Volume2 size={18} style={{ color: '#642975' }} />
                  </div>
                  <div>
                    <h4 className="text-sm text-gray-900 chat-text" style={{ fontWeight: 500 }}>
                      Sound
                    </h4>
                    <p className="text-xs text-gray-500 chat-text">Play sound for notifications</p>
                  </div>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" className="sr-only peer" defaultChecked />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#642975]"></div>
                </label>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 rounded-full flex items-center justify-center bg-gray-100">
                    <Vibrate size={18} style={{ color: '#642975' }} />
                  </div>
                  <div>
                    <h4 className="text-sm text-gray-900 chat-text" style={{ fontWeight: 500 }}>
                      Vibration
                    </h4>
                    <p className="text-xs text-gray-500 chat-text">Vibrate for notifications</p>
                  </div>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" className="sr-only peer" defaultChecked />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#642975]"></div>
                </label>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
