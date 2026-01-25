import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { router } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaView } from 'react-native-safe-area-context';

function Subscription() {
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);
  const handleSelectPlan = (plan: string) => {
    setSelectedPlan(plan);
  };

  const handleContinue = () => {
    if (!selectedPlan) return;
    
    // TODO: Implement Stripe integration
    // For now, navigate to the success screen
    router.push('/onboarding/success');
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="dark" />
      
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
          <Text style={styles.backButtonText}>←</Text>
        </TouchableOpacity>
        
        <View style={styles.progressContainer}>
          <View style={[styles.progressBar, { width: '90%' }]} />
        </View>
        
        <View style={styles.languageContainer}>
          <Text style={styles.languageText}>🇺🇸 EN</Text>
        </View>
      </View>
      
      <ScrollView style={styles.scrollView}>
        <View style={styles.content}>
          <Text style={styles.title}>Choose Your Plan</Text>
          <Text style={styles.subtitle}>
            Get access to AI-powered food recognition and calorie tracking
          </Text>
        
        <View style={styles.plansContainer}>
          <TouchableOpacity 
            style={[styles.planCard, selectedPlan === 'monthly' && styles.planCardSelected]} 
            onPress={() => handleSelectPlan('monthly')}
          >
            <View style={styles.planHeader}>
              <Text style={[styles.planName, selectedPlan === 'monthly' && styles.planTextSelected]}>Monthly</Text>
              <Text style={[styles.planPrice, selectedPlan === 'monthly' && styles.planTextSelected]}>$9.99</Text>
              <Text style={[styles.planBilling, selectedPlan === 'monthly' && styles.planBillingSelected]}>per month</Text>
            </View>
            
            <View style={styles.planFeatures}>
              <Text style={[styles.planFeature, selectedPlan === 'monthly' && styles.planTextSelected]}>• Unlimited meal tracking</Text>
              <Text style={[styles.planFeature, selectedPlan === 'monthly' && styles.planTextSelected]}>• AI food recognition</Text>
              <Text style={[styles.planFeature, selectedPlan === 'monthly' && styles.planTextSelected]}>• Detailed nutrition insights</Text>
              <Text style={[styles.planFeature, selectedPlan === 'monthly' && styles.planTextSelected]}>• Progress tracking</Text>
            </View>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={[styles.planCard, selectedPlan === 'annual' && styles.planCardSelected]} 
            onPress={() => handleSelectPlan('annual')}
          >
            {selectedPlan !== 'annual' && (
              <View style={styles.saveBadge}>
                <Text style={styles.saveBadgeText}>Save 33%</Text>
              </View>
            )}
            
            <View style={styles.planHeader}>
              <Text style={[styles.planName, selectedPlan === 'annual' && styles.planTextSelected]}>Annual</Text>
              <Text style={[styles.planPrice, selectedPlan === 'annual' && styles.planTextSelected]}>$79.99</Text>
              <Text style={[styles.planBilling, selectedPlan === 'annual' && styles.planBillingSelected]}>per year</Text>
            </View>
            
            <View style={styles.planFeatures}>
              <Text style={[styles.planFeature, selectedPlan === 'annual' && styles.planTextSelected]}>• Unlimited meal tracking</Text>
              <Text style={[styles.planFeature, selectedPlan === 'annual' && styles.planTextSelected]}>• AI food recognition</Text>
              <Text style={[styles.planFeature, selectedPlan === 'annual' && styles.planTextSelected]}>• Detailed nutrition insights</Text>
              <Text style={[styles.planFeature, selectedPlan === 'annual' && styles.planTextSelected]}>• Progress tracking</Text>
              <Text style={[styles.planFeature, selectedPlan === 'annual' && styles.planTextSelected]}>• Priority support</Text>
            </View>
          </TouchableOpacity>
        </View>
        
        <Text style={styles.termsText}>
          By subscribing, you agree to our Terms of Service and Privacy Policy. 
          You can cancel your subscription anytime.
        </Text>
        
        <TouchableOpacity 
          style={[
            styles.continueButton,
            selectedPlan ? styles.continueButtonActive : styles.continueButtonInactive
          ]}
          onPress={handleContinue}
          disabled={!selectedPlan}
        >
          <Text style={styles.continueButtonText}>Continue</Text>
        </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

export default Subscription;

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
    width: '20%',
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
    flex: 1,
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
  plansContainer: {
    gap: 20,
    marginBottom: 24,
  },
  planCard: {
    borderRadius: 12,
    padding: 20,
    backgroundColor: '#F5F5F7',
    position: 'relative',
    marginBottom: 16,
  },
  planCardSelected: {
    backgroundColor: '#000',
  },
  saveBadge: {
    position: 'absolute',
    top: -10,
    right: 20,
    backgroundColor: '#000',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 20,
  },
  saveBadgeText: {
    color: 'white',
    fontWeight: 'bold' as const,
    fontSize: 12,
  },
  planHeader: {
    marginBottom: 16,
    alignItems: 'center' as const,
  },
  planName: {
    fontSize: 20,
    fontWeight: 'bold' as const,
    marginBottom: 8,
  },
  planPrice: {
    fontSize: 32,
    fontWeight: 'bold' as const,
  },
  planTextSelected: {
    color: '#fff',
  },
  planBilling: {
    color: '#666',
    fontSize: 14,
  },
  planBillingSelected: {
    color: '#ccc',
  },
  planFeatures: {
    marginBottom: 20,
  },
  planFeature: {
    fontSize: 16,
    marginBottom: 8,
    color: '#444',
  },
  termsText: {
    marginTop: 24,
    fontSize: 12,
    color: '#999',
    textAlign: 'center',
  },
  continueButton: {
    borderRadius: 30,
    paddingVertical: 16,
    alignItems: 'center' as const,
    marginTop: 32,
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
