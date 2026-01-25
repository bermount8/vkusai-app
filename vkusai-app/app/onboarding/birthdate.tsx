import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { router } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaView } from 'react-native-safe-area-context';

function BirthdateScreen() {
  const [selectedMonth, setSelectedMonth] = useState<string>('January');
  const [selectedDay, setSelectedDay] = useState<number>(1);
  const [selectedYear, setSelectedYear] = useState<number>(2000);

  // Generate month options
  const monthOptions = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];
  
  // Generate day options (1-31)
  const dayOptions = Array.from({ length: 31 }, (_, i) => i + 1);
  
  // Generate year options centered around 2000
  const yearOptions = Array.from({ length: 50 }, (_, i) => 2000 - 25 + i); // 1975 to 2024
  const [initialYearIndex] = useState<number>(25); // Start with year 2000 selected

  const handleContinue = () => {
    // Save birthdate to app state/context here
    
    // Navigate to the diet screen
    router.push('/onboarding/diet');
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
        <Text style={styles.title}>When were you born?</Text>
        <Text style={styles.subtitle}>
          This will be used to calibrate your custom plan.
        </Text>
                <View style={styles.datePickerContainer}>
            <View style={styles.pickerWrapper}>
              <Text style={styles.pickerAboveValue}>{monthOptions[monthOptions.indexOf(selectedMonth) - 1] || ''}</Text>
              <View style={styles.selectedValueContainer}>
                <Text style={styles.selectedValue}>{selectedMonth}</Text>
              </View>
              <Text style={styles.pickerBelowValue}>{monthOptions[monthOptions.indexOf(selectedMonth) + 1] || ''}</Text>
              <ScrollView 
                style={styles.pickerScrollView} 
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.pickerScrollContent}
              >
                {monthOptions.map((month) => (
                  <TouchableOpacity
                    key={`month-${month}`}
                    style={styles.pickerItem}
                    onPress={() => setSelectedMonth(month)}
                  >
                    <Text style={styles.pickerItemText}>{month}</Text>
                  </TouchableOpacity>
                ))}
              </ScrollView>
            </View>
            
            <View style={styles.pickerWrapper}>
              <Text style={styles.pickerAboveValue}>{selectedDay > 1 ? selectedDay - 1 : ''}</Text>
              <View style={styles.selectedValueContainer}>
                <Text style={styles.selectedValue}>{selectedDay}</Text>
              </View>
              <Text style={styles.pickerBelowValue}>{selectedDay < 31 ? selectedDay + 1 : ''}</Text>
              <ScrollView 
                style={styles.pickerScrollView} 
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.pickerScrollContent}
              >
                {dayOptions.map((day) => (
                  <TouchableOpacity
                    key={`day-${day}`}
                    style={styles.pickerItem}
                    onPress={() => setSelectedDay(day)}
                  >
                    <Text style={styles.pickerItemText}>{day}</Text>
                  </TouchableOpacity>
                ))}
              </ScrollView>
            </View>
            
            <View style={styles.pickerWrapper}>
              <Text style={styles.pickerAboveValue}>{selectedYear > yearOptions[0] ? selectedYear - 1 : ''}</Text>
              <View style={styles.selectedValueContainer}>
                <Text style={styles.selectedValue}>{selectedYear}</Text>
              </View>
              <Text style={styles.pickerBelowValue}>{selectedYear < yearOptions[yearOptions.length - 1] ? selectedYear + 1 : ''}</Text>
              <ScrollView 
                style={styles.pickerScrollView} 
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.pickerScrollContent}
              >
                {yearOptions.map((year) => (
                  <TouchableOpacity
                    key={`year-${year}`}
                    style={styles.pickerItem}
                    onPress={() => setSelectedYear(year)}
                  >
                    <Text style={styles.pickerItemText}>{year}</Text>
                  </TouchableOpacity>
                ))}
              </ScrollView>
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
    width: '60%',
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
  datePickerContainer: {
    flexDirection: 'row' as const,
    justifyContent: 'space-between' as const,
    marginBottom: 32,
    backgroundColor: '#F5F5F7',
    borderRadius: 12,
    padding: 16,
    height: 120,
  },
  pickerWrapper: {
    flex: 1,
    height: 90,
    position: 'relative' as const,
    alignItems: 'center' as const,
    justifyContent: 'center' as const,
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

export default BirthdateScreen;
