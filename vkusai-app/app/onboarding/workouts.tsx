import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { router } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaView } from 'react-native-safe-area-context';

interface WorkoutOption {
  id: string;
  title: string;
  description: string;
  icon: string;
}

function WorkoutsScreen() {
  const [selectedOption, setSelectedOption] = useState<string | null>(null);

  const workoutOptions: WorkoutOption[] = [
    {
      id: '0-2',
      title: '0-2',
      description: 'Workouts now and then',
      icon: '💪'
    },
    {
      id: '3-5',
      title: '3-5',
      description: 'A few workouts per week',
      icon: '🏋️‍♀️'
    },
    {
      id: '6+',
      title: '6+',
      description: 'Dedicated athlete',
      icon: '🏆'
    }
  ];

  const handleContinue = () => {
    if (!selectedOption) return;
    
    // Navigate to the next screen
    router.push('/onboarding/measurements');
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="dark" />
      
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
          <Text style={styles.backButtonText}>←</Text>
        </TouchableOpacity>
        
        <View style={styles.progressContainer}>
          <View style={styles.progressBar} />
        </View>
        
        <View style={styles.languageContainer}>
          <Text style={styles.languageText}>🇺🇸 EN</Text>
        </View>
      </View>
      
      <View style={styles.content}>
        <Text style={styles.title}>How many workouts{'\n'}do you do per week?</Text>
        <Text style={styles.subtitle}>
          This will be used to calibrate your custom plan.
        </Text>
        
        <View style={styles.optionsContainer}>
          {workoutOptions.map((option) => (
            <TouchableOpacity
              key={option.id}
              style={[
                styles.optionButton,
                selectedOption === option.id && styles.selectedOptionButton
              ]}
              onPress={() => setSelectedOption(option.id)}
            >
              <View style={styles.optionContent}>
                <Text style={styles.optionIcon}>
                  {option.icon}
                </Text>
                <View style={styles.optionTextContainer}>
                  <Text 
                    style={[
                      styles.optionTitle,
                      selectedOption === option.id && styles.selectedOptionText
                    ]}
                  >
                    {option.title}
                  </Text>
                  <Text 
                    style={[
                      styles.optionDescription,
                      selectedOption === option.id && styles.selectedOptionText
                    ]}
                  >
                    {option.description}
                  </Text>
                </View>
              </View>
            </TouchableOpacity>
          ))}
        </View>
        
        <TouchableOpacity 
          style={[
            styles.continueButton,
            selectedOption ? styles.continueButtonActive : styles.continueButtonInactive
          ]}
          onPress={handleContinue}
          disabled={!selectedOption}
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
    width: '30%',
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
  title: {
    fontSize: 32,
    fontWeight: 'bold' as const,
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    marginBottom: 40,
  },
  optionsContainer: {
    marginVertical: 24,
    gap: 16,
  },
  optionButton: {
    backgroundColor: '#F5F5F7',
    borderRadius: 12,
    padding: 20,
  },
  selectedOptionButton: {
    backgroundColor: '#000',
  },
  optionContent: {
    flexDirection: 'row' as const,
    alignItems: 'center' as const,
  },
  optionIcon: {
    fontSize: 28,
    marginRight: 16,
  },
  optionTextContainer: {
    flex: 1,
  },
  optionTitle: {
    fontSize: 18,
    fontWeight: '500' as const,
    marginBottom: 4,
    color: '#000',
  },
  optionDescription: {
    fontSize: 14,
    color: '#666',
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

export default WorkoutsScreen;
