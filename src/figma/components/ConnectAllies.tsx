import { useState } from 'react';
import { StandardHeader } from './BackArrow';
import Rectangle25 from '../imports/Rectangle25';
import { ContactsPermissionDialog } from './ContactsPermissionDialog';
import networkIllustration from 'figma:asset/c4431d68521a9e24b1fefef0c704ac3dc936e6de.png';

interface ConnectAlliesProps {
  onContinue: () => void;
  onBack: () => void;
}

export function ConnectAllies({ onContinue, onBack }: ConnectAlliesProps) {
  const [showPermissionDialog, setShowPermissionDialog] = useState(false);

  const handleAllowAccess = () => {
    setShowPermissionDialog(true);
  };

  const handlePermissionAllow = () => {
    setShowPermissionDialog(false);
    // In a real app, this would request contact permissions
    onContinue();
  };

  const handlePermissionDeny = () => {
    setShowPermissionDialog(false);
    // User denied access, stay on current screen
  };

  return (
    <div className="size-full flex flex-col relative overflow-hidden">
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
      <div className="relative z-10 flex-1 flex flex-col px-6 py-8">
        <div className="flex-1 flex flex-col justify-center max-w-md mx-auto w-full">
          <div className="text-center mb-12">
            {/* Network Illustration */}
            <div className="mb-8 flex justify-center">
              <img
                src={networkIllustration}
                alt="Network of allies illustration"
                className="w-40 h-28 object-contain"
              />
            </div>

            <h1 className="text-2xl mb-6 text-black">Connect your allies</h1>
            <p className="text-gray-700 leading-relaxed px-4">
              Choose who you want to add to your list of allies. We need access to your contacts to
              continue.
            </p>
          </div>

          <div className="space-y-8">
            <button
              onClick={handleAllowAccess}
              className="w-full py-4 rounded-full bg-black text-white transition-opacity hover:opacity-90"
            >
              Allow Access
            </button>
          </div>
        </div>
      </div>

      {/* Contacts Permission Dialog */}
      <ContactsPermissionDialog
        isOpen={showPermissionDialog}
        onAllow={handlePermissionAllow}
        onDeny={handlePermissionDeny}
      />
    </div>
  );
}
