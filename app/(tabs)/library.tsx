import React, { useState } from 'react';
import { View, Text, Pressable, ScrollView, ImageBackground, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { librarySections } from '../../src/data/library';

// Mock data based on your mockup
const mockGuidesData = [
  {
    id: 'questions-crisis',
    title: 'Questions to ask at the moment of crisis',
    items: [
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
    id: 'be-calm',
    title: 'Be calm',
    items: [
      'Take deep breaths and maintain a steady voice',
      'Avoid rushing or showing panic',
      'Create a safe emotional environment',
      'Your calm presence helps them feel secure',
    ],
  },
  {
    id: 'active-listening',
    title: 'Active listening',
    items: [
      'Give them your full attention',
      'Reflect back what you hear',
      'Ask clarifying questions',
      'Avoid interrupting or judging',
    ],
  },
  {
    id: 'thank-them',
    title: 'Thank them for trusting you',
    items: [
      'Acknowledge their courage in reaching out',
      'Express gratitude for their trust',
      'Reinforce that sharing was the right choice',
      'Validate their decision to seek help',
    ],
  },
  {
    id: 'ensure-support',
    title: 'Ensure them that you are there to support them',
    items: [
      "Make clear you're not going anywhere",
      'Offer your continued presence',
      "Reassure them they're not alone",
      'Commit to staying with them through this',
    ],
  },
  {
    id: 'dont-say-understand',
    title: "Don't say you understand how they feel",
    items: [
      'Avoid assuming you know their exact experience',
      'Instead, ask them to help you understand',
      "Use phrases like 'That sounds really difficult'",
      'Focus on their unique perspective',
    ],
  },
  {
    id: 'give-time',
    title: 'Give them as much time as possible',
    items: [
      "Don't rush the conversation",
      'Allow for silences and pauses',
      'Let them process their thoughts',
      'Show patience with their pace',
    ],
  },
  {
    id: 'suggest-help',
    title: 'Suggest professional help',
    items: [
      'Gently introduce the idea of professional support',
      'Explain benefits of talking to trained counselors',
      'Offer to help them find resources',
      'Emphasize that getting help is a sign of strength',
    ],
  },
  {
    id: 'no-situation-unworkable',
    title: 'No situation is unworkable',
    items: [
      'Instill hope that problems can be addressed',
      'Remind them that feelings and situations can change',
      'Focus on possibilities and solutions',
      'Emphasize that there are always options',
    ],
  },
  {
    id: 'people-care',
    title: 'Remind them that there are people that care about them',
    items: [
      'Help them identify their support network',
      'Remind them of family and friends who care',
      'Point out people who would want to help',
      'Reinforce their connections to others',
    ],
  },
  {
    id: 'you-care',
    title: 'You care about them',
    items: [
      'Express your genuine concern and care',
      'Let them know their life matters to you',
      'Show that you value them as a person',
      'Reinforce your commitment to their wellbeing',
    ],
  },
  {
    id: 'gun-safety',
    title: 'Gun Safety in the Home',
    items: [
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
    id: 'next-steps',
    title: 'Next steps',
    items: [
      'Help them identify immediate next actions',
      'Create a safety plan together',
      'Discuss follow-up conversations',
      'Establish check-in times and methods',
    ],
  },
  {
    id: 'external-resources',
    title: 'Consider external resources',
    items: [],
    customContent: [
      {
        type: 'link',
        text: 'National Suicide Prevention Lifeline: ',
        linkText: 'Text or Dial 988',
      },
      { type: 'link', text: 'Crisis Text Line: Text HOME to ', linkText: '741741' },
      { type: 'link', text: 'Local emergency services: ', linkText: 'Text or Dial 911' },
      { type: 'text', text: 'Mental health professionals and counselors' },
    ],
  },
];

function AccordionCard({ children, isOpen, onToggle }: any) {
  return (
    <View style={styles.card}>
      <Pressable onPress={onToggle}>{children}</Pressable>
    </View>
  );
}

function AccordionHeader({ title, isOpen }: any) {
  return (
    <View style={styles.cardHeader}>
      <Text style={styles.cardTitle}>{title}</Text>
      <Text style={styles.chevron}>{isOpen ? '⌄' : '⌃'}</Text>
    </View>
  );
}

function AccordionContent({ items, customContent }: any) {
  return (
    <View style={styles.cardContent}>
      {customContent ? (
        <View style={styles.resourcesList}>
          {customContent.map((content: any, index: number) => (
            <View key={index} style={styles.resourceItem}>
              {content.type === 'link' ? (
                <Text style={styles.resourceText}>
                  {content.text}
                  <Text style={styles.linkText}>{content.linkText}</Text>
                </Text>
              ) : (
                <Text style={styles.resourceText}>{content.text}</Text>
              )}
            </View>
          ))}
        </View>
      ) : items.length > 0 ? (
        <>
          <Pressable style={styles.askAiButton} onPress={() => router.push('/(tabs)/codeword')}>
            <Text style={styles.askAiText}>Ask AI Coach</Text>
          </Pressable>
          <View style={styles.bulletList}>
            {items.map((item: string, index: number) => (
              <View key={index} style={styles.bulletItem}>
                <Text style={styles.bullet}>•</Text>
                <Text style={styles.bulletText}>{item}</Text>
              </View>
            ))}
          </View>
        </>
      ) : null}
    </View>
  );
}

export default function LibraryScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const [openId, setOpenId] = useState<string | null>('external-resources'); // default open like wireframe shows

  return (
    <ImageBackground
      source={require('../../assets/icons/Gradient BG.png')}
      style={styles.container}
      resizeMode="cover"
    >
      <ScrollView
        contentContainerStyle={[styles.scrollContent, { paddingBottom: insets.bottom + 100 }]}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.title}>Guides</Text>

        {mockGuidesData.map((section) => {
          const isOpen = openId === section.id;
          return (
            <AccordionCard
              key={section.id}
              isOpen={isOpen}
              onToggle={() => setOpenId(isOpen ? null : section.id)}
            >
              <AccordionHeader title={section.title} isOpen={isOpen} />
              {isOpen && (
                <AccordionContent items={section.items} customContent={section.customContent} />
              )}
            </AccordionCard>
          );
        })}

        {/* Personal Wellness Section */}
        <Text style={[styles.title, { marginTop: 40, marginBottom: 20 }]}>Personal Wellness</Text>

        <View style={styles.card}>
          <View style={styles.cardHeader}>
            <Text style={styles.cardTitle}>Track My Mood</Text>
          </View>
          <View style={[styles.cardContent, { paddingTop: 0 }]}>
            <Text style={styles.moodDescription}>
              Monitor your emotional wellbeing with our mood tracking tool. Identify patterns and
              triggers to better understand your mental health journey.
            </Text>
            <Pressable style={styles.trackMoodButton} onPress={() => router.push('/coach')}>
              <Text style={styles.trackMoodButtonText}>Track My Mood</Text>
            </Pressable>
          </View>
        </View>

        {/* Resources Section */}
        <Text style={[styles.title, { marginTop: 40, marginBottom: 20 }]}>Resources</Text>

        {/* Crisis Hotlines */}
        <View style={[styles.card, { marginBottom: 16 }]}>
          <View style={styles.cardHeader}>
            <Text style={styles.cardTitle}>Crisis Hotlines</Text>
          </View>
          <View style={[styles.cardContent, { paddingTop: 0 }]}>
            <View style={styles.hotlineItem}>
              <Text style={styles.hotlineTitle}>988 Suicide & Crisis Lifeline</Text>
              <Text style={styles.hotlineDescription}>24/7 support for people in crisis</Text>
            </View>
            <View style={styles.hotlineItem}>
              <Text style={styles.hotlineTitle}>Crisis Text Line</Text>
              <Text style={styles.hotlineDescription}>Text HOME to 741741</Text>
            </View>
            <View style={styles.hotlineItem}>
              <Text style={styles.hotlineTitle}>Veterans Crisis Line</Text>
              <Text style={styles.hotlineDescription}>1-800-273-8255, Press 1</Text>
            </View>
            <View style={[styles.hotlineItem, { borderBottomWidth: 0 }]}>
              <Text style={styles.hotlineTitle}>Trevor Project (LGBTQ+)</Text>
              <Text style={styles.hotlineDescription}>1-866-488-7386</Text>
            </View>
          </View>
        </View>

        {/* Find Professional Support */}
        <View style={[styles.card, { marginBottom: 40 }]}>
          <View style={styles.cardHeader}>
            <Text style={styles.cardTitle}>Find Professional Support</Text>
          </View>
          <View style={[styles.cardContent, { paddingTop: 0 }]}>
            <Text style={styles.moodDescription}>
              Connect with licensed therapists and mental health professionals who can provide
              ongoing support and guidance.
            </Text>

            <View style={styles.hotlineItem}>
              <Text style={styles.hotlineTitle}>Find a Therapist</Text>
              <Text style={styles.hotlineDescription}>
                Find therapists by location, insurance, and specialty
              </Text>
            </View>

            <View style={styles.hotlineItem}>
              <Text style={styles.hotlineTitle}>SAMHSA National Helpline</Text>
              <Text style={styles.hotlineDescription}>Free, confidential treatment referrals</Text>
            </View>

            <View style={styles.hotlineItem}>
              <Text style={styles.hotlineTitle}>
                National Eating Disorders Association Helpline
              </Text>
              <Text style={styles.hotlineDescription}>
                Reach out for help with eating concerns, body image issues, or disordered eating.
              </Text>
            </View>

            <View style={[styles.hotlineItem, { borderBottomWidth: 0 }]}>
              <Text style={styles.hotlineTitle}>National Domestic Violence Hotline</Text>
              <Text style={styles.hotlineDescription}>
                Get support if you feel controlled, unsafe, or harmed by a partner or family member.
                Call or text 'START' to 88788.
              </Text>
            </View>
          </View>
        </View>

        {/* Partners Section */}
        <Text style={[styles.title, { marginTop: 20, marginBottom: 20 }]}>Partners</Text>

        <View style={[styles.card, { marginBottom: 40 }]}>
          <View style={[styles.cardContent, { paddingVertical: 30, alignItems: 'center' }]}>
            <Text style={[styles.moodDescription, { textAlign: 'center', marginBottom: 0 }]}>
              Partner resources and collaborations will be available here soon.
            </Text>
          </View>
        </View>
      </ScrollView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: '#1B1D22',
    marginBottom: 20,
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
    overflow: 'hidden',
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 20,
    paddingHorizontal: 20,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1B1D22',
    flex: 1,
  },
  chevron: {
    fontSize: 16,
    color: '#666666',
  },
  cardContent: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  askAiButton: {
    backgroundColor: '#642975',
    borderRadius: 20,
    paddingVertical: 8,
    paddingHorizontal: 16,
    alignSelf: 'flex-end',
    marginBottom: 16,
  },
  askAiText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '500',
  },
  bulletList: {
    gap: 8,
  },
  bulletItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  bullet: {
    color: '#642975',
    fontSize: 16,
    marginRight: 12,
    lineHeight: 22,
  },
  bulletText: {
    color: '#1B1D22',
    fontSize: 15,
    flex: 1,
    lineHeight: 22,
  },
  moodDescription: {
    fontSize: 14,
    color: '#666666',
    lineHeight: 22,
    marginBottom: 20,
  },
  trackMoodButton: {
    backgroundColor: '#642975',
    borderRadius: 24,
    paddingVertical: 16,
    alignItems: 'center',
  },
  trackMoodButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  hotlineItem: {
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  hotlineTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1B1D22',
    marginBottom: 4,
  },
  hotlineDescription: {
    fontSize: 14,
    color: '#666666',
  },
  resourcesList: {
    gap: 16,
  },
  resourceItem: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  resourceText: {
    fontSize: 16,
    color: '#1B1D22',
    lineHeight: 24,
  },
  linkText: {
    color: '#642975',
    textDecorationLine: 'underline',
  },
});
