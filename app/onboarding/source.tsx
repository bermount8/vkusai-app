import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { router } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaView } from 'react-native-safe-area-context';

interface SourceOption {
  id: string;
  title: string;
  icon: string;
}

function SourceScreen() {
  const [selectedSource, setSelectedSource] = useState<string | null>(null);

  const sourceOptions: SourceOption[] = [
    {
      id: 'appstore',
      title: 'App Store',
      icon: '🍎'
    },
    {
      id: 'tiktok',
      title: 'TikTok',
      icon: '🎵'
    },
    {
      id: 'youtube',
      title: 'YouTube',
      icon: '📺'
    },
    {
      id: 'tv',
      title: 'TV',
      icon: '📺'
    },
    {
      id: 'x',
      title: 'X',
      icon: '🐦'
    },
    {
      id: 'instagram',
      title: 'Instagram',
      icon: '📷'
    },
    {
      id: 'google',
      title: 'Google',
      icon: '🔍'
    },
    {
      id: 'facebook',
      title: 'Facebook',
      icon: '📘'
    }
  ];

  const handleContinue = () => {
    if (!selectedSource) return;
    
    // Navigate to the progress screen
    router.push('/onboarding/progress');
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="dark" />
      
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
          <Text style={styles.backButtonText}>←</Text>
        </TouchableOpacity>
        
        <View style={styles.progressContainer}>
          <View style={[styles.progressBar, { width: '85%' }]} />
        </View>
        
        <View style={styles.languageContainer}>
          <Text style={styles.languageText}>🇺🇸 EN</Text>
        </View>
      </View>
      
      <View style={styles.content}>
        <Text style={styles.title}>Where did you hear about us?</Text>
        
        <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={true}>
          <View style={styles.optionsContainer}>
            {sourceOptions.map((source) => (
              <TouchableOpacity
                key={source.id}
                style={[
                  styles.optionButton,
                  selectedSource === source.id && styles.selectedOptionButton
                ]}
                onPress={() => setSelectedSource(source.id)}
              >
                <Text style={styles.optionIcon}>{source.icon}</Text>
                <Text style={[
                  styles.optionTitle,
                  selectedSource === source.id && styles.selectedOptionText
                ]}>
                  {source.title}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </ScrollView>
        
        <TouchableOpacity 
          style={[
            styles.continueButton,
            selectedSource ? styles.continueButtonActive : styles.continueButtonInactive
          ]}
          onPress={handleContinue}
          disabled={!selectedSource}
        >
          <Text style={styles.continueButtonText}>Continue</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row' as const,
    alignItems: 'center' as const,
    paddingHorizontal: 16,
    paddingTop: 8,
  },
  backButton: {
    padding: 8,
  },
  backButtonText: {
    fontSize: 24,
    fontWeight: '300' as const,
  },
  progressContainer: {
    flex: 1,
    height: 4,
    backgroundColor: '#E5E5EA',
    borderRadius: 2,
    marginHorizontal: 16,
  },
  progressBar: {
    height: '100%',
    backgroundColor: '#000',
    borderRadius: 2,
  },
  languageContainer: {
    padding: 8,
  },
  languageText: {
    fontSize: 16,
  },
  content: {
    flex: 1,
    padding: 24,
  },
  scrollView: {
    flex: 1,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold' as const,
    marginBottom: 8,
    color: '#000',
  },
  optionsContainer: {
    marginVertical: 32,
    gap: 16,
  },
  optionButton: {
    backgroundColor: '#F5F5F7',
    borderRadius: 12,
    padding: 20,
    alignItems: 'center' as const,
  },
  selectedOptionButton: {
    backgroundColor: '#000',
  },
  optionIcon: {
    fontSize: 28,
    marginRight: 16,
  },
  optionTitle: {
    fontSize: 18,
    fontWeight: '500' as const,
    color: '#000',
  },
  selectedOptionText: {
    color: '#fff',
  },
  continueButton: {
    borderRadius: 30,
    paddingVertical: 16,
    alignItems: 'center' as const,
    marginTop: 'auto',
    marginBottom: 16,
  },
  continueButtonActive: {
    backgroundColor: '#000',
  },
  continueButtonInactive: {
    backgroundColor: '#D1D1D6',
  },
  continueButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600' as const,
  },
});

export default SourceScreen;
