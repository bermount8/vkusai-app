import React, { useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Animated,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';

export default function TrustBoard() {
  const opacity = useRef(new Animated.Value(0)).current;
  const scale = useRef(new Animated.Value(0.96)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(opacity, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      }),
      Animated.timing(scale, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <Animated.View
        style={[
          styles.content,
          { opacity, transform: [{ scale }] },
        ]}
      >
        {/* Illustration placeholder */}
        <View style={styles.illustration}>
          <Text style={styles.illustrationEmoji}>🤝</Text>
        </View>

        <Text style={styles.title}>
          Thank you for{'\n'}trusting us
        </Text>

        <Text style={styles.subtitle}>
          Now let's personalize Cal AI for you…
        </Text>

        {/* Privacy block */}
        <View style={styles.privacy}>
          <Text style={styles.lock}>🔒</Text>
          <Text style={styles.privacyText}>
            Your privacy and security matter to us.{'\n'}
            We promise to always keep your personal
            information private and secure.
          </Text>
        </View>
      </Animated.View>

      <TouchableOpacity
        style={styles.button}
        onPress={() => router.push('/onboarding/notifications')}
      >
        <Text style={styles.buttonText}>Continue</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'space-between',
    paddingBottom: 24,
  },

  content: {
    alignItems: 'center',
    paddingHorizontal: 32,
    marginTop: 120,
  },

  illustration: {
    width: 140,
    height: 140,
    borderRadius: 70,
    backgroundColor: '#F2F2F7',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 32,
  },

  illustrationEmoji: {
    fontSize: 48,
  },

  title: {
    fontSize: 28,
    fontWeight: '700',
    textAlign: 'center',
    lineHeight: 36,
    marginBottom: 12,
  },

  subtitle: {
    fontSize: 15,
    color: '#666',
    textAlign: 'center',
    marginBottom: 32,
  },

  privacy: {
    backgroundColor: '#F5F5F7',
    borderRadius: 16,
    padding: 16,
    alignItems: 'center',
  },

  lock: {
    fontSize: 18,
    marginBottom: 6,
  },

  privacyText: {
    fontSize: 13,
    color: '#555',
    textAlign: 'center',
    lineHeight: 18,
  },

  button: {
    backgroundColor: '#0B0B0B',
    marginHorizontal: 24,
    borderRadius: 28,
    paddingVertical: 18,
    alignItems: 'center',
  },

  buttonText: {
    color: '#fff',
    fontSize: 17,
    fontWeight: '600',
  },
});
