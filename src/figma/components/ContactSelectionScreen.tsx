import { useState } from 'react';
import { Check } from 'lucide-react';
import { BackArrow } from './BackArrow';
import Rectangle25 from '../imports/Rectangle25';
import paulGardnerPhoto from 'figma:asset/36f161422b68d5928697d02ecfa03c4fdcd1d0d2.png';

interface Contact {
  id: string;
  name: string;
  initials: string;
  selected: boolean;
}

interface ContactSelectionScreenProps {
  onContinue: (selectedContacts: { id: string; name: string; initials: string }[]) => void;
  onBack: () => void;
}

export function ContactSelectionScreen({ onContinue, onBack }: ContactSelectionScreenProps) {
  // Mock contacts data - in a real app this would come from the user's contacts
  const [contacts, setContacts] = useState<Contact[]>([
    { id: '1', name: 'Tatiana Ceidt', initials: 'TC', selected: false },
    { id: '2', name: 'Marilyn Lipshutz', initials: 'ML', selected: false },
    { id: '3', name: 'Kierra Workman', initials: 'KW', selected: false },
    { id: '4', name: 'Paul Gardner', initials: 'PG', selected: false },
    { id: '5', name: 'Efren Toscano', initials: 'ET', selected: false },
    { id: '6', name: 'Kadin George', initials: 'KG', selected: false },
    { id: '7', name: 'Kadin Calzoni', initials: 'KC', selected: false },
    { id: '8', name: 'Jaylon Franci', initials: 'JF', selected: false },
    { id: '9', name: 'Sarah Mitchell', initials: 'SM', selected: false },
    { id: '10', name: 'Marcus Rodriguez', initials: 'MR', selected: false },
    { id: '11', name: 'Emma Thompson', initials: 'ET', selected: false },
    { id: '12', name: 'David Chen', initials: 'DC', selected: false },
    { id: '13', name: 'Jessica Williams', initials: 'JW', selected: false },
    { id: '14', name: 'Alex Johnson', initials: 'AJ', selected: false },
    { id: '15', name: 'Rachel Davis', initials: 'RD', selected: false },
    { id: '16', name: 'Michael Brown', initials: 'MB', selected: false },
    { id: '17', name: 'Ashley Garcia', initials: 'AG', selected: false },
    { id: '18', name: 'Christopher Lee', initials: 'CL', selected: false },
  ]);

  const selectedCount = contacts.filter(contact => contact.selected).length;

  const toggleContact = (contactId: string) => {
    setContacts(prevContacts => {
      const currentContact = prevContacts.find(c => c.id === contactId);
      const currentSelectedCount = prevContacts.filter(c => c.selected).length;
      
      // If trying to select a contact and already at max limit (3), don't allow selection
      if (!currentContact?.selected && currentSelectedCount >= 3) {
        return prevContacts; // Don't change anything
      }
      
      return prevContacts.map(contact =>
        contact.id === contactId 
          ? { ...contact, selected: !contact.selected }
          : contact
      );
    });
  };

  const getInitialsBackgroundColor = (initials: string) => {
    // Generate a consistent color based on initials
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

      {/* Header with back arrow */}
      <div className="relative z-10 flex items-center justify-start p-6 pt-12 shrink-0">
        <BackArrow onClick={onBack} />
      </div>

      {/* Scrollable Content */}
      <div className="relative z-10 flex-1 flex flex-col min-h-0">
        {/* Title and subtitle */}
        <div className="px-6 mb-6 shrink-0">
          <h1 className="text-3xl font-medium text-black chat-text mb-2">
            Choose from your contacts
          </h1>
          <p className="text-gray-600 chat-text">
            Choose up to three people who you want to add to your list of allies.
          </p>
        </div>

        {/* Scrollable Contacts list */}
        <div className="flex-1 overflow-y-auto px-6 pb-4">
          <div className="space-y-4">
            {contacts.map((contact) => (
              <button
                key={contact.id}
                onClick={() => toggleContact(contact.id)}
                disabled={!contact.selected && selectedCount >= 3}
                className={`w-full flex items-center justify-between p-4 rounded-xl transition-all ${
                  !contact.selected && selectedCount >= 3 
                    ? 'opacity-50 cursor-not-allowed' 
                    : 'hover:bg-black/5'
                }`}
              >
                <div className="flex items-center gap-4">
                  {/* Profile circle with initials or image */}
                  {contact.initials === 'PG' ? (
                    <img 
                      src={paulGardnerPhoto}
                      alt={contact.name}
                      className="w-12 h-12 rounded-full object-cover"
                    />
                  ) : (
                    <div 
                      className="w-12 h-12 rounded-full flex items-center justify-center text-white font-medium text-sm chat-text"
                      style={{ backgroundColor: getInitialsBackgroundColor(contact.initials) }}
                    >
                      {contact.initials}
                    </div>
                  )}
                  
                  {/* Contact name */}
                  <span className="text-black font-medium chat-text text-lg">
                    {contact.name}
                  </span>
                </div>

                {/* Selection indicator */}
                <div className={`w-6 h-6 rounded-full border flex items-center justify-center ${
                  contact.selected 
                    ? 'bg-[#642975] border-[#642975]' 
                    : 'border-[#642975]'
                }`}>
                  {contact.selected && (
                    <Check size={14} className="text-white" />
                  )}
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Fixed Add Allies Button */}
        <div className="px-6 py-6 shrink-0">
          <button
            onClick={() => {
              const selected = contacts.filter(contact => contact.selected)
                .map(contact => ({ id: contact.id, name: contact.name, initials: contact.initials }));
              onContinue(selected);
            }}
            disabled={selectedCount === 0}
            className="w-full h-14 bg-black text-white font-medium chat-text rounded-full transition-all hover:bg-gray-800 disabled:bg-gray-400 disabled:cursor-not-allowed"
          >
{selectedCount === 0 ? 'Add Contacts' : `Add ${selectedCount} ${selectedCount === 1 ? 'Ally' : 'Allies'}`}
          </button>
        </div>
      </div>
    </div>
  );
}