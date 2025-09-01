import type { AccordionItem } from '../components/Accordion';

export const GUIDE_SECTIONS: AccordionItem[] = [
  {
    id: 'crisis-questions',
    title: 'Questions to ask at the moment of crisis',
    bullets: [
      'Are you safe right now?',
      'Do you have access to a safe place to go?',
      'Would you like me to call or text someone with you?',
      'Would you like to reach out to a professional or crisis line together?',
    ],
  },
  {
    id: 'be-calm',
    title: 'Be calm',
    bullets: [
      'Take deep breaths and maintain a steady voice.',
      'Avoid rushing or showing panic.',
      'Create a safe, emotionally steady environment.',
      'Your calm presence helps them feel secure.',
    ],
  },
  {
    id: 'active-listening',
    title: 'Active listening',
    bullets: [
      'Reflect back what you hear ("It sounds like...").',
      'Listen more than you speak; allow pauses.',
      'Ask open questions that invite sharing.',
      'Validate feelings without trying to fix immediately.',
    ],
  },
  {
    id: 'thank-them',
    title: 'Thank them for trusting you',
    bullets: [
      'Acknowledge their courage for sharing.',
      "Reinforce that you're here and they're not alone.",
    ],
  },
  {
    id: 'assure-support',
    title: 'Ensure them that you are there to support them',
    bullets: [
      'Offer concrete help (e.g., "Can I sit with you?", "Want me to text your ally?").',
      'Ask how they want to be supported before acting.',
    ],
  },
  {
    id: 'avoid-comparisons',
    title: "Don't say you understand how they feel",
    bullets: [
      'Avoid minimizing or comparing experiences.',
      'Use empathy: "Thank you for telling me; that sounds really hard."',
    ],
  },
  {
    id: 'give-time',
    title: 'Give them as much time as possible',
    bullets: ['Let the conversation move at their pace.', 'Silence is ok—holding space matters.'],
  },
  {
    id: 'suggest-professional',
    title: 'Suggest professional help',
    bullets: [
      'Normalize reaching out to professionals.',
      'Offer to look up local resources together.',
      "If there's imminent danger, call emergency services.",
    ],
  },
];

export const LIBRARY_PAGE_TITLE = 'Guides';
