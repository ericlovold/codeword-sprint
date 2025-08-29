import { StandardHeader } from './BackArrow';
import Rectangle25 from '../imports/Rectangle25';
import { Settings, Globe, Smartphone, RefreshCw } from 'lucide-react';

interface AppSettingsScreenProps {
  onBack: () => void;
}

export function AppSettingsScreen({ onBack }: AppSettingsScreenProps) {
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

      {/* Header */}
      <StandardHeader onBack={onBack} />

      {/* Content */}
      <div className="relative z-10 flex-1 px-6 py-8 overflow-hidden">
        <div className="max-w-md mx-auto h-full flex flex-col">
          {/* Title */}
          <div className="text-center mb-8 shrink-0">
            <h1 className="text-2xl text-black chat-text" style={{ fontWeight: 600 }}>
              App Settings
            </h1>
          </div>

          {/* Settings Content - Fixed to available space */}
          <div className="flex-1 space-y-6 overflow-hidden">
            {/* Appearance Section */}
            <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-100">
              <h3 className="text-lg text-gray-900 mb-4 chat-text" style={{ fontWeight: 500 }}>
                Appearance
              </h3>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 rounded-full flex items-center justify-center bg-gray-100">
                      <Globe size={18} style={{ color: '#642975' }} />
                    </div>
                    <div>
                      <h4 className="text-sm text-gray-900 chat-text" style={{ fontWeight: 500 }}>
                        Language
                      </h4>
                      <p className="text-xs text-gray-500 chat-text">
                        Change app language
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-1">
                    <span className="text-sm text-gray-600 chat-text">English</span>
                    <Settings size={16} className="text-gray-400" />
                  </div>
                </div>
              </div>
            </div>

            {/* Data & Storage */}
            <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-100">
              <h3 className="text-lg text-gray-900 mb-4 chat-text" style={{ fontWeight: 500 }}>
                Data & Storage
              </h3>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 rounded-full flex items-center justify-center bg-gray-100">
                      <Smartphone size={18} style={{ color: '#642975' }} />
                    </div>
                    <div>
                      <h4 className="text-sm text-gray-900 chat-text" style={{ fontWeight: 500 }}>
                        Auto-sync
                      </h4>
                      <p className="text-xs text-gray-500 chat-text">
                        Sync data across devices
                      </p>
                    </div>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" className="sr-only peer" defaultChecked />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#642975]"></div>
                  </label>
                </div>

                <button className="w-full flex items-center justify-between p-3 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 rounded-full flex items-center justify-center bg-gray-100">
                      <RefreshCw size={16} style={{ color: '#642975' }} />
                    </div>
                    <div className="text-left">
                      <h4 className="text-sm text-gray-900 chat-text" style={{ fontWeight: 500 }}>
                        Clear Cache
                      </h4>
                      <p className="text-xs text-gray-500 chat-text">
                        Free up storage space
                      </p>
                    </div>
                  </div>
                  <span className="text-xs text-gray-400 chat-text">2.3 MB</span>
                </button>
              </div>
            </div>

            {/* Advanced Settings */}
            <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-100">
              <h3 className="text-lg text-gray-900 mb-4 chat-text" style={{ fontWeight: 500 }}>
                Advanced
              </h3>
              
              <div className="space-y-3">
                <button className="w-full flex items-center justify-between p-3 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors">
                  <div className="text-left">
                    <h4 className="text-sm text-gray-900 chat-text" style={{ fontWeight: 500 }}>
                      Reset App Settings
                    </h4>
                    <p className="text-xs text-gray-500 chat-text">
                      Restore default settings
                    </p>
                  </div>
                </button>

                <button className="w-full flex items-center justify-between p-3 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors">
                  <div className="text-left">
                    <h4 className="text-sm text-gray-900 chat-text" style={{ fontWeight: 500 }}>
                      Export Settings
                    </h4>
                    <p className="text-xs text-gray-500 chat-text">
                      Backup your preferences
                    </p>
                  </div>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}