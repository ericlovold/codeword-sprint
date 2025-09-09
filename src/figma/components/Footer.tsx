import { Home, BookOpen, User } from 'lucide-react';
import chatIcon from 'figma:asset/9038d35b2093d83b11970b26773768aeb2b91e50.png';
import supportIcon from 'figma:asset/9b538f4284f964986b2f8f66b75a621ad713b8f5.png';

interface FooterProps {
  currentScreen?: 'home' | 'chat' | 'support' | 'profile' | 'resources';
  onNavigate?: (screen: 'home' | 'chat' | 'support' | 'profile' | 'resources') => void;
}

export function Footer({ currentScreen, onNavigate }: FooterProps) {
  return (
    <div
      className="sticky bottom-0 border-t border-gray-200 px-4 py-2 z-50"
      style={{ backgroundColor: '#F9F7F3' }}
    >
      <div className="flex items-center justify-between max-w-md mx-auto">
        {/* Home Icon */}
        <button
          className="p-3 rounded-lg transition-colors hover:opacity-70"
          onClick={() => onNavigate?.('home')}
          style={{ color: currentScreen === 'home' ? '#642975' : '#808080' }}
        >
          <Home size={24} />
        </button>

        {/* Resource Library/Book Icon */}
        <button
          className="p-3 rounded-lg transition-colors hover:opacity-70"
          onClick={() => onNavigate?.('resources')}
          style={{ color: currentScreen === 'resources' ? '#642975' : '#808080' }}
        >
          <BookOpen size={24} />
        </button>

        {/* Help/Support Icon - Get Support */}
        <button
          className="p-3 rounded-lg transition-colors hover:opacity-70"
          onClick={() => onNavigate?.('support')}
          style={{ color: currentScreen === 'support' ? '#642975' : '#808080' }}
        >
          <img src={supportIcon} alt="Get Support" className="w-10 h-10 object-contain" />
        </button>

        {/* Center Chat Button - Start New Chat */}
        <button
          className="p-3 rounded-lg transition-colors hover:opacity-70"
          onClick={() => onNavigate?.('chat')}
          style={{ color: currentScreen === 'chat' ? '#642975' : '#808080' }}
        >
          <img src={chatIcon} alt="Start Chat" className="w-8 h-8 object-contain" />
        </button>

        {/* Profile/Account Icon */}
        <button
          className="p-3 rounded-lg transition-colors hover:opacity-70"
          onClick={() => onNavigate?.('profile')}
          style={{ color: currentScreen === 'profile' ? '#642975' : '#808080' }}
        >
          <User size={24} />
        </button>
      </div>
    </div>
  );
}
