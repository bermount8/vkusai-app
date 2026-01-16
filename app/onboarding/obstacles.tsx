import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';

const OPTIONS = [
  { id: 'consistency', label: 'Lack of consistency', icon: '📊' },
  { id: 'eating', label: 'Unhealthy eating habits', icon: '🍔' },
  { id: 'support', label: 'Lack of support', icon: '🤝' },
  { id: 'busy', label: 'Busy schedule', icon: '📅' },
  { id: 'ideas', label: 'Lack of meal inspiration', icon: '🍎' },
];

export default function ObstaclesBoard() {
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
          What's stopping you{'\n'}from reaching your goals?
        </Text>

        <View style={styles.list}>
          {OPTIONS.map((item) => {
            const active = selected.includes(item.id);

            return (
              <TouchableOpacity
                key={item.id}
                style={[
                  styles.card,
                  active && styles.cardActive,
                ]}
                onPress={() => toggle(item.id)}
                activeOpacity={0.8}
              >
                <View style={styles.icon}>
                  <Text>{item.icon}</Text>
                </View>

                <Text
                  style={[
                    styles.label,
                    active && styles.labelActive,
                  ]}
                >
                  {item.label}
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
        onPress={() => router.push('/onboarding/goals-board')}
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
