interface ContactsPermissionDialogProps {
  isOpen: boolean;
  onAllow: () => void;
  onDeny: () => void;
}

export function ContactsPermissionDialog({
  isOpen,
  onAllow,
  onDeny,
}: ContactsPermissionDialogProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Dialog */}
      <div className="relative bg-white rounded-2xl mx-4 w-full max-w-xs shadow-xl">
        {/* Content */}
        <div className="px-6 py-6 text-center">
          <h2 className="text-lg mb-2 text-black" style={{ fontFamily: 'Inter', fontWeight: 600 }}>
            Allow Access to Contacts?
          </h2>
          <p
            className="text-sm text-gray-600 mb-2"
            style={{ fontFamily: 'Inter', fontWeight: 400 }}
          >
            This allows you to select allies from your contact list to support you during difficult
            times.
          </p>
        </div>

        {/* Buttons */}
        <div className="border-t border-gray-200">
          <div className="flex">
            <button
              onClick={onDeny}
              className="flex-1 py-4 text-center border-r border-gray-200"
              style={{
                fontFamily: 'Inter',
                fontWeight: 400,
                color: '#007AFF',
                fontSize: '17px',
              }}
            >
              Deny
            </button>
            <button
              onClick={onAllow}
              className="flex-1 py-4 text-center"
              style={{
                fontFamily: 'Inter',
                fontWeight: 600,
                color: '#007AFF',
                fontSize: '17px',
              }}
            >
              Allow
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
