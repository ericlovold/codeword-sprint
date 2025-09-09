import { StandardHeader } from './BackArrow';
import Rectangle25 from '../imports/Rectangle25';
import { HelpCircle, MessageCircle, Mail, Phone, FileText } from 'lucide-react';
import { SimpleArrowRight } from './SimpleArrowRight';

interface HelpSupportScreenProps {
  onBack: () => void;
}

export function HelpSupportScreen({ onBack }: HelpSupportScreenProps) {
  const faqItems = [
    {
      question: 'How do I add or remove allies?',
      answer: "You can manage your allies in the Support section by tapping 'Manage Allies'.",
    },
    {
      question: 'What happens when I send a codeword?',
      answer:
        'Your selected ally will receive a notification with your codeword and location if sharing is enabled.',
    },
    {
      question: 'How do I change my codeword?',
      answer:
        'You can update your codeword in the Support section by going through the codeword setup again.',
    },
    {
      question: 'Is my information secure?',
      answer:
        'Yes, all your data is encrypted and stored securely. We follow industry-standard security practices.',
    },
  ];

  return (
    <div className="size-full flex flex-col relative">
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
      <div className="relative z-10 flex-1 px-6 py-8 overflow-y-auto">
        <div className="max-w-md mx-auto space-y-6 pb-8">
          {/* Title */}
          <div className="text-center mb-8">
            <h1 className="text-2xl text-black chat-text" style={{ fontWeight: 600 }}>
              Help & Support
            </h1>
            <p className="text-gray-600 mt-2 chat-text">
              Get help and find answers to your questions
            </p>
          </div>

          {/* Quick Actions */}
          <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-100">
            <h3 className="text-lg text-gray-900 mb-4 chat-text" style={{ fontWeight: 500 }}>
              Get Help
            </h3>

            <div className="space-y-3">
              <button className="w-full flex items-center justify-between p-3 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 rounded-full flex items-center justify-center bg-gray-100">
                    <MessageCircle size={18} style={{ color: '#642975' }} />
                  </div>
                  <div className="text-left">
                    <h4 className="text-sm text-gray-900 chat-text" style={{ fontWeight: 500 }}>
                      Live Chat Support
                    </h4>
                    <p className="text-xs text-gray-500 chat-text">Chat with our support team</p>
                  </div>
                </div>
                <SimpleArrowRight size={16} color="#9CA3AF" />
              </button>

              <button className="w-full flex items-center justify-between p-3 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 rounded-full flex items-center justify-center bg-gray-100">
                    <Mail size={18} style={{ color: '#642975' }} />
                  </div>
                  <div className="text-left">
                    <h4 className="text-sm text-gray-900 chat-text" style={{ fontWeight: 500 }}>
                      Email Support
                    </h4>
                    <p className="text-xs text-gray-500 chat-text">support@codeword.app</p>
                  </div>
                </div>
                <SimpleArrowRight size={16} color="#9CA3AF" />
              </button>

              <button className="w-full flex items-center justify-between p-3 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 rounded-full flex items-center justify-center bg-gray-100">
                    <Phone size={18} style={{ color: '#642975' }} />
                  </div>
                  <div className="text-left">
                    <h4 className="text-sm text-gray-900 chat-text" style={{ fontWeight: 500 }}>
                      Crisis Hotline
                    </h4>
                    <p className="text-xs text-gray-500 chat-text">24/7 immediate support</p>
                  </div>
                </div>
                <SimpleArrowRight size={16} color="#9CA3AF" />
              </button>
            </div>
          </div>

          {/* Resources */}
          <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-100">
            <h3 className="text-lg text-gray-900 mb-4 chat-text" style={{ fontWeight: 500 }}>
              Resources
            </h3>

            <div className="space-y-3">
              <button className="w-full flex items-center justify-between p-3 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 rounded-full flex items-center justify-center bg-gray-100">
                    <HelpCircle size={18} style={{ color: '#642975' }} />
                  </div>
                  <div className="text-left">
                    <h4 className="text-sm text-gray-900 chat-text" style={{ fontWeight: 500 }}>
                      Privacy Policy
                    </h4>
                    <p className="text-xs text-gray-500 chat-text">How we protect your data</p>
                  </div>
                </div>
                <SimpleArrowRight size={16} color="#9CA3AF" />
              </button>

              <button className="w-full flex items-center justify-between p-3 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 rounded-full flex items-center justify-center bg-gray-100">
                    <FileText size={18} style={{ color: '#642975' }} />
                  </div>
                  <div className="text-left">
                    <h4 className="text-sm text-gray-900 chat-text" style={{ fontWeight: 500 }}>
                      Terms of Service
                    </h4>
                    <p className="text-xs text-gray-500 chat-text">Our terms and conditions</p>
                  </div>
                </div>
                <SimpleArrowRight size={16} color="#9CA3AF" />
              </button>
            </div>
          </div>

          {/* FAQ Section */}
          <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-100">
            <h3 className="text-lg text-gray-900 mb-4 chat-text" style={{ fontWeight: 500 }}>
              Frequently Asked Questions
            </h3>

            <div className="space-y-4">
              {faqItems.map((item, index) => (
                <div
                  key={index}
                  className="border-b border-gray-100 last:border-b-0 pb-3 last:pb-0"
                >
                  <h4 className="text-sm text-gray-900 mb-2 chat-text" style={{ fontWeight: 500 }}>
                    {item.question}
                  </h4>
                  <p className="text-xs text-gray-600 chat-text leading-relaxed">{item.answer}</p>
                </div>
              ))}
            </div>
          </div>

          {/* App Info */}
          <div className="bg-gray-50 rounded-lg p-4 text-center">
            <p className="text-xs text-gray-500 chat-text">Codeword v1.0.0</p>
            <p className="text-xs text-gray-400 chat-text">Need more help? Contact us anytime</p>
          </div>
        </div>
      </div>
    </div>
  );
}
