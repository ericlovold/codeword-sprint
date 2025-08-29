import { useState } from 'react';
import { X, Phone, MessageSquare, Shield } from 'lucide-react';
import { motion } from 'motion/react';
import { ChatOverlay } from './ChatOverlay';
import primaryContactImage from 'figma:asset/36f161422b68d5928697d02ecfa03c4fdcd1d0d2.png';
import aiCoachIcon from 'figma:asset/f9c17144f5d1ed2079fa4a6f90ae52f937fcb194.png';
import alertIcon from 'figma:asset/8c5b14574903aeadb074424b1130fc968527a5a5.png';

interface CodewordPopupProps {
  isOpen: boolean;
  onClose: () => void;
  onCodewordSent?: () => void;
  selectedContacts?: { id: string; name: string; initials: string }[];
}

interface CodewordPopupComponent {
  (props: CodewordPopupProps): JSX.Element | null;
}

export function CodewordPopup({ isOpen, onClose, onCodewordSent, selectedContacts }: CodewordPopupProps) {
  const [hoveredButton, setHoveredButton] = useState<string | null>(null);
  const [chatOverlayOpen, setChatOverlayOpen] = useState(false);
  
  if (!isOpen) return null;

  // Use actual user allies or fallback to default data
  const defaultAllies = [
    { id: '1', name: 'Paul', phone: '+1234567890', type: 'primary' as const, initials: 'PG' },
    { id: '2', name: 'Efren', phone: '+1234567891', type: 'emergency' as const, initials: 'EF' }
  ];

  // Transform selectedContacts to match the ally format
  const userAllies = selectedContacts?.map((contact, index) => ({
    id: contact.id,
    name: contact.name,
    initials: contact.initials,
    phone: `+123456789${index}`, // Mock phone number - in real app this would come from contact data
    type: contact.initials === 'PG' ? 'primary' as const : 'emergency' as const // Paul Gardner (PG) is primary
  })) || [];

  const allies = userAllies.length > 0 ? userAllies : defaultAllies;

  // Color generation function for initials (same as other components)
  const getInitialsBackgroundColor = (initials: string) => {
    const colors = [
      '#6B7280', // Gray
      '#EF4444', // Red
      '#F59E0B', // Amber
      '#10B981', // Emerald
      '#3B82F6', // Blue
      '#8B5CF6', // Violet
      '#EC4899', // Pink
    ];
    
    const index = initials.charCodeAt(0) % colors.length;
    return colors[index];
  };

  const handleCodewordAlert = (ally: typeof allies[0]) => {
    console.log(`Sending Codeword alert to ${ally.name}`);
    // This would send the automated Codeword alert
    onClose();
    if (onCodewordSent) {
      onCodewordSent();
    }
  };

  const handleCall = (ally: typeof allies[0]) => {
    window.location.href = `tel:${ally.phone}`;
    onClose();
  };

  const handleText = (ally: typeof allies[0]) => {
    window.location.href = `sms:${ally.phone}`;
    onClose();
  };

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const handleAskAiCoach = () => {
    setChatOverlayOpen(true);
  };

  const handleCloseChatOverlay = () => {
    setChatOverlayOpen(false);
  };

  return (
    <div 
      className="fixed inset-0 flex items-center justify-center z-50 p-4"
      style={{ backgroundColor: 'rgba(197, 62, 92, 0.9)' }}
      onClick={handleBackdropClick}
    >
      <div className="bg-white rounded-2xl max-w-sm w-full p-6 relative max-h-[80vh] overflow-y-auto">
        {/* Close button */}
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 p-1 hover:bg-gray-100 rounded-full transition-colors"
        >
          <X size={20} className="text-gray-600" />
        </button>

        {/* Header */}
        <div className="mb-6 pr-8">
          <p className="text-gray-600 chat-text">
            Choose an ally to reach out to
          </p>
        </div>

        {/* Allies list */}
        <div className="space-y-4">
          {allies.map((ally) => (
            <div key={ally.id} className="space-y-3">
              {/* Ally name with contact type indicator */}
              <div className="mb-3 flex items-center gap-3">
                {ally.initials === 'PG' ? (
                  <img 
                    src={primaryContactImage} 
                    alt={ally.name}
                    className="w-7 h-7 rounded-full object-cover"
                  />
                ) : (
                  <div 
                    className="w-7 h-7 rounded-full flex items-center justify-center text-white text-xs font-medium"
                    style={{ backgroundColor: getInitialsBackgroundColor(ally.initials || ally.name.charAt(0)) }}
                  >
                    {ally.initials || ally.name.charAt(0)}
                  </div>
                )}
                <span className="font-medium text-black chat-text text-xl">{ally.name}</span>
              </div>

              {/* Action buttons for this ally */}
              <div className="space-y-2">
                {/* Send Codeword Alert */}
                <button
                  onClick={() => handleCodewordAlert(ally)}
                  className="w-full flex items-center gap-3 p-3 rounded-xl border-2 transition-all hover:bg-gray-50"
                  style={{ borderColor: '#C53E5C' }}
                >
                  <img 
                    src={alertIcon} 
                    alt="Alert"
                    className="w-8 h-8 object-contain"
                  />
                  <div className="text-left">
                    <div className="font-medium text-black chat-text text-sm">Send Codeword Alert</div>
                    <div className="text-xs text-gray-600 chat-text">Audio and text notification</div>
                  </div>
                </button>

                {/* Call */}
                <div className="relative">
                  <button
                    onClick={() => handleCall(ally)}
                    onMouseEnter={() => setHoveredButton(`call-${ally.id}`)}
                    onMouseLeave={(e) => {
                      // Don't hide if moving to the AI suggestion box
                      const relatedTarget = e.relatedTarget as HTMLElement;
                      if (!relatedTarget?.closest('.ai-suggestion-box')) {
                        setHoveredButton(null);
                      }
                    }}
                    className="w-full flex items-center gap-3 p-3 rounded-xl border border-gray-300 transition-all hover:bg-gray-50"
                  >
                    <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center">
                      <Phone size={16} className="text-gray-600" />
                    </div>
                    <div className="text-left">
                      <div className="font-medium text-black chat-text text-sm">Call {ally.name}</div>
                      <div className="text-xs text-gray-600 chat-text">Direct phone call</div>
                    </div>
                  </button>
                  
                  {/* AI Coach Suggestion for Call */}
                  {hoveredButton === `call-${ally.id}` && (
                    <motion.div
                      initial={{ scale: 0.8, opacity: 0, y: 10 }}
                      animate={{ scale: 1, opacity: 1, y: 0 }}
                      exit={{ scale: 0.8, opacity: 0, y: 10 }}
                      transition={{ 
                        type: "spring", 
                        stiffness: 400, 
                        damping: 20,
                        duration: 0.3 
                      }}
                      className="absolute -top-20 -left-4 right-0 z-20"
                    >
                      <button
                        onClick={handleAskAiCoach}
                        onMouseEnter={() => setHoveredButton(`call-${ally.id}`)}
                        onMouseLeave={() => setHoveredButton(null)}
                        className="ai-suggestion-box bg-white rounded-xl p-4 shadow-lg border border-gray-200 mx-2 hover:bg-gray-50 transition-colors w-full text-left"
                      >
                        <div className="flex items-center gap-3">
                          <img 
                            src={aiCoachIcon} 
                            alt="AI Coach" 
                            className="w-10 h-10 object-contain flex-shrink-0"
                          />
                          <div className="flex-1">
                            <p className="text-sm text-gray-800 chat-text">
                              <strong>Need help with what to say?</strong> Ask your AI Coach for guidance.
                            </p>
                          </div>
                        </div>
                      </button>
                    </motion.div>
                  )}
                </div>

                {/* Text */}
                <div className="relative">
                  <button
                    onClick={() => handleText(ally)}
                    onMouseEnter={() => setHoveredButton(`text-${ally.id}`)}
                    onMouseLeave={(e) => {
                      // Don't hide if moving to the AI suggestion box
                      const relatedTarget = e.relatedTarget as HTMLElement;
                      if (!relatedTarget?.closest('.ai-suggestion-box')) {
                        setHoveredButton(null);
                      }
                    }}
                    className="w-full flex items-center gap-3 p-3 rounded-xl border border-gray-300 transition-all hover:bg-gray-50"
                  >
                    <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center">
                      <MessageSquare size={16} className="text-gray-600" />
                    </div>
                    <div className="text-left">
                      <div className="font-medium text-black chat-text text-sm">Text {ally.name}</div>
                      <div className="text-xs text-gray-600 chat-text">Send a text message</div>
                    </div>
                  </button>
                  
                  {/* AI Coach Suggestion for Text */}
                  {hoveredButton === `text-${ally.id}` && (
                    <motion.div
                      initial={{ scale: 0.8, opacity: 0, y: 10 }}
                      animate={{ scale: 1, opacity: 1, y: 0 }}
                      exit={{ scale: 0.8, opacity: 0, y: 10 }}
                      transition={{ 
                        type: "spring", 
                        stiffness: 400, 
                        damping: 20,
                        duration: 0.3 
                      }}
                      className="absolute -top-20 -left-4 right-0 z-20"
                    >
                      <button
                        onClick={handleAskAiCoach}
                        onMouseEnter={() => setHoveredButton(`text-${ally.id}`)}
                        onMouseLeave={() => setHoveredButton(null)}
                        className="ai-suggestion-box bg-white rounded-xl p-4 shadow-lg border border-gray-200 mx-2 hover:bg-gray-50 transition-colors w-full text-left"
                      >
                        <div className="flex items-center gap-3">
                          <img 
                            src={aiCoachIcon} 
                            alt="AI Coach" 
                            className="w-10 h-10 object-contain flex-shrink-0"
                          />
                          <div className="flex-1">
                            <p className="text-sm text-gray-800 chat-text">
                              <strong>Need help with what to say?</strong> Ask your AI Coach for guidance.
                            </p>
                          </div>
                        </div>
                      </button>
                    </motion.div>
                  )}
                </div>
              </div>

              {/* Separator between allies (except for last one) */}
              {ally.id !== allies[allies.length - 1].id && (
                <div className="border-b border-gray-200 my-4"></div>
              )}
            </div>
          ))}
        </div>

        {/* Info text */}
        <div className="mt-6 text-center">
          <p className="text-xs text-gray-500 chat-text">
            Your allies will receive your location and crisis status
          </p>
        </div>
      </div>
      
      {/* Chat Overlay */}
      <ChatOverlay 
        isOpen={chatOverlayOpen}
        onClose={handleCloseChatOverlay}
        guideTitle="Crisis Communication Support"
      />
    </div>
  );
}