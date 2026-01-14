import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { router } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaView } from 'react-native-safe-area-context';

function MeasurementsScreen() {
  const [selectedHeight, setSelectedHeight] = useState<number>(170);
  const [selectedWeight, setSelectedWeight] = useState<number>(70);
  // Using only metric units

  // Generate height options (cm) centered around 170cm
  const heightOptions = Array.from({ length: 100 }, (_, i) => 120 + i); // 120cm to 219cm
  
  // Generate weight options (kg) centered around 70kg
  const weightOptions = Array.from({ length: 150 }, (_, i) => 30 + i); // 30kg to 179kg

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
            <View style={styles.pickerWrapper}>
              <Text style={styles.pickerAboveValue}>{selectedHeight > heightOptions[0] ? selectedHeight - 1 : ''} cm</Text>
              <View style={styles.selectedValueContainer}>
                <Text style={styles.selectedValue}>{selectedHeight} cm</Text>
              </View>
              <Text style={styles.pickerBelowValue}>{selectedHeight < heightOptions[heightOptions.length - 1] ? selectedHeight + 1 : ''} cm</Text>
              <ScrollView 
                style={styles.pickerScrollView} 
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.pickerScrollContent}
              >
                {heightOptions.map((height) => (
                  <TouchableOpacity
                    key={`height-${height}`}
                    style={styles.pickerItem}
                    onPress={() => setSelectedHeight(height)}
                  >
                    <Text style={styles.pickerItemText}>{height} cm</Text>
                  </TouchableOpacity>
                ))}
              </ScrollView>
            </View>
          </View>
          
          <View style={styles.measurementColumn}>
            <Text style={styles.measurementTitle}>Weight</Text>
            <View style={styles.pickerWrapper}>
              <Text style={styles.pickerAboveValue}>{selectedWeight > weightOptions[0] ? selectedWeight - 1 : ''} kg</Text>
              <View style={styles.selectedValueContainer}>
                <Text style={styles.selectedValue}>{selectedWeight} kg</Text>
              </View>
              <Text style={styles.pickerBelowValue}>{selectedWeight < weightOptions[weightOptions.length - 1] ? selectedWeight + 1 : ''} kg</Text>
              <ScrollView 
                style={styles.pickerScrollView} 
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.pickerScrollContent}
              >
                {weightOptions.map((weight) => (
                  <TouchableOpacity
                    key={`weight-${weight}`}
                    style={styles.pickerItem}
                    onPress={() => setSelectedWeight(weight)}
                  >
                    <Text style={styles.pickerItemText}>{weight} kg</Text>
                  </TouchableOpacity>
                ))}
              </ScrollView>
            </View>
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
    marginBottom: 32,
  },
  // Removed unit switch styles
  measurementsContainer: {
    flexDirection: 'row' as const,
    justifyContent: 'space-between' as const,
    marginBottom: 32,
  },
  measurementColumn: {
    flex: 1,
    alignItems: 'center' as const,
  },
  measurementTitle: {
    fontSize: 16,
    fontWeight: '500' as const,
    marginBottom: 16,
  },
  pickerWrapper: {
    height: 120,
    width: '80%',
    position: 'relative' as const,
    alignItems: 'center' as const,
    justifyContent: 'center' as const,
    backgroundColor: '#F5F5F7',
    borderRadius: 12,
    padding: 16,
    overflow: 'hidden' as const, // Ensure content doesn't spill out
  },
  pickerScrollView: {
    position: 'absolute' as const,
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    opacity: 0.01, // Very slight opacity to make it interactive but virtually invisible
    zIndex: 10, // Ensure it's on top to receive touch events
  },
  pickerScrollContent: {
    paddingVertical: 100,
  },
  pickerItem: {
    height: 40,
    justifyContent: 'center' as const,
    alignItems: 'center' as const,
  },
  pickerItemText: {
    fontSize: 16,
  },
  selectedValueContainer: {
    height: 40,
    justifyContent: 'center' as const,
    alignItems: 'center' as const,
    width: '100%',
  },
  selectedValue: {
    fontSize: 18,
    fontWeight: 'bold' as const,
    color: '#000',
  },
  pickerAboveValue: {
    fontSize: 16,
    color: '#999',
    marginBottom: 4,
  },
  pickerBelowValue: {
    fontSize: 16,
    color: '#999',
    marginTop: 4,
  },
  continueButton: {
    backgroundColor: '#000',
    borderRadius: 30,
    paddingVertical: 16,
    alignItems: 'center' as const,
    marginTop: 'auto',
    marginBottom: 16,
  },
  continueButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600' as const,
  },
});

export default MeasurementsScreen;
