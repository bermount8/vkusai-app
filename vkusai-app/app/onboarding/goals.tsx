import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, useColorScheme } from 'react-native';
import { router } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaView } from 'react-native-safe-area-context';
import Slider from '@react-native-community/slider';

interface Goal {
  id: string;
  title: string;
  description: string;
}

function Goals() {
  const [selectedGoal, setSelectedGoal] = useState<string | null>(null);
  const [calorieTarget, setCalorieTarget] = useState(2000);
  const [isLoading, setIsLoading] = useState(false);

  const goals: Goal[] = [
    {
      id: 'lose-weight',
      title: 'Lose weight',
      description: 'Track calories and macros to achieve a calorie deficit'
    },
    {
      id: 'maintain',
      title: 'Maintain',
      description: 'Balance your nutrition while maintaining your current weight'
    },
    {
      id: 'gain-weight',
      title: 'Gain weight',
      description: 'Track calories and protein to support muscle growth'
    }
  ];

  const handleContinue = () => {
    if (!selectedGoal) return;
    
    setIsLoading(true);
    
    // TODO: Save user preferences to Supabase
    // For now, navigate to the subscription screen
    setTimeout(() => {
      router.push('/onboarding/subscription');
    }, 1000);
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
      
      <ScrollView style={styles.scrollView}>
        <View style={styles.content}>
          <Text style={styles.title}>What is your goal?</Text>
          <Text style={styles.subtitle}>
            This helps us generate a plan for your calorie intake
          </Text>
          
          <View style={styles.goalsContainer}>
            {goals.map((goal) => (
              <TouchableOpacity
                key={goal.id}
                style={[
                  styles.goalCard,
                  selectedGoal === goal.id && styles.goalCardSelected
                ]}
                onPress={() => setSelectedGoal(goal.id)}
              >
                <Text style={[
                  styles.goalTitle,
                  selectedGoal === goal.id && styles.goalTitleSelected
                ]}>
                  {goal.title}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
          
          <View style={styles.section}>
            <Text style={styles.calorieTitle}>Daily calorie target</Text>
            <Text style={styles.calorieValue}>{calorieTarget} calories</Text>
            <Slider
              style={styles.slider}
              minimumValue={1200}
              maximumValue={4000}
              step={50}
              value={calorieTarget}
              onValueChange={setCalorieTarget}
              minimumTrackTintColor="#000"
              maximumTrackTintColor="#D1D1D6"
              thumbTintColor="#000"
            />
            <View style={styles.sliderLabels}>
              <Text style={styles.sliderLabel}>1200</Text>
              <Text style={styles.sliderLabel}>4000</Text>
            </View>
          </View>
          
          <TouchableOpacity
            style={[
              styles.continueButton,
              selectedGoal && !isLoading ? styles.continueButtonActive : styles.continueButtonInactive
            ]}
            onPress={handleContinue}
            disabled={!selectedGoal || isLoading}
          >
            <Text style={styles.continueButtonText}>
              {isLoading ? 'Setting up...' : 'Continue'}
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

export default Goals;

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
    width: '70%',
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
  scrollView: {
    flex: 1,
  },
  content: {
    padding: 24,
    paddingBottom: 40,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold' as const,
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    marginBottom: 32,
  },
  section: {
    marginBottom: 32,
  },
  goalsContainer: {
    marginVertical: 24,
    gap: 16,
  },
  calorieTitle: {
    fontSize: 20,
    fontWeight: '600' as const,
    marginBottom: 20,
    marginTop: 16,
  },
  goalCard: {
    borderRadius: 12,
    padding: 20,
    backgroundColor: '#F5F5F7',
    marginBottom: 12,
    alignItems: 'flex-start' as const,
  },
  goalCardSelected: {
    backgroundColor: '#000',
  },
  goalTitle: {
    fontSize: 18,
    fontWeight: '600' as const,
    marginBottom: 4,
  },
  goalTitleSelected: {
    color: '#fff',
  },
  goalDescription: {
    fontSize: 14,
    color: '#666',
  },
  goalDescriptionSelected: {
    color: '#ccc',
  },
  calorieValue: {
    fontSize: 28,
    fontWeight: 'bold' as const,
    textAlign: 'center',
    marginBottom: 20,
    color: '#000',
  },
  slider: {
    width: '100%' as const,
    height: 40,
  },
  sliderLabels: {
    flexDirection: 'row' as const,
    justifyContent: 'space-between' as const,
    marginTop: -8,
  },
  sliderLabel: {
    color: '#999',
    fontSize: 12,
  },
  continueButton: {
    borderRadius: 30,
    paddingVertical: 16,
    alignItems: 'center' as const,
    marginTop: 32,
    marginBottom: 16,
  },
  continueButtonActive: {
    backgroundColor: '#000',
  },
  continueButtonInactive: {
    backgroundColor: '#D1D1D6',
  },
  continueButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: '600' as const,
  },
});
