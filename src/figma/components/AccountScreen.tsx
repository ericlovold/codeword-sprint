import { User, Mail, Phone, Calendar, Shield, Bell } from 'lucide-react';
import { StickyHeader } from './StickyHeader';

interface AccountScreenProps {
  onBackToChat: () => void;
}

export function AccountScreen({ onBackToChat }: AccountScreenProps) {
  return (
    <div className="h-full flex flex-col relative overflow-hidden">
      <StickyHeader />
      
      {/* Main content area with same gradient background as chat */}
      <div 
        className="flex-1 flex flex-col relative overflow-hidden"
        style={{
          background: `linear-gradient(to bottom, 
            rgba(100, 41, 117, 0.1) 0%, 
            rgba(100, 41, 117, 0.05) 50%, 
            rgba(100, 41, 117, 0.1) 100%)`
        }}
      >
        {/* Header */}
        <div className="bg-white/90 backdrop-blur-sm border-b border-gray-200 p-4">
          <div className="flex items-center justify-center">
            <h1 className="text-xl font-semibold text-gray-800 chat-text">Account</h1>
          </div>
        </div>

        {/* Account content */}
        <div className="flex-1 overflow-y-auto p-4">
          <div className="max-w-md mx-auto space-y-6">
            
            {/* Profile Section */}
            <div className="bg-white/90 backdrop-blur-sm rounded-lg p-6 shadow-sm border border-gray-200">
              <div className="flex items-center gap-4 mb-6">
                <div 
                  className="w-16 h-16 rounded-full flex items-center justify-center text-white"
                  style={{ backgroundColor: '#642975' }}
                >
                  <User size={24} />
                </div>
                <div>
                  <h2 className="text-lg font-semibold text-gray-800 chat-text">Eric Thompson</h2>
                  <p className="text-gray-600 chat-text">Premium Member</p>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <label htmlFor="email" className="block text-gray-700 chat-text mb-1">Email</label>
                  <div className="flex items-center gap-2">
                    <Mail size={16} className="text-gray-500" />
                    <input
                      id="email"
                      type="email"
                      value="eric.thompson@email.com"
                      className="flex-1 px-3 py-2 bg-gray-50 border border-gray-300 rounded-md chat-text"
                      readOnly
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="phone" className="block text-gray-700 chat-text mb-1">Phone</label>
                  <div className="flex items-center gap-2">
                    <Phone size={16} className="text-gray-500" />
                    <input
                      id="phone"
                      type="tel"
                      value="+1 (555) 123-4567"
                      className="flex-1 px-3 py-2 bg-gray-50 border border-gray-300 rounded-md chat-text"
                      readOnly
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="joined" className="block text-gray-700 chat-text mb-1">Member Since</label>
                  <div className="flex items-center gap-2">
                    <Calendar size={16} className="text-gray-500" />
                    <span className="text-gray-600 chat-text pl-2">January 15, 2024</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Account Settings */}
            <div className="bg-white/90 backdrop-blur-sm rounded-lg p-6 shadow-sm border border-gray-200">
              <h3 className="text-lg font-semibold text-gray-800 mb-4 chat-text">Settings</h3>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between py-2">
                  <div className="flex items-center gap-3">
                    <Bell size={18} className="text-gray-500" />
                    <span className="text-gray-700 chat-text">Push Notifications</span>
                  </div>
                  <div 
                    className="w-12 h-6 rounded-full flex items-center px-1"
                    style={{ backgroundColor: '#642975' }}
                  >
                    <div className="w-4 h-4 bg-white rounded-full ml-auto"></div>
                  </div>
                </div>

                <div className="flex items-center justify-between py-2">
                  <div className="flex items-center gap-3">
                    <Shield size={18} className="text-gray-500" />
                    <span className="text-gray-700 chat-text">Crisis Mode</span>
                  </div>
                  <div className="w-12 h-6 bg-gray-300 rounded-full flex items-center px-1">
                    <div className="w-4 h-4 bg-white rounded-full"></div>
                  </div>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-3">
              <button 
                className="w-full py-3 px-4 rounded-md text-white chat-text hover:opacity-90 transition-opacity"
                style={{ backgroundColor: '#642975' }}
              >
                Edit Profile
              </button>
              
              <button 
                className="w-full py-3 px-4 rounded-md border border-gray-300 text-gray-700 chat-text hover:bg-gray-50 transition-colors"
              >
                Change Password
              </button>
              
              <button 
                className="w-full py-3 px-4 rounded-md border border-red-300 text-red-600 hover:bg-red-50 chat-text transition-colors"
              >
                Delete Account
              </button>
            </div>

            {/* Support */}
            <div className="bg-white/90 backdrop-blur-sm rounded-lg p-6 shadow-sm border border-gray-200">
              <h3 className="text-lg font-semibold text-gray-800 mb-4 chat-text">Support</h3>
              <div className="space-y-3">
                <button className="w-full text-left py-2 text-gray-700 hover:text-gray-900 transition-colors chat-text">
                  Help Center
                </button>
                <button className="w-full text-left py-2 text-gray-700 hover:text-gray-900 transition-colors chat-text">
                  Contact Support
                </button>
                <button className="w-full text-left py-2 text-gray-700 hover:text-gray-900 transition-colors chat-text">
                  Privacy Policy
                </button>
                <button className="w-full text-left py-2 text-gray-700 hover:text-gray-900 transition-colors chat-text">
                  Terms of Service
                </button>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}