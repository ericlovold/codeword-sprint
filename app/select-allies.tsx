import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Pressable, SafeAreaView, FlatList, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import * as Contacts from 'expo-contacts';
import { storage } from '../src/utils/storage';

interface Contact {
  id: string;
  name: string;
  initials: string;
  imageUri?: string;
  backgroundColor: string;
}

const backgroundColors = [
  '#6B73FF', // Purple-blue
  '#9B59B6', // Purple
  '#E91E63', // Pink
  '#FF9800', // Orange
  '#4CAF50', // Green
  '#2196F3', // Blue
  '#FF5722', // Deep orange
];

export default function SelectAlliesScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [selectedContacts, setSelectedContacts] = useState<Set<string>>(new Set());

  useEffect(() => {
    loadContacts();
  }, []);

  const loadContacts = async () => {
    try {
      const { data } = await Contacts.getContactsAsync({
        fields: [Contacts.Fields.Name, Contacts.Fields.Image],
      });

      if (data.length > 0) {
        const formattedContacts: Contact[] = data
          .filter((contact) => contact.name)
          .slice(0, 20) // Limit to first 20 contacts for demo
          .map((contact, index) => ({
            id: contact.id,
            name: contact.name || 'Unknown',
            initials: getInitials(contact.name || 'Unknown'),
            imageUri: contact.imageAvailable ? contact.image?.uri : undefined,
            backgroundColor: backgroundColors[index % backgroundColors.length],
          }));

        // Add mock contacts if we don't have enough real ones
        if (formattedContacts.length < 7) {
          const mockContacts = [
            { id: 'mock1', name: 'Tatiana Ceidt', initials: 'TC', backgroundColor: '#6B73FF' },
            { id: 'mock2', name: 'Marilyn Lipshutz', initials: 'ML', backgroundColor: '#6B73FF' },
            { id: 'mock3', name: 'Kierra Workman', initials: 'KW', backgroundColor: '#9B59B6' },
            {
              id: 'mock4',
              name: 'Paul Gardner',
              initials: 'PG',
              backgroundColor: '#6B73FF',
              imageUri: 'mock',
            },
            { id: 'mock5', name: 'Efren Toscano', initials: 'ET', backgroundColor: '#E91E63' },
            { id: 'mock6', name: 'Kadin George', initials: 'KG', backgroundColor: '#9B59B6' },
            { id: 'mock7', name: 'Kadin Calzoni', initials: 'KC', backgroundColor: '#9B59B6' },
          ];
          setContacts(mockContacts);
        } else {
          setContacts(formattedContacts);
        }
      }
    } catch (error) {
      console.log('Error loading contacts:', error);
      Alert.alert('Error', 'Failed to load contacts');
    }
  };

  const getInitials = (name: string): string => {
    const parts = name.split(' ');
    if (parts.length >= 2) {
      return (parts[0][0] + parts[1][0]).toUpperCase();
    }
    return name.slice(0, 2).toUpperCase();
  };

  const handleBack = () => {
    router.back();
  };

  const handleContactToggle = (contactId: string) => {
    setSelectedContacts((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(contactId)) {
        newSet.delete(contactId);
      } else if (newSet.size < 3) {
        // Max 3 allies
        newSet.add(contactId);
      }
      return newSet;
    });
  };

  const handleAddAllies = async () => {
    if (selectedContacts.size === 0) {
      Alert.alert('No allies selected', 'Please select at least one ally to continue.');
      return;
    }

    // Get selected allies data
    const selectedAlliesData = contacts.filter((c) => selectedContacts.has(c.id));

    // Save selected allies to storage
    try {
      await storage.saveSelectedAllies(selectedAlliesData);
      console.log('Selected allies saved:', selectedAlliesData);
    } catch (error) {
      console.error('Failed to save selected allies:', error);
    }

    // Get first selected ally for codeword setup
    const firstSelectedId = Array.from(selectedContacts)[0];
    const firstSelectedAlly = contacts.find((c) => c.id === firstSelectedId);

    if (firstSelectedAlly && selectedContacts.size >= 1) {
      // Offer to set up codeword with the first ally
      Alert.alert(
        'Set Up Codeword?',
        `Would you like to set up a codeword with ${firstSelectedAlly.name}? This allows you to send emergency alerts.`,
        [
          {
            text: 'Skip for Now',
            style: 'cancel',
            onPress: () => router.push('/allies-added'),
          },
          {
            text: 'Set Up Codeword',
            onPress: () => {
              // Navigate to codeword creation with the selected ally
              router.push(
                `/create-codeword?ally=${firstSelectedId}&name=${encodeURIComponent(firstSelectedAlly.name)}`,
              );
            },
          },
        ],
      );
    } else {
      // No allies selected, just go to confirmation
      router.push('/allies-added');
    }
  };

  const renderContact = ({ item }: { item: Contact }) => {
    const isSelected = selectedContacts.has(item.id);

    return (
      <Pressable style={styles.contactItem} onPress={() => handleContactToggle(item.id)}>
        <View style={styles.contactLeft}>
          <View style={[styles.avatar, { backgroundColor: item.backgroundColor }]}>
            {item.imageUri && item.imageUri !== 'mock' ? (
              // Real image would go here
              <Text style={styles.avatarText}>{item.initials}</Text>
            ) : item.id === 'mock4' ? (
              // Mock image for Paul Gardner
              <View style={styles.mockImage} />
            ) : (
              <Text style={styles.avatarText}>{item.initials}</Text>
            )}
          </View>
          <Text style={styles.contactName}>{item.name}</Text>
        </View>

        <View style={[styles.checkbox, isSelected && styles.checkboxSelected]}>
          {isSelected && <View style={styles.checkmark} />}
        </View>
      </Pressable>
    );
  };

  const selectedCount = selectedContacts.size;
  const buttonText =
    selectedCount === 0
      ? 'Add Ally'
      : selectedCount === 1
        ? 'Add 1 Ally'
        : `Add ${selectedCount} Allies`;

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Pressable onPress={handleBack} style={styles.backButton}>
          <Text style={styles.backIcon}>‹</Text>
        </Pressable>
      </View>

      {/* Title */}
      <Text style={styles.title}>Choose from your contacts</Text>
      <Text style={styles.subtitle}>
        Choose up to three people who you want to add to your list of allies.
      </Text>

      {/* Contacts List */}
      <FlatList
        data={contacts}
        renderItem={renderContact}
        keyExtractor={(item) => item.id}
        style={styles.contactsList}
        contentContainerStyle={styles.contactsListContent}
        showsVerticalScrollIndicator={false}
      />

      {/* Add Allies Button */}
      <View style={[styles.footer, { paddingBottom: insets.bottom + 20 }]}>
        <Pressable
          style={[styles.addButton, selectedCount === 0 && styles.addButtonDisabled]}
          onPress={handleAddAllies}
          disabled={selectedCount === 0}
        >
          <Text style={[styles.addButtonText, selectedCount === 0 && styles.addButtonTextDisabled]}>
            {buttonText}
          </Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F3F5',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    paddingHorizontal: 20,
    paddingTop: 10,
    height: 50,
  },
  backButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  backIcon: {
    fontSize: 24,
    color: '#1B1D22',
    fontWeight: '300',
  },
  title: {
    fontSize: 32,
    fontWeight: '700',
    color: '#1B1D22',
    paddingHorizontal: 20,
    marginBottom: 12,
  },
  subtitle: {
    fontSize: 16,
    color: '#666666',
    paddingHorizontal: 20,
    marginBottom: 32,
    lineHeight: 22,
  },
  contactsList: {
    flex: 1,
    paddingHorizontal: 20,
  },
  contactsListContent: {
    paddingBottom: 20,
  },
  contactItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  contactLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  avatarText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  mockImage: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#DDDDDD',
  },
  contactName: {
    fontSize: 18,
    fontWeight: '500',
    color: '#1B1D22',
  },
  checkbox: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#E5E7EB',
    backgroundColor: 'transparent',
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkboxSelected: {
    backgroundColor: '#642975',
    borderColor: '#642975',
  },
  checkmark: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#FFFFFF',
  },
  footer: {
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  addButton: {
    backgroundColor: '#1B1D22',
    borderRadius: 25,
    paddingVertical: 16,
    alignItems: 'center',
  },
  addButtonDisabled: {
    backgroundColor: '#E5E7EB',
  },
  addButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  addButtonTextDisabled: {
    color: '#999999',
  },
});
