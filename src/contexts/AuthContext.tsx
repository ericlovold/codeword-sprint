import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { apiFetch } from '../api/base';

type AuthState = {
  token: string | null;
  userId: string | null;
  user?: {
    id: string;
    email?: string;
    name?: string;
    authProvider: string;
  } | null;
};

type AuthContextType = {
  state: AuthState;
  loading: boolean;
  signIn: (payload: {
    provider: 'apple' | 'google';
    idToken: string;
    userInfo?: any;
  }) => Promise<void>;
  signOut: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, setState] = useState<AuthState>({ token: null, userId: null, user: null });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const token = await AsyncStorage.getItem('auth.token');
        const userId = await AsyncStorage.getItem('auth.userId');
        const userJson = await AsyncStorage.getItem('auth.user');
        const user = userJson ? JSON.parse(userJson) : null;

        setState({ token, userId, user });
      } catch (error) {
        console.error('Error loading auth state:', error);
        setState({ token: null, userId: null, user: null });
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const signIn = async ({
    provider,
    idToken,
    userInfo,
  }: {
    provider: 'apple' | 'google';
    idToken: string;
    userInfo?: any;
  }) => {
    try {
      // Exchange OAuth idToken for app session with your backend
      // Expect backend POST /auth/exchange → { token, user_id, user }
      const response = await apiFetch<{
        token: string;
        user_id: string;
        user: {
          id: string;
          email?: string;
          name?: string;
          authProvider: string;
        };
      }>('/auth/exchange', {
        method: 'POST',
        body: JSON.stringify({
          provider,
          id_token: idToken,
          user_info: userInfo,
        }),
      });

      // Store auth data
      await AsyncStorage.multiSet([
        ['auth.token', response.token],
        ['auth.userId', response.user_id],
        ['auth.user', JSON.stringify(response.user)],
      ]);

      setState({
        token: response.token,
        userId: response.user_id,
        user: response.user,
      });
    } catch (error) {
      console.error('Sign in error:', error);
      throw error;
    }
  };

  const signOut = async () => {
    try {
      // Optionally notify backend of logout
      if (state.token) {
        try {
          await apiFetch('/auth/logout', {
            method: 'POST',
            token: state.token,
          });
        } catch (error) {
          // Don't fail logout if backend call fails
          console.warn('Backend logout failed:', error);
        }
      }

      await AsyncStorage.multiRemove(['auth.token', 'auth.userId', 'auth.user']);
      setState({ token: null, userId: null, user: null });
    } catch (error) {
      console.error('Sign out error:', error);
      // Still clear state even if AsyncStorage fails
      setState({ token: null, userId: null, user: null });
    }
  };

  const value = useMemo(() => ({ state, loading, signIn, signOut }), [state, loading]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
};
