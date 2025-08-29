import { useState, useEffect } from 'react';
import { BackArrow } from './BackArrow';
import Rectangle25 from '../imports/Rectangle25';
import paulGardnerImage from 'figma:asset/36f161422b68d5928697d02ecfa03c4fdcd1d0d2.png';

interface Contact {
  id: string;
  name: string;
  initials: string;
}

interface ManageAlliesScreenProps {
  currentAllies: Contact[];
  onSave: (contacts: Contact[]) => void;
  onBack: () => void;
}

export function ManageAlliesScreen({ currentAllies, onSave, onBack }: ManageAlliesScreenProps) {
  const [selectedContacts, setSelectedContacts] = useState<Contact[]>(currentAllies);

  // Mock contacts data - same as ContactSelectionScreen
  const allContacts: Contact[] = [
    { id: '1', name: 'Tatiana Ceidt', initials: 'TC' },
    { id: '2', name: 'Marilyn Lipshutz', initials: 'ML' },
    { id: '3', name: 'Kierra Workman', initials: 'KW' },
    { id: '4', name: 'Paul Gardner', initials: 'PG' },
    { id: '5', name: 'Efren Toscano', initials: 'ET' },
    { id: '6', name: 'Kadin George', initials: 'KG' },
    { id: '7', name: 'Kadin Calzoni', initials: 'KC' },
    { id: '8', name: 'Jaylon Franci', initials: 'JF' },
    { id: '9', name: 'Sarah Mitchell', initials: 'SM' },
    { id: '10', name: 'Marcus Rodriguez', initials: 'MR' },
    { id: '11', name: 'Emma Thompson', initials: 'ET' },
    { id: '12', name: 'David Chen', initials: 'DC' },
    { id: '13', name: 'Jessica Williams', initials: 'JW' },
    { id: '14', name: 'Alex Johnson', initials: 'AJ' },
    { id: '15', name: 'Rachel Davis', initials: 'RD' },
    { id: '16', name: 'Michael Brown', initials: 'MB' },
    { id: '17', name: 'Ashley Garcia', initials: 'AG' },
    { id: '18', name: 'Christopher Lee', initials: 'CL' },
  ];

  const getInitialsBackgroundColor = (initials: string) => {
    // Generate a consistent color based on initials - same as ContactSelectionScreen
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

  const handleContactToggle = (contact: Contact) => {
    const isSelected = selectedContacts.some(c => c.id === contact.id);
    
    if (isSelected) {
      setSelectedContacts(prev => prev.filter(c => c.id !== contact.id));
    } else {
      if (selectedContacts.length < 3) {
        setSelectedContacts(prev => [...prev, contact]);
      }
    }
  };

  const handleSave = () => {
    onSave(selectedContacts);
  };

  const selectedCount = selectedContacts.length;

  return (
    <div className="h-screen w-full flex flex-col relative overflow-hidden">
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

      {/* Fixed Header */}
      <div className="relative z-10 flex items-center justify-between p-6 pt-12 shrink-0">
        <BackArrow onClick={onBack} />
        <h1 className="text-xl font-medium text-black chat-text flex-1 text-center mr-8">
          Manage My Allies
        </h1>
      </div>

      {/* Instructions */}
      <div className="relative z-10 px-6 pb-4 shrink-0">
        <p className="text-gray-600 chat-text text-sm">
          Choose up to 3 allies who can receive your codeword when you need support.
          {selectedCount > 0 && ` ${selectedCount}/3 selected.`}
          {currentAllies.length > 0 && ` Currently ${currentAllies.length} ally${currentAllies.length === 1 ? '' : 'ies'} selected.`}
        </p>
      </div>

      {/* Scrollable Contact List */}
      <div className="relative z-10 flex-1 overflow-y-auto">
        <div className="px-6 pb-6">
          <h3 className="text-lg font-medium text-black chat-text mb-4">
            Select Your Allies
          </h3>
          <div className="space-y-3">
            {allContacts.map((contact) => {
              const isSelected = selectedContacts.some(c => c.id === contact.id);
              const isCurrentAlly = currentAllies.some(c => c.id === contact.id);
              
              const isPendingInvite = isCurrentAlly && contact.id === '1'; // Make first current ally show as pending
              
              return (
                <div
                  key={contact.id}
                  onClick={() => handleContactToggle(contact)}
                  className="flex items-center gap-4 p-4 bg-white/80 backdrop-blur-sm rounded-xl cursor-pointer transition-all hover:bg-white/90"
                >
                  {/* Avatar with status indicator */}
                  <div className="relative">
                    {contact.initials === 'PG' ? (
                      <img 
                        src={paulGardnerImage}
                        alt={contact.name}
                        className="w-12 h-12 rounded-full object-cover"
                      />
                    ) : (
                      <div 
                        className="w-12 h-12 rounded-full flex items-center justify-center text-white font-medium"
                        style={{ backgroundColor: getInitialsBackgroundColor(contact.initials) }}
                      >
                        {contact.initials}
                      </div>
                    )}
                    {isCurrentAlly && (
                      <div 
                        className="absolute -top-1 -right-1 w-4 h-4 rounded-full border border-white flex items-center justify-center"
                        style={{ backgroundColor: '#642975' }}
                      >
                        <svg 
                          width="8" 
                          height="8" 
                          viewBox="0 0 12 12" 
                          fill="none"
                        >
                          <path 
                            d="M10 3L4.5 8.5L2 6" 
                            stroke="white" 
                            strokeWidth="1.6" 
                            strokeLinecap="round" 
                            strokeLinejoin="round"
                          />
                        </svg>
                      </div>
                    )}
                  </div>
                  
                  {/* Name */}
                  <div className="flex-1">
                    <span className="font-medium text-black chat-text">
                      {contact.name}
                    </span>
                    {isCurrentAlly && (
                      <div className={`text-xs chat-text ${isPendingInvite ? 'text-red-500' : 'text-gray-500'}`}>
                        {isPendingInvite ? 'Pending invite' : 'Current ally'}
                      </div>
                    )}
                  </div>
                  
                  {/* Selection Circle */}
                  <div 
                    className={`w-6 h-6 rounded-full border flex items-center justify-center transition-all ${
                      isSelected 
                        ? 'border-[#642975] bg-[#642975]' 
                        : 'border-gray-300'
                    }`}
                  >
                    {isSelected && (
                      <svg 
                        width="12" 
                        height="12" 
                        viewBox="0 0 12 12" 
                        fill="none"
                      >
                        <path 
                          d="M10 3L4.5 8.5L2 6" 
                          stroke="white" 
                          strokeWidth="1.6" 
                          strokeLinecap="round" 
                          strokeLinejoin="round"
                        />
                      </svg>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Fixed Save Button */}
      <div className="relative z-10 px-6 py-6 shrink-0">
        <button
          onClick={handleSave}
          disabled={selectedCount === 0}
          className="w-full h-14 bg-black text-white font-medium chat-text rounded-full transition-all hover:bg-gray-800 disabled:bg-gray-300 disabled:cursor-not-allowed"
        >
          {selectedCount === 0 ? 'Select at least one ally' : `Save ${selectedCount} ${selectedCount === 1 ? 'Ally' : 'Allies'}`}
        </button>
      </div>
    </div>
  );
}