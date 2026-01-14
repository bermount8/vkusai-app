import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { router } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaView } from 'react-native-safe-area-context';

interface DietOption {
  id: string;
  title: string;
  icon: string;
}

function DietScreen() {
  const [selectedDiet, setSelectedDiet] = useState<string | null>(null);

  const dietOptions: DietOption[] = [
    {
      id: 'classic',
      title: 'Classic',
      icon: '🍗'
    },
    {
      id: 'pescatarian',
      title: 'Pescatarian',
      icon: '🐟'
    },
    {
      id: 'vegetarian',
      title: 'Vegetarian',
      icon: '🥦'
    },
    {
      id: 'vegan',
      title: 'Vegan',
      icon: '🌱'
    }
  ];

  const handleContinue = () => {
    if (!selectedDiet) return;
    
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
          <View style={[styles.progressBar, { width: '65%' }]} />
        </View>
        
        <View style={styles.languageContainer}>
          <Text style={styles.languageText}>🇺🇸 EN</Text>
        </View>
      </View>
      
      <View style={styles.content}>
        <Text style={styles.title}>Do you follow a specific diet?</Text>
        
        <View style={styles.dietOptionsContainer}>
          {dietOptions.map((diet) => (
            <TouchableOpacity
              key={diet.id}
              style={[
                styles.dietOption,
                selectedDiet === diet.id && styles.dietOptionSelected
              ]}
              onPress={() => setSelectedDiet(diet.id)}
            >
              <Text style={styles.dietIcon}>{diet.icon}</Text>
              <Text style={[
                styles.dietTitle,
                selectedDiet === diet.id && styles.dietTitleSelected
              ]}>
                {diet.title}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
        
        <TouchableOpacity 
          style={[
            styles.continueButton,
            selectedDiet ? styles.continueButtonActive : styles.continueButtonInactive
          ]}
          onPress={handleContinue}
          disabled={!selectedDiet}
        >
          <Text style={styles.continueButtonText}>Continue</Text>
        </TouchableOpacity>
        
        <View style={styles.paginationDots}>
          <View style={styles.paginationDot} />
        </View>
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
  title: {
    fontSize: 32,
    fontWeight: 'bold' as const,
    marginBottom: 40,
  },
  dietOptionsContainer: {
    gap: 16,
    marginBottom: 'auto',
  },
  dietOption: {
    flexDirection: 'row' as const,
    alignItems: 'center' as const,
    backgroundColor: '#F5F5F7',
    borderRadius: 12,
    padding: 20,
  },
  dietOptionSelected: {
    backgroundColor: '#F5F5F7',
    borderWidth: 2,
    borderColor: '#000',
  },
  dietIcon: {
    fontSize: 24,
    marginRight: 16,
  },
  dietTitle: {
    fontSize: 18,
    fontWeight: '500' as const,
  },
  dietTitleSelected: {
    fontWeight: '600' as const,
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
  paginationDots: {
    flexDirection: 'row' as const,
    justifyContent: 'center' as const,
    marginTop: 16,
  },
  paginationDot: {
    width: 40,
    height: 4,
    backgroundColor: '#000',
    borderRadius: 2,
  },
});

export default DietScreen;
