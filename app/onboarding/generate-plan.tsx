import React, { useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Animated,
  TouchableOpacity,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';

export default function GeneratePlanBoard() {
  const scale = useRef(new Animated.Value(0.92)).current;
  const opacity = useRef(new Animated.Value(0)).current;
  const textY = useRef(new Animated.Value(12)).current;

  useEffect(() => {
    Animated.sequence([
      Animated.parallel([
        Animated.timing(opacity, {
          toValue: 1,
          duration: 450,
          useNativeDriver: true,
        }),
        Animated.timing(scale, {
          toValue: 1,
          duration: 450,
          useNativeDriver: true,
        }),
      ]),
      Animated.timing(textY, {
        toValue: 0,
        duration: 350,
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
        {/* Circle */}
        <View style={styles.circleWrapper}>
          <View style={styles.circle}>
            <Text style={styles.emoji}>🤍</Text>
          </View>
        </View>

        {/* Text */}
        <Animated.View style={{ transform: [{ translateY: textY }] }}>
          <Text style={styles.badge}>✓ All done!</Text>

          <Text style={styles.title}>
            Time to generate{'\n'}your custom plan!
          </Text>
        </Animated.View>
      </Animated.View>

      {/* Button */}
      <TouchableOpacity
        style={styles.button}
        onPress={() => router.push('/onboarding/loading-setup')}
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
    paddingVertical: 24,
  },

  content: {
    alignItems: 'center',
    marginTop: 80,
  },

  circleWrapper: {
    marginBottom: 24,
  },

  circle: {
    width: 140,
    height: 140,
    borderRadius: 70,
    backgroundColor: '#F2F2F7',
    justifyContent: 'center',
    alignItems: 'center',
  },

  emoji: {
    fontSize: 42,
  },

  badge: {
    fontSize: 14,
    color: '#6C6C70',
    textAlign: 'center',
    marginBottom: 6,
  },

  title: {
    fontSize: 22,
    fontWeight: '600',
    textAlign: 'center',
    lineHeight: 30,
  },

  button: {
    backgroundColor: '#000',
    marginHorizontal: 24,
    borderRadius: 28,
    paddingVertical: 16,
    alignItems: 'center',
  },

  buttonText: {
    color: '#fff',
    fontSize: 17,
    fontWeight: '600',
  },
});
