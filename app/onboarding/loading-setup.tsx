import React, { useEffect, useRef, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Animated,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';

const STEPS = [
  'Estimating your metabolic age...',
  'Analyzing your calorie needs...',
  'Optimizing macronutrients...',
  'Building your custom plan...',
];

export default function LoadingSetupScreen() {
  const progress = useRef(new Animated.Value(0)).current;
  const [percent, setPercent] = useState(1);
  const [stepIndex, setStepIndex] = useState(0);

  useEffect(() => {
    // Анимация прогресс-бара
    Animated.timing(progress, {
      toValue: 1,
      duration: 4200,
      useNativeDriver: false,
    }).start(() => {
      router.replace('/onboarding/plan-ready'); // или paywall
    });

    // Счётчик процентов
    const interval = setInterval(() => {
      setPercent((p) => {
        if (p >= 100) {
          clearInterval(interval);
          return 100;
        }
        return p + 1;
      });
    }, 42);

    // Смена шагов
    const stepInterval = setInterval(() => {
      setStepIndex((i) => (i < STEPS.length - 1 ? i + 1 : i));
    }, 1000);

    return () => {
      clearInterval(interval);
      clearInterval(stepInterval);
    };
  }, []);

  const barWidth = progress.interpolate({
    inputRange: [0, 1],
    outputRange: ['0%', '100%'],
  });

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        {/* % */}
        <Text style={styles.percent}>{percent}%</Text>

        <Text style={styles.title}>
          We're setting everything{'\n'}up for you
        </Text>

        {/* Progress bar */}
        <View style={styles.progressTrack}>
          <Animated.View
            style={[styles.progressFill, { width: barWidth }]}
          />
        </View>

        <Text style={styles.stepText}>{STEPS[stepIndex]}</Text>

        {/* Checklist */}
        <View style={styles.card}>
          {[
            'Calories',
            'Carbs',
            'Protein',
            'Fats',
            'Health Score',
          ].map((item, index) => (
            <View key={item} style={styles.row}>
              <Text style={styles.rowText}>• {item}</Text>
              {percent > (index + 1) * 15 && (
                <Text style={styles.check}>✓</Text>
              )}
            </View>
          ))}
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

  content: {
    alignItems: 'center',
    marginTop: 80,
    paddingHorizontal: 24,
  },

  percent: {
    fontSize: 48,
    fontWeight: '700',
    marginBottom: 8,
  },

  title: {
    fontSize: 18,
    textAlign: 'center',
    marginBottom: 24,
  },

  progressTrack: {
    width: '100%',
    height: 6,
    backgroundColor: '#E5E5EA',
    borderRadius: 3,
    overflow: 'hidden',
    marginBottom: 16,
  },

  progressFill: {
    height: '100%',
    backgroundColor: '#6E8BFF',
  },

  stepText: {
    fontSize: 14,
    color: '#6C6C70',
    marginBottom: 24,
  },

  card: {
    width: '100%',
    backgroundColor: '#F5F5F7',
    borderRadius: 16,
    padding: 16,
  },

  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },

  rowText: {
    fontSize: 14,
  },

  check: {
    fontSize: 14,
    fontWeight: '600',
  },
});
