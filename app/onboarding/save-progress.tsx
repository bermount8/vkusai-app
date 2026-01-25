import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';

export default function SaveProgressScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>

        {/* Title */}
        <Text style={styles.title}>Save your progress</Text>
        <Text style={styles.subtitle}>
          So you don't lose your plan and results
        </Text>

        {/* Buttons */}
        <View style={styles.buttons}>

          {/* Apple */}
          <TouchableOpacity style={styles.appleButton}>
            <Text style={styles.appleText}> Sign in with Apple</Text>
          </TouchableOpacity>

          {/* Google */}
          <TouchableOpacity style={styles.googleButton}>
            <Text style={styles.googleText}>Sign in with Google</Text>
          </TouchableOpacity>

        </View>

        {/* Skip */}
        <TouchableOpacity onPress={() => router.push('/onboarding/subscription')}>
          <Text style={styles.skip}>
            Would you like to sign in later? <Text style={styles.skipBold}>Skip</Text>
          </Text>
        </TouchableOpacity>

      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 24,
  },

  content: {
    marginTop: 120,
    alignItems: 'center',
  },

  title: {
    fontSize: 22,
    fontWeight: '600',
    marginBottom: 8,
  },

  subtitle: {
    fontSize: 14,
    color: '#6C6C70',
    marginBottom: 48,
    textAlign: 'center',
  },

  buttons: {
    width: '100%',
    gap: 14,
    marginBottom: 24,
  },

  appleButton: {
    backgroundColor: '#000',
    borderRadius: 28,
    paddingVertical: 16,
    alignItems: 'center',
  },

  appleText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },

  googleButton: {
    borderWidth: 1,
    borderColor: '#E5E5EA',
    borderRadius: 28,
    paddingVertical: 16,
    alignItems: 'center',
  },

  googleText: {
    fontSize: 16,
    fontWeight: '500',
  },

  skip: {
    fontSize: 13,
    color: '#8E8E93',
  },

  skipBold: {
    fontWeight: '500',
    color: '#000',
  },
});
