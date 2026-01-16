import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';

const GOALS = [
  { id: 'healthy', label: 'Eat and live healthier', icon: '🍎' },
  { id: 'energy', label: 'Boost my energy and mood', icon: '☀️' },
  { id: 'consistent', label: 'Stay motivated and consistent', icon: '💪' },
  { id: 'confidence', label: 'Feel better about my body', icon: '🧘' },
];

export default function GoalsBoard() {
  const [selected, setSelected] = useState<string[]>([]);

  const toggle = (id: string) => {
    setSelected((prev) =>
      prev.includes(id)
        ? prev.filter((x) => x !== id)
        : [...prev, id]
    );
  };

  const canContinue = selected.length > 0;

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>
          What would you like{'\n'}to accomplish?
        </Text>

        <View style={styles.list}>
          {GOALS.map((goal) => {
            const active = selected.includes(goal.id);

            return (
              <TouchableOpacity
                key={goal.id}
                style={[
                  styles.card,
                  active && styles.cardActive,
                ]}
                onPress={() => toggle(goal.id)}
                activeOpacity={0.85}
              >
                <View style={styles.icon}>
                  <Text>{goal.icon}</Text>
                </View>

                <Text
                  style={[
                    styles.label,
                    active && styles.labelActive,
                  ]}
                >
                  {goal.label}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>
      </View>

      <TouchableOpacity
        style={[
          styles.button,
          !canContinue && styles.buttonDisabled,
        ]}
        disabled={!canContinue}
        onPress={() => router.push('/onboarding/trust')}
      >
        <Text
          style={[
            styles.buttonText,
            !canContinue && styles.buttonTextDisabled,
          ]}
        >
          Continue
        </Text>
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
    paddingHorizontal: 24,
    marginTop: 96,
    paddingBottom: 24,
  },

  title: {
    fontSize: 28,
    fontWeight: '700',
    lineHeight: 36,
    marginBottom: 24,
  },

  list: {
    gap: 12,
    marginBottom: 24,
  },

  card: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderRadius: 14,
    backgroundColor: '#F5F5F7',
  },

  cardActive: {
    backgroundColor: '#EDEDED',
  },

  icon: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },

  label: {
    fontSize: 15,
    color: '#000',
  },

  labelActive: {
    fontWeight: '600',
  },

  button: {
    backgroundColor: '#0B0B0B',
    marginHorizontal: 24,
    borderRadius: 28,
    paddingVertical: 18,
    alignItems: 'center',
  },

  buttonDisabled: {
    backgroundColor: '#D1D1D6',
  },

  buttonText: {
    color: '#fff',
    fontSize: 17,
    fontWeight: '600',
  },

  buttonTextDisabled: {
    color: '#8E8E93',
  },
});
