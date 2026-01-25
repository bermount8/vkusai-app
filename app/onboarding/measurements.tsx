import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { router } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MeasurementWheelPicker } from '../components/MeasurementWheelPicker';

function MeasurementsScreen() {
  const [selectedHeight, setSelectedHeight] = useState<number>(170);
  const [selectedWeight, setSelectedWeight] = useState<number>(70);

  // Generate height options: 140-220 cm
  const heightOptions = Array.from({ length: 81 }, (_, i) => 140 + i);
  
  // Generate weight options: 40-150 kg
  const weightOptions = Array.from({ length: 111 }, (_, i) => 40 + i);

  const handleContinue = () => {
    // Save measurements to app state/context here
    
    // Navigate to the next screen
    router.push('/onboarding/birthdate');
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
        <Text style={styles.title}>Height & weight</Text>
        <Text style={styles.subtitle}>
          This will be used to calibrate your custom plan.
        </Text>
        
        {/* Removed unit switch - using only metric units */}
        
        <View style={styles.measurementsContainer}>
          <View style={styles.measurementColumn}>
            <Text style={styles.measurementTitle}>Height</Text>
            <MeasurementWheelPicker
              values={heightOptions}
              unit="cm"
              initialValue={selectedHeight}
              onValueChange={setSelectedHeight}
            />
          </View>
          
          <View style={styles.measurementColumn}>
            <Text style={styles.measurementTitle}>Weight</Text>
            <MeasurementWheelPicker
              values={weightOptions}
              unit="kg"
              initialValue={selectedWeight}
              onValueChange={setSelectedWeight}
            />
          </View>
        </View>
        
        <TouchableOpacity 
          style={styles.continueButton}
          onPress={handleContinue}
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
    width: '50%',
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
    marginBottom: 24,
  },
  measurementsContainer: {
    flexDirection: 'row' as const,
    justifyContent: 'space-between' as const,
    marginBottom: 48,
    paddingHorizontal: 32,
    marginTop: 20,
  },
  measurementColumn: {
    flex: 1,
    alignItems: 'center' as const,
  },
  measurementTitle: {
    fontSize: 16,
    fontWeight: '500' as const,
    marginBottom: 20,
    color: '#000',
    minHeight: 18,
  },
  continueButton: {
    backgroundColor: '#000',
    borderRadius: 30,
    paddingVertical: 16,
    alignItems: 'center' as const,
    marginTop: 'auto',
    marginBottom: 24,
  },
  continueButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600' as const,
  },
});

export default MeasurementsScreen;
