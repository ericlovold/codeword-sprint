import { useState, useEffect } from 'react';
import { StickyHeader } from './StickyHeader';
import { ChevronDown, ChevronRight } from 'lucide-react';
import { motion } from 'motion/react';
import { ChatOverlay } from './ChatOverlay';
import askAiCoachImage from 'figma:asset/c2e38545834bdb2512e1281c6d617a1901b31e24.png';

interface ResourceLibraryScreenProps {
  onNavigate?: (screen: 'home' | 'chat' | 'support' | 'profile' | 'resources') => void;
  onNavigateToMoodTracker?: () => void;
}

export function ResourceLibraryScreen({
  onNavigate,
  onNavigateToMoodTracker,
}: ResourceLibraryScreenProps) {
  const [openAccordion, setOpenAccordion] = useState<string | null>(null);
  const [showAiCoachButton, setShowAiCoachButton] = useState<string | null>(null);
  const [chatOverlayOpen, setChatOverlayOpen] = useState(false);
  const [currentGuideTitle, setCurrentGuideTitle] = useState<string>('');

  const guides = [
    {
      title: 'Questions to ask at the moment of crisis',
      content: [
        "Can you tell me what's going on?",
        'How are you feeling right now?',
        'Where are you right now?',
        'Are you considering harming yourself?',
        'Do you have access to firearms or weapons?',
        'Do you need someone to come be with you?',
        'Can we talk for a while?',
      ],
    },
    {
      title: 'Be calm',
      content: [
        'Take deep breaths and maintain a steady voice',
        'Avoid rushing or showing panic',
        'Create a safe emotional environment',
        'Your calm presence helps them feel secure',
      ],
    },
    {
      title: 'Active listening',
      content: [
        'Give them your full attention',
        'Reflect back what you hear',
        'Ask clarifying questions',
        'Avoid interrupting or judging',
      ],
    },
    {
      title: 'Thank them for trusting you',
      content: [
        'Acknowledge their courage in reaching out',
        'Express gratitude for their trust',
        'Reinforce that sharing was the right choice',
        'Validate their decision to seek help',
      ],
    },
    {
      title: 'Ensure them that you are there to support them',
      content: [
        "Make clear you're not going anywhere",
        'Offer your continued presence',
        "Reassure them they're not alone",
        'Commit to staying with them through this',
      ],
    },
    {
      title: "Don't say you understand how they feel",
      content: [
        'Avoid assuming you know their exact experience',
        'Instead, ask them to help you understand',
        "Use phrases like 'That sounds really difficult'",
        'Focus on their unique perspective',
      ],
    },
    {
      title: 'Give them as much time as possible',
      content: [
        "Don't rush the conversation",
        'Allow for silences and pauses',
        'Let them process their thoughts',
        'Show patience with their pace',
      ],
    },
    {
      title: 'Suggest professional help',
      content: [
        'Gently introduce the idea of professional support',
        'Explain benefits of talking to trained counselors',
        'Offer to help them find resources',
        'Emphasize that getting help is a sign of strength',
      ],
    },
    {
      title: 'No situation is unworkable',
      content: [
        'Instill hope that problems can be addressed',
        'Remind them that feelings and situations can change',
        'Focus on possibilities and solutions',
        'Emphasize that there are always options',
      ],
    },
    {
      title: 'Remind them that there are people that care about them',
      content: [
        'Help them identify their support network',
        'Remind them of family and friends who care',
        'Point out people who would want to help',
        'Reinforce their connections to others',
      ],
    },
    {
      title: 'You care about them',
      content: [
        'Express your genuine concern and care',
        'Let them know their life matters to you',
        'Show that you value them as a person',
        'Reinforce your commitment to their wellbeing',
      ],
    },
    {
      title: 'Gun Safety in the Home',
      content: [
        'Store firearms and ammunition separately',
        'Use gun locks or lockboxes for additional security',
        'Keep firearms unloaded when not in use',
        'Store ammunition in a separate locked location',
        'Consider temporarily removing firearms from the home during crisis periods',
        'Never leave firearms accessible when someone is in crisis',
        'Secure keys to gun safes and locks',
        'Remove or secure other weapons like knives or pills',
        'Ensure only authorized adults have access to storage keys',
        'Contact local law enforcement for temporary gun storage if needed',
      ],
    },
    {
      title: 'Next steps',
      content: [
        'Help them identify immediate next actions',
        'Create a safety plan together',
        'Discuss follow-up conversations',
        'Establish check-in times and methods',
      ],
    },
    {
      title: 'Consider external resources',
      content: [
        {
          type: 'mixed',
          text: 'National Suicide Prevention Lifeline: ',
          linkText: 'Text or Dial 988',
          href: 'tel:988',
        },
        {
          type: 'mixed',
          text: 'Crisis Text Line: ',
          linkText: 'Text HOME to 741741',
          href: 'sms:741741?body=HOME',
        },
        {
          type: 'mixed',
          text: 'Local emergency services: ',
          linkText: 'Text or Dial 911',
          href: 'tel:911',
        },
        { type: 'text', text: 'Mental health professionals and counselors' },
      ],
    },
  ];

  const toggleAccordion = (title: string) => {
    const newOpenAccordion = openAccordion === title ? null : title;
    setOpenAccordion(newOpenAccordion);

    // Clear the AI coach button when closing
    if (newOpenAccordion === null) {
      setShowAiCoachButton(null);
    } else {
      // Start timer for AI coach button when opening
      setTimeout(() => {
        setShowAiCoachButton(newOpenAccordion);
      }, 3000);
    }
  };

  // Clear AI coach button when accordion changes
  useEffect(() => {
    if (openAccordion === null) {
      setShowAiCoachButton(null);
    }
  }, [openAccordion]);

  const handleAskAiCoach = (guideTitle: string) => {
    // Open chat overlay instead of navigating to chat screen
    setCurrentGuideTitle(guideTitle);
    setChatOverlayOpen(true);
  };

  const handleCloseChatOverlay = () => {
    setChatOverlayOpen(false);
    setCurrentGuideTitle('');
  };

  return (
    <div className="h-full flex flex-col">
      <StickyHeader />

      {/* Main content area with purple gradient background */}
      <div
        className="flex-1 px-4 py-6 overflow-y-auto"
        style={{
          background:
            'linear-gradient(180deg, rgba(100, 41, 117, 0.3) 0%, rgba(100, 41, 117, 0.1) 50%, rgba(100, 41, 117, 0.05) 100%)',
        }}
      >
        <div className="max-w-md mx-auto space-y-4">
          {/* Header */}
          <div className="mb-6">
            <h1 className="text-2xl font-medium text-gray-900 chat-text mb-2">Guides</h1>
          </div>

          {/* Accordion Guide sections */}
          <div className="space-y-3">
            {guides.map((guide, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden relative"
              >
                <button
                  onClick={() => toggleAccordion(guide.title)}
                  className="w-full p-4 flex items-center justify-between hover:bg-gray-50 transition-colors"
                >
                  <div className="flex-1 text-left">
                    <p className="text-base font-medium text-gray-900 chat-text leading-tight">
                      {guide.title}
                    </p>
                  </div>
                  {openAccordion === guide.title ? (
                    <ChevronDown
                      size={20}
                      className="text-gray-600 transition-transform flex-shrink-0 ml-3"
                    />
                  ) : (
                    <ChevronRight
                      size={20}
                      className="text-gray-600 transition-transform flex-shrink-0 ml-3"
                    />
                  )}
                </button>

                {openAccordion === guide.title && (
                  <div className="px-4 pb-4 border-t border-gray-100 relative">
                    <div className="pt-16 space-y-2">
                      {guide.content.map((item, itemIndex) => (
                        <div
                          key={itemIndex}
                          className={`flex items-start ${guide.title === 'Consider external resources' ? 'space-x-0' : 'space-x-3'}`}
                        >
                          {guide.title !== 'Consider external resources' && (
                            <div
                              className="w-1.5 h-1.5 rounded-full bg-purple-600 mt-2 flex-shrink-0 mr-3"
                              style={{ backgroundColor: '#642975' }}
                            ></div>
                          )}
                          {typeof item === 'object' && item.type === 'mixed' ? (
                            <p className="text-sm text-gray-700 chat-text leading-relaxed">
                              {item.text}
                              <a
                                href={item.href}
                                className="underline hover:no-underline focus:no-underline"
                                style={{ color: '#642975' }}
                              >
                                {item.linkText}
                              </a>
                            </p>
                          ) : typeof item === 'object' && item.type === 'link' ? (
                            <a
                              href={item.href}
                              className="text-sm text-gray-700 chat-text leading-relaxed underline hover:no-underline focus:no-underline"
                              style={{ color: '#642975' }}
                            >
                              {item.text}
                            </a>
                          ) : (
                            <p className="text-sm text-gray-700 chat-text leading-relaxed">
                              {typeof item === 'object' ? item.text : item}
                            </p>
                          )}
                        </div>
                      ))}
                    </div>

                    {/* Ask AI Coach Button */}
                    {showAiCoachButton === guide.title && (
                      <motion.button
                        initial={{ x: 300, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{
                          type: 'spring',
                          stiffness: 260,
                          damping: 20,
                          duration: 0.6,
                        }}
                        onClick={() => handleAskAiCoach(guide.title)}
                        className="absolute top-4 right-4 hover:scale-105 transition-transform duration-200 focus:outline-none focus:ring-2 focus:ring-purple-300 rounded-full"
                        style={{ zIndex: 10 }}
                      >
                        <img
                          src={askAiCoachImage}
                          alt="Ask AI Coach"
                          className="w-40 h-auto object-contain drop-shadow-sm"
                        />
                      </motion.button>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Track My Mood Section */}
          <div className="mt-8 pt-6 border-t border-white/20">
            <h2 className="text-xl font-medium text-gray-900 chat-text mb-4">Personal Wellness</h2>

            {/* Track My Mood Card */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
              <div className="p-6">
                <h3 className="text-lg font-medium text-gray-900 chat-text mb-3">Track My Mood</h3>
                <p className="text-sm text-gray-600 chat-text mb-4 leading-relaxed">
                  Monitor your emotional wellbeing with our mood tracking tool. Identify patterns
                  and triggers to better understand your mental health journey.
                </p>

                <button
                  onClick={onNavigateToMoodTracker}
                  className="w-full py-3 px-4 rounded-full font-medium chat-text text-white transition-colors hover:opacity-90"
                  style={{ backgroundColor: '#642975' }}
                >
                  Track My Mood
                </button>
              </div>
            </div>
          </div>

          {/* Resources section */}
          <div className="mt-8 pt-6 border-t border-white/20">
            <h2 className="text-xl font-medium text-gray-900 chat-text mb-4">Resources</h2>

            {/* Therapy Resources Card */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
              <div className="p-6">
                <h3 className="text-lg font-medium text-gray-900 chat-text mb-3">
                  Find Professional Support
                </h3>
                <p className="text-sm text-gray-600 chat-text mb-4 leading-relaxed">
                  Connect with licensed therapists and mental health professionals who can provide
                  ongoing support and guidance.
                </p>

                <div className="space-y-3">
                  {/* Find a Therapist */}
                  <a
                    href="https://www.psychologytoday.com/us/therapists"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block w-full bg-white border border-gray-200 rounded-xl p-4 hover:bg-gray-50 transition-colors group"
                  >
                    <div className="flex-1">
                      <h4 className="text-sm font-medium text-gray-900 chat-text mb-1">
                        Find a Therapist
                      </h4>
                      <p className="text-xs text-gray-600 chat-text">
                        Find therapists by location, insurance, and specialty
                      </p>
                    </div>
                  </a>

                  {/* SAMHSA */}
                  <a
                    href="https://www.samhsa.gov/find-help/national-helpline"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block w-full bg-white border border-gray-200 rounded-xl p-4 hover:bg-gray-50 transition-colors group"
                  >
                    <div className="flex-1">
                      <h4 className="text-sm font-medium text-gray-900 chat-text mb-1">
                        SAMHSA National Helpline
                      </h4>
                      <p className="text-xs text-gray-600 chat-text">
                        Free, confidential treatment referrals
                      </p>
                    </div>
                  </a>

                  {/* National Eating Disorders Association */}
                  <a
                    href="https://www.nationaleatingdisorders.org/help-support/contact-helpline"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block w-full bg-white border border-gray-200 rounded-xl p-4 hover:bg-gray-50 transition-colors group"
                  >
                    <div className="flex-1">
                      <h4 className="text-sm font-medium text-gray-900 chat-text mb-1">
                        National Eating Disorders Association Helpline
                      </h4>
                      <p className="text-xs text-gray-600 chat-text">
                        Reach out for help with eating concerns, body image issues, or disordered
                        eating.
                      </p>
                    </div>
                  </a>

                  {/* National Domestic Violence Hotline */}
                  <a
                    href="https://www.thehotline.org/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block w-full bg-white border border-gray-200 rounded-xl p-4 hover:bg-gray-50 transition-colors group"
                  >
                    <div className="flex-1">
                      <h4 className="text-sm font-medium text-gray-900 chat-text mb-1">
                        National Domestic Violence Hotline
                      </h4>
                      <p className="text-xs text-gray-600 chat-text">
                        Get support if you feel controlled, unsafe, or harmed by a partner or family
                        member. Call or text 'START' to 88788.
                      </p>
                    </div>
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Partners section placeholder */}
          <div className="mt-8 pt-6 border-t border-white/20">
            <h2 className="text-xl font-medium text-gray-900 chat-text mb-4">Partners</h2>
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
              <p className="text-sm text-gray-600 chat-text text-center">
                Partner resources and collaborations will be available here soon.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Chat Overlay */}
      <ChatOverlay
        isOpen={chatOverlayOpen}
        onClose={handleCloseChatOverlay}
        guideTitle={currentGuideTitle}
      />
    </div>
  );
}
