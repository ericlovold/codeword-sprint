import { X, Phone, MessageSquare } from 'lucide-react';
import { SimpleArrowRight } from './SimpleArrowRight';

interface LifelinePopupProps {
  isOpen: boolean;
  onClose: () => void;
}

export function LifelinePopup({ isOpen, onClose }: LifelinePopupProps) {
  if (!isOpen) return null;

  const handleCall = () => {
    window.location.href = 'tel:988';
    onClose();
  };

  const handleText = () => {
    window.location.href = 'sms:988';
    onClose();
  };

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div 
      className="fixed inset-0 flex items-center justify-center z-50 p-4"
      style={{ backgroundColor: 'rgba(100, 41, 117, 0.9)' }}
      onClick={handleBackdropClick}
    >
      <div className="bg-white rounded-2xl max-w-sm w-full p-6 relative">
        {/* Close button */}
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 p-1 hover:bg-gray-100 rounded-full transition-colors"
        >
          <X size={20} className="text-gray-600" />
        </button>

        {/* Header */}
        <div className="mb-6 pr-8">
          <h2 className="text-xl font-medium text-black chat-text mb-2">
            Contact 988 Lifeline
          </h2>
          <p className="text-gray-600 chat-text">
            Choose how you'd like to connect with a crisis counselor
          </p>
        </div>

        {/* Action buttons */}
        <div className="space-y-3">
          {/* Call button */}
          <button
            onClick={handleCall}
            className="w-full flex items-center justify-between p-3 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors"
          >
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-full flex items-center justify-center bg-gray-100">
                <Phone size={18} style={{ color: '#642975' }} />
              </div>
              <div className="text-left">
                <h4 className="text-sm text-gray-900 chat-text" style={{ fontWeight: 500 }}>
                  Call 988
                </h4>
                <p className="text-xs text-gray-500 chat-text">
                  Talk to a counselor
                </p>
              </div>
            </div>
            <SimpleArrowRight size={16} color="#9CA3AF" />
          </button>

          {/* Text button */}
          <button
            onClick={handleText}
            className="w-full flex items-center justify-between p-3 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors"
          >
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-full flex items-center justify-center bg-gray-100">
                <MessageSquare size={18} style={{ color: '#642975' }} />
              </div>
              <div className="text-left">
                <h4 className="text-sm text-gray-900 chat-text" style={{ fontWeight: 500 }}>
                  Text 988
                </h4>
                <p className="text-xs text-gray-500 chat-text">
                  Chat via text messages
                </p>
              </div>
            </div>
            <SimpleArrowRight size={16} color="#9CA3AF" />
          </button>
        </div>

        {/* Info text */}
        <div className="mt-4 text-center">
          <p className="text-xs text-gray-500 chat-text">
            24/7 confidential support for people in distress
          </p>
        </div>
      </div>
    </div>
  );
}