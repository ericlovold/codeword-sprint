import { StandardHeader } from './BackArrow';
import Rectangle25 from '../imports/Rectangle25';
import { Shield, Lock, Eye, Smartphone, Key, AlertTriangle } from 'lucide-react';

interface PrivacySecurityScreenProps {
  onBack: () => void;
}

export function PrivacySecurityScreen({ onBack }: PrivacySecurityScreenProps) {
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
              Privacy & Security
            </h1>
            <p className="text-gray-600 mt-2 chat-text">
              Manage your privacy and security settings
            </p>
          </div>

          {/* Security Section */}
          <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-100">
            <h3 className="text-lg text-gray-900 mb-4 chat-text" style={{ fontWeight: 500 }}>
              Security
            </h3>

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 rounded-full flex items-center justify-center bg-gray-100">
                    <Lock size={18} style={{ color: '#642975' }} />
                  </div>
                  <div>
                    <h4 className="text-sm text-gray-900 chat-text" style={{ fontWeight: 500 }}>
                      Change Password
                    </h4>
                    <p className="text-xs text-gray-500 chat-text">Update your account password</p>
                  </div>
                </div>
                <button className="text-sm" style={{ color: '#642975', fontWeight: 500 }}>
                  Change
                </button>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 rounded-full flex items-center justify-center bg-gray-100">
                    <Smartphone size={18} style={{ color: '#642975' }} />
                  </div>
                  <div>
                    <h4 className="text-sm text-gray-900 chat-text" style={{ fontWeight: 500 }}>
                      Two-Factor Authentication
                    </h4>
                    <p className="text-xs text-gray-500 chat-text">
                      Add extra security to your account
                    </p>
                  </div>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" className="sr-only peer" />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#642975]"></div>
                </label>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 rounded-full flex items-center justify-center bg-gray-100">
                    <Key size={18} style={{ color: '#642975' }} />
                  </div>
                  <div>
                    <h4 className="text-sm text-gray-900 chat-text" style={{ fontWeight: 500 }}>
                      Login Sessions
                    </h4>
                    <p className="text-xs text-gray-500 chat-text">
                      View and manage active sessions
                    </p>
                  </div>
                </div>
                <button className="text-sm" style={{ color: '#642975', fontWeight: 500 }}>
                  Manage
                </button>
              </div>
            </div>
          </div>

          {/* Privacy Section */}
          <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-100">
            <h3 className="text-lg text-gray-900 mb-4 chat-text" style={{ fontWeight: 500 }}>
              Privacy
            </h3>

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 rounded-full flex items-center justify-center bg-gray-100">
                    <Eye size={18} style={{ color: '#642975' }} />
                  </div>
                  <div>
                    <h4 className="text-sm text-gray-900 chat-text" style={{ fontWeight: 500 }}>
                      Data Sharing
                    </h4>
                    <p className="text-xs text-gray-500 chat-text">
                      Control how your data is shared
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
                    <Shield size={18} style={{ color: '#642975' }} />
                  </div>
                  <div>
                    <h4 className="text-sm text-gray-900 chat-text" style={{ fontWeight: 500 }}>
                      Analytics & Crash Reports
                    </h4>
                    <p className="text-xs text-gray-500 chat-text">Help improve the app</p>
                  </div>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" className="sr-only peer" defaultChecked />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#642975]"></div>
                </label>
              </div>
            </div>
          </div>

          {/* Data Management */}
          <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-100">
            <h3 className="text-lg text-gray-900 mb-4 chat-text" style={{ fontWeight: 500 }}>
              Data Management
            </h3>

            <div className="space-y-4">
              <button className="w-full flex items-center justify-between p-3 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors">
                <div className="flex items-center space-x-3">
                  <div className="text-left">
                    <h4 className="text-sm text-gray-900 chat-text" style={{ fontWeight: 500 }}>
                      Download Your Data
                    </h4>
                    <p className="text-xs text-gray-500 chat-text">Get a copy of your data</p>
                  </div>
                </div>
              </button>

              <button className="w-full flex items-center justify-between p-3 rounded-lg border border-red-200 hover:bg-red-50 transition-colors">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 rounded-full flex items-center justify-center bg-red-100">
                    <AlertTriangle size={16} className="text-red-600" />
                  </div>
                  <div className="text-left">
                    <h4 className="text-sm text-red-600 chat-text" style={{ fontWeight: 500 }}>
                      Delete Account
                    </h4>
                    <p className="text-xs text-red-400 chat-text">
                      Permanently delete your account
                    </p>
                  </div>
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
