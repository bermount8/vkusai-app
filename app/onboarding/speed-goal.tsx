import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Animated,
} from 'react-native';
import Slider from '@react-native-community/slider';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';

export default function SpeedGoalBoard() {
  const [value, setValue] = useState(1.0);

  const fade = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(fade, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    }).start();
  }, []);

  const isRecommended = value >= 0.7 && value <= 1.1;

  return (
    <SafeAreaView style={styles.container}>
      <Animated.View style={{ opacity: fade }}>
        <Text style={styles.title}>
          How fast do you want to{'\n'}reach your goal?
        </Text>

        <Text style={styles.label}>Loss weight speed per week</Text>

        <Text style={styles.value}>
          {value.toFixed(1)} <Text style={styles.unit}>kg</Text>
        </Text>

        {/* Icons */}
        <View style={styles.icons}>
          <Text style={styles.icon}>🐢</Text>
          <Text style={styles.icon}>🐆</Text>
          <Text style={styles.icon}>⚡️</Text>
        </View>

        {/* Slider */}
        <Slider
          style={styles.slider}
          minimumValue={0.1}
          maximumValue={1.5}
          step={0.1}
          minimumTrackTintColor="#000"
          maximumTrackTintColor="#E5E5EA"
          thumbTintColor="#000"
          value={value}
          onValueChange={setValue}
        />

        <View style={styles.range}>
          <Text style={styles.rangeText}>0.1 kg</Text>
          <Text style={styles.rangeText}>0.8 kg</Text>
          <Text style={styles.rangeText}>1.5 kg</Text>
        </View>

        {isRecommended && (
          <View style={styles.recommended}>
            <Text style={styles.recommendedText}>Recommended</Text>
          </View>
        )}
      </Animated.View>

      <TouchableOpacity
        style={styles.button}
        onPress={() => router.push('/onboarding/obstacles')}
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

  title: {
    fontSize: 28,
    fontWeight: '700',
    paddingHorizontal: 24,
    marginTop: 120,
    marginBottom: 24,
    lineHeight: 36,
  },

  label: {
    textAlign: 'center',
    color: '#666',
    fontSize: 14,
  },

  value: {
    textAlign: 'center',
    fontSize: 36,
    fontWeight: '700',
    marginVertical: 12,
  },

  unit: {
    fontSize: 18,
    color: '#666',
  },

  icons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 48,
    marginBottom: 8,
  },

  icon: {
    fontSize: 20,
    opacity: 0.6,
  },

  slider: {
    marginHorizontal: 24,
  },

  range: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 24,
    marginTop: 4,
  },

  rangeText: {
    fontSize: 12,
    color: '#999',
  },

  recommended: {
    alignSelf: 'center',
    marginTop: 16,
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: '#F2F2F7',
  },

  recommendedText: {
    fontSize: 13,
    color: '#333',
    fontWeight: '500',
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
