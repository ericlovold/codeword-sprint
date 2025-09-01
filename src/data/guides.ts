export type Guide = {
  id: string;
  title: string;
  bullets?: string[];
  route?: string; // when tapping should open another screen instead of expanding
};

export const GUIDES: Guide[] = [
  {
    id: 'questions',
    title: 'Questions to ask at the moment of crisis',
    route: '/(tabs)/chat', // for now: deep-link to chat; later this can open a detail sheet
  },
  {
    id: 'be-calm',
    title: 'Be calm',
    bullets: [
      'Take deep breaths and maintain a steady voice.',
      'Avoid rushing or showing panic.',
      'Create a safe emotional environment.',
      'Your calm presence helps them feel secure.',
    ],
  },
  {
    id: 'active-listening',
    title: 'Active listening',
    bullets: [
      "Use short, open-ended prompts: 'Can you tell me more?'",
      "Reflect back what you're hearing to show understanding.",
      'Validate feelings without trying to fix immediately.',
    ],
  },
  {
    id: 'thank-them',
    title: 'Thank them for trusting you',
    bullets: [
      'Acknowledge their courage in reaching out.',
      "Reassure them you're here to support, not judge.",
    ],
  },
  {
    id: 'assure-support',
    title: 'Ensure them that you are there to support them',
    bullets: [
      'Offer to stay with them while they talk or rest.',
      'Agree on next steps together at their pace.',
    ],
  },
  {
    id: 'avoid-understanding',
    title: "Don't say you understand how they feel",
    bullets: [
      "Instead, say: 'I'm here with you,' or 'That sounds really hard.'",
      'Avoid comparisons to your own experiences.',
    ],
  },
  {
    id: 'give-time',
    title: 'Give them as much time as possible',
    bullets: [
      'Let silences happen—pressure can increase distress.',
      "Check in gently: 'Would it help to pause for a moment?'",
    ],
  },
  {
    id: 'suggest-help',
    title: 'Suggest professional help',
    bullets: [
      'Normalize reaching out to professionals.',
      'Offer to look up local resources together.',
      "If there's imminent danger, call emergency services.",
    ],
  },
];
