import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { Link, router } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function Home() {
  const handleGetStarted = () => {
    router.push('/onboarding/gender');
  };

  const handleSignIn = () => {
    router.push('/auth/signin');
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="light" />
      <View style={styles.main}>
        <View style={styles.contentContainer}>
          <Text style={styles.title}>Calorie tracking{"\n"}made easy</Text>
          
          <TouchableOpacity style={styles.getStartedButton} onPress={handleGetStarted}>
            <Text style={styles.getStartedText}>Get Started</Text>
          </TouchableOpacity>
          
          <View style={styles.signInContainer}>
            <Text style={styles.signInLabel}>Purchased on the web? </Text>
            <TouchableOpacity onPress={handleSignIn}>
              <Text style={styles.signInButton}>Sign In</Text>
            </TouchableOpacity>
          </View>
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
  main: {
    flex: 1,
    justifyContent: 'flex-end',
    padding: 20,
    paddingBottom: 40,
  },
  contentContainer: {
    width: '100%',
    alignItems: 'center',
  },
  title: {
    fontSize: 36,
    fontWeight: 'bold' as const,
    textAlign: 'center',
    marginBottom: 40,
  },
  getStartedButton: {
    backgroundColor: '#000',
    borderRadius: 30,
    paddingVertical: 16,
    paddingHorizontal: 24,
    width: '100%',
    alignItems: 'center' as const,
  },
  getStartedText: {
    color: 'white',
    fontSize: 18,
    fontWeight: '600' as const,
  },
  signInContainer: {
    flexDirection: 'row' as const,
    marginTop: 16,
    alignItems: 'center' as const,
  },
  signInLabel: {
    fontSize: 16,
    color: '#000',
  },
  signInButton: {
    fontSize: 16,
    fontWeight: '600' as const,
    color: '#000',
  },
});
