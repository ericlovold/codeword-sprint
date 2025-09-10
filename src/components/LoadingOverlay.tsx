import React from 'react';
import { View, Text, StyleSheet, Modal } from 'react-native';
import LoadingSpinner from './LoadingSpinner';

interface LoadingOverlayProps {
  visible: boolean;
  message?: string;
  backgroundColor?: string;
}

export const LoadingOverlay: React.FC<LoadingOverlayProps> = ({
  visible,
  message = 'Loading...',
  backgroundColor = 'rgba(0, 0, 0, 0.5)',
}) => {
  if (!visible) return null;

  return (
    <Modal transparent visible={visible} animationType="fade">
      <View style={[styles.overlay, { backgroundColor }]}>
        <View style={styles.container}>
          <LoadingSpinner size="large" color="#642975" />
          <Text style={styles.message}>{message}</Text>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 32,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 8,
    elevation: 8,
    minWidth: 120,
  },
  message: {
    marginTop: 16,
    fontSize: 16,
    color: '#1B1D22',
    fontWeight: '500',
    textAlign: 'center',
  },
});

export default LoadingOverlay;
