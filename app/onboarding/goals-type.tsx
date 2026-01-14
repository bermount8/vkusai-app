import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { router } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaView } from 'react-native-safe-area-context';

interface GoalOption {
  id: string;
  title: string;
}

function GoalsTypeScreen() {
  const [selectedGoal, setSelectedGoal] = useState<string | null>(null);

  const goalOptions: GoalOption[] = [
    {
      id: 'lose',
      title: 'Lose weight'
    },
    {
      id: 'maintain',
      title: 'Maintain'
    },
    {
      id: 'gain',
      title: 'Gain weight'
    }
  ];

  const handleContinue = () => {
    if (!selectedGoal) return;
    
    // Navigate to the next screen
    router.push('/onboarding/goals');
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
        <Text style={styles.title}>What is your goal?</Text>
        <Text style={styles.subtitle}>
          This helps us generate a plan for your calorie intake.
        </Text>
        
        <View style={styles.optionsContainer}>
          {goalOptions.map((option) => (
            <TouchableOpacity
              key={option.id}
              style={[
                styles.optionButton,
                selectedGoal === option.id && styles.selectedOptionButton
              ]}
              onPress={() => setSelectedGoal(option.id)}
            >
              <Text 
                style={[
                  styles.optionTitle,
                  selectedGoal === option.id && styles.selectedOptionText
                ]}
              >
                {option.title}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
        
        <TouchableOpacity 
          style={[
            styles.continueButton,
            selectedGoal ? styles.continueButtonActive : styles.continueButtonInactive
          ]}
          onPress={handleContinue}
          disabled={!selectedGoal}
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
    width: '40%',
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
    alignItems: 'flex-start' as const,
  },
  selectedOptionButton: {
    backgroundColor: '#000',
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

export default GoalsTypeScreen;
