import { StickyHeader } from './StickyHeader';
import { Settings, User, Bell, Shield, HelpCircle, LogOut, ChevronRight } from 'lucide-react';

interface ProfileScreenProps {
  onNavigateToPersonalInfo: () => void;
  onNavigateToNotifications: () => void;
  onNavigateToPrivacySecurity: () => void;
  onNavigateToHelpSupport: () => void;
  onNavigateToAppSettings: () => void;
  onSignOut: () => void;
}

export function ProfileScreen({ 
  onNavigateToPersonalInfo,
  onNavigateToNotifications,
  onNavigateToPrivacySecurity,
  onNavigateToHelpSupport,
  onNavigateToAppSettings,
  onSignOut
}: ProfileScreenProps) {
  const settingsItems = [
    {
      icon: User,
      label: 'Personal Information',
      description: 'Manage your profile details',
      onClick: onNavigateToPersonalInfo
    },
    {
      icon: Bell,
      label: 'Notifications',
      description: 'Customize your notification preferences',
      onClick: onNavigateToNotifications
    },
    {
      icon: Shield,
      label: 'Privacy & Security',
      description: 'Control your privacy settings',
      onClick: onNavigateToPrivacySecurity
    },
    {
      icon: HelpCircle,
      label: 'Help & Support',
      description: 'Get help and contact support',
      onClick: onNavigateToHelpSupport
    }
  ];

  return (
    <div className="h-full flex flex-col">
      <StickyHeader />
      
      {/* Main content area */}
      <div className="flex-1 px-6 py-6 bg-gradient-to-b from-purple-50 to-white overflow-y-auto">
        <div className="max-w-md mx-auto space-y-6">
          {/* Profile Header */}
          <div className="text-center space-y-4">
            <div>
              <h1 className="text-2xl font-medium text-gray-900 chat-text">Profile Settings</h1>
              <p className="text-sm text-gray-600 chat-text">Manage your account and preferences</p>
            </div>
          </div>

          {/* Settings Menu */}
          <div className="space-y-3">
            {settingsItems.map((item, index) => {
              const IconComponent = item.icon;
              return (
                <button
                  key={index}
                  onClick={item.onClick}
                  className="w-full bg-white rounded-lg py-5 px-4 shadow-sm border border-gray-100 hover:shadow-md transition-shadow flex items-center justify-between group"
                >
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ backgroundColor: '#f3f4f6' }}>
                      <IconComponent size={18} style={{ color: '#642975' }} />
                    </div>
                    <div className="text-left">
                      <h3 className="text-sm font-medium text-gray-900 chat-text">{item.label}</h3>
                      <p className="text-xs text-gray-500 chat-text">{item.description}</p>
                    </div>
                  </div>
                  <ChevronRight size={16} className="text-gray-400 group-hover:text-gray-600 transition-colors" />
                </button>
              );
            })}
          </div>

          {/* Account Actions */}
          <div className="space-y-3 pt-4 border-t border-gray-100">
            <button 
              onClick={onNavigateToAppSettings}
              className="w-full bg-white rounded-lg py-5 px-4 shadow-sm border border-gray-100 hover:shadow-md transition-shadow flex items-center justify-between group"
            >
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ backgroundColor: '#f3f4f6' }}>
                  <Settings size={18} style={{ color: '#642975' }} />
                </div>
                <div className="text-left">
                  <h3 className="text-sm font-medium text-gray-900 chat-text">App Settings</h3>
                  <p className="text-xs text-gray-500 chat-text">Customize app behavior</p>
                </div>
              </div>
              <ChevronRight size={16} className="text-gray-400 group-hover:text-gray-600 transition-colors" />
            </button>

            <button 
              onClick={onSignOut}
              className="w-full bg-white rounded-lg py-5 px-4 shadow-sm border border-red-100 hover:shadow-md transition-shadow flex items-center justify-between group"
            >
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-full flex items-center justify-center bg-red-50">
                  <LogOut size={18} className="text-red-600" />
                </div>
                <div className="text-left">
                  <h3 className="text-sm font-medium text-red-600 chat-text">Sign Out</h3>
                  <p className="text-xs text-red-400 chat-text">Sign out of your account</p>
                </div>
              </div>
              <ChevronRight size={16} className="text-red-400 group-hover:text-red-600 transition-colors" />
            </button>
          </div>

          {/* App Info */}
          <div className="bg-gray-50 rounded-lg p-4 text-center">
            <p className="text-xs text-gray-500 chat-text">Codeword Technologies</p>
            <p className="text-xs text-gray-400 chat-text">Version 1.0.0</p>
          </div>
        </div>
      </div>
    </div>
  );
}