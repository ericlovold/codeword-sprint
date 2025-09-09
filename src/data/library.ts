export type GuideItem = { id: string; title: string; bullets?: string[]; linkTo?: string };
export type GuideSection = { id: string; title: string; items: GuideItem[] };

export const librarySections: GuideSection[] = [
  {
    id: 'moment-of-crisis',
    title: 'Questions to ask at the moment of crisis',
    items: [
      {
        id: 'immediate-questions',
        title: 'Start here',
        bullets: [
          'Are you safe right now?',
          'Do you have thoughts of harming yourself or others?',
          'Would it help to breathe together for a moment?',
        ],
      },
    ],
  },
  {
    id: 'be-calm',
    title: 'Be calm',
    items: [
      {
        id: 'be-calm-steps',
        title: 'How to stay grounded',
        bullets: [
          'Take deep breaths and maintain a steady voice',
          'Avoid rushing or showing panic',
          'Create a safe emotional environment',
          'Your calm presence helps them feel secure',
        ],
      },
    ],
  },
  {
    id: 'active-listening',
    title: 'Active listening',
    items: [
      {
        id: 'active-listening-steps',
        title: 'What to do',
        bullets: [
          'Reflect back what you heard',
          "Use short encouragers: 'I'm here', 'Tell me more'",
          'Leave space—silence can be supportive',
        ],
      },
    ],
  },
  {
    id: 'thank-them',
    title: 'Thank them for trusting you',
    items: [
      {
        id: 'trusting-you',
        title: 'Reassurance phrases',
        bullets: [
          "'Thank you for telling me.'",
          "'I'm honored you shared this with me.'",
          "'You're not alone—I'm here.'",
        ],
      },
    ],
  },
  {
    id: 'ensure-support',
    title: 'Ensure them that you are there to support them',
    items: [
      {
        id: 'ensure-support-steps',
        title: 'Ways to show up',
        bullets: [
          "Offer options, don't force decisions",
          'Check what they need right now',
          'Agree on a simple next step together',
        ],
      },
    ],
  },
  {
    id: 'dont-say-you-understand',
    title: "Don't say you understand how they feel",
    items: [
      {
        id: 'better-language',
        title: 'Try this instead',
        bullets: [
          "Use: 'I can't imagine exactly how this feels.'",
          'Avoid minimizing or comparisons',
        ],
      },
    ],
  },
  {
    id: 'give-time',
    title: 'Give them as much time as possible',
    items: [
      {
        id: 'time-steps',
        title: 'Pace matters',
        bullets: ['Let the conversation expand naturally', 'Ask permission before shifting topics'],
      },
    ],
  },
  {
    id: 'suggest-prof-help',
    title: 'Suggest professional help',
    items: [
      {
        id: 'prof-help-steps',
        title: 'How to bring it up',
        bullets: [
          'Normalize reaching out to professionals',
          'Offer to look up local resources together',
          "If there's imminent danger, call emergency services",
        ],
      },
    ],
  },
];
