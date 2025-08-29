import { X } from 'lucide-react';

interface CodewordWarningPopupProps {
  isOpen: boolean;
  onClose: () => void;
  onSetupCodeword: () => void;
}

export function CodewordWarningPopup({ isOpen, onClose, onSetupCodeword }: CodewordWarningPopupProps) {
  if (!isOpen) return null;

  const handleSetupCodeword = () => {
    onClose();
    onSetupCodeword();
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center"
      style={{ backgroundColor: 'rgba(197, 62, 92, 0.9)' }}
      onClick={onClose}
    >
      
      {/* Modal */}
      <div 
        className="relative bg-white rounded-2xl mx-4 w-full max-w-sm overflow-hidden shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-100">
          <h2 className="text-lg font-medium text-gray-900 chat-text">
            Codeword Not Set Up
          </h2>
          <button
            onClick={onClose}
            className="p-1 rounded-full hover:bg-gray-100 transition-colors"
          >
            <X size={20} className="text-gray-500" />
          </button>
        </div>
        
        {/* Content */}
        <div className="p-6">
          <p className="text-gray-700 chat-text mb-6 leading-relaxed">
            You haven't set up a codeword with an ally yet. Please finish setting up your codeword.
          </p>
          
          {/* Action Buttons */}
          <div className="space-y-3">
            <button
              onClick={handleSetupCodeword}
              className="w-full py-3 px-4 rounded-full font-medium chat-text text-white transition-colors hover:opacity-90"
              style={{ backgroundColor: '#642975' }}
            >
              Set Up Codeword
            </button>
            
            <button
              onClick={onClose}
              className="w-full py-3 px-4 bg-gray-100 text-gray-700 rounded-full font-medium chat-text transition-colors hover:bg-gray-200"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}