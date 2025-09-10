import AsyncStorage from '@react-native-async-storage/async-storage';

const STORAGE_KEYS = {
  ONBOARDING_COMPLETED: '@codeword_onboarding_completed',
  USER_DATA: '@codeword_user_data',
  SELECTED_ALLIES: '@codeword_selected_allies',
};

export const storage = {
  // Check if onboarding has been completed
  async hasCompletedOnboarding(): Promise<boolean> {
    try {
      const value = await AsyncStorage.getItem(STORAGE_KEYS.ONBOARDING_COMPLETED);
      return value === 'true';
    } catch (error) {
      console.error('Error checking onboarding status:', error);
      return false;
    }
  },

  // Mark onboarding as completed
  async setOnboardingCompleted(): Promise<void> {
    try {
      await AsyncStorage.setItem(STORAGE_KEYS.ONBOARDING_COMPLETED, 'true');
    } catch (error) {
      console.error('Error setting onboarding status:', error);
    }
  },

  // Clear onboarding status (for testing)
  async clearOnboardingStatus(): Promise<void> {
    try {
      await AsyncStorage.removeItem(STORAGE_KEYS.ONBOARDING_COMPLETED);
    } catch (error) {
      console.error('Error clearing onboarding status:', error);
    }
  },

  // Save user data
  async saveUserData(data: any): Promise<void> {
    try {
      await AsyncStorage.setItem(STORAGE_KEYS.USER_DATA, JSON.stringify(data));
    } catch (error) {
      console.error('Error saving user data:', error);
    }
  },

  // Get user data
  async getUserData(): Promise<any> {
    try {
      const data = await AsyncStorage.getItem(STORAGE_KEYS.USER_DATA);
      return data ? JSON.parse(data) : null;
    } catch (error) {
      console.error('Error getting user data:', error);
      return null;
    }
  },

  // Save selected allies
  async saveSelectedAllies(allies: any[]): Promise<void> {
    try {
      await AsyncStorage.setItem(STORAGE_KEYS.SELECTED_ALLIES, JSON.stringify(allies));
    } catch (error) {
      console.error('Error saving selected allies:', error);
    }
  },

  // Get selected allies
  async getSelectedAllies(): Promise<any[]> {
    try {
      const data = await AsyncStorage.getItem(STORAGE_KEYS.SELECTED_ALLIES);
      return data ? JSON.parse(data) : [];
    } catch (error) {
      console.error('Error getting selected allies:', error);
      return [];
    }
  },

  // Clear selected allies
  async clearSelectedAllies(): Promise<void> {
    try {
      await AsyncStorage.removeItem(STORAGE_KEYS.SELECTED_ALLIES);
    } catch (error) {
      console.error('Error clearing selected allies:', error);
    }
  },
};
