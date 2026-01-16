import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';

export default function PlanReadyScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>

        {/* ✅ Success */}
        <View style={styles.success}>
          <View style={styles.checkCircle}>
            <Text style={styles.check}>✓</Text>
          </View>
          <Text style={styles.title}>
            Congratulations{'\n'}your custom plan is ready!
          </Text>
        </View>

        {/* 🎯 Goal */}
        <View style={styles.goalBadge}>
          <Text style={styles.goalLabel}>You should lose:</Text>
          <Text style={styles.goalValue}>Lose 10 kg by October 31</Text>
        </View>

        {/* 📊 Daily recommendation */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Daily recommendation</Text>
          <Text style={styles.cardSub}>You can edit this anytime</Text>

          <View style={styles.grid}>
            <Stat label="Calories" value="1699" />
            <Stat label="Carbs" value="177g" />
            <Stat label="Protein" value="141g" />
            <Stat label="Fats" value="47g" />
          </View>

          <View style={styles.healthRow}>
            <Text style={styles.healthText}>❤️ Health Score</Text>
            <Text style={styles.healthValue}>7/10</Text>
          </View>

          <View style={styles.healthBar}>
            <View style={styles.healthFill} />
          </View>
        </View>
      </View>

      {/* 🚀 CTA */}
      <TouchableOpacity
        style={styles.button}
        onPress={() => router.push('/onboarding/save-progress')}
      >
        <Text style={styles.buttonText}>Let's get started!</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

// 🔹 Компонент карточки показателя
function Stat({ label, value }: { label: string; value: string }) {
  return (
    <View style={styles.stat}>
      <Text style={styles.statLabel}>{label}</Text>
      <Text style={styles.statValue}>{value}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 24,
  },

  content: {
    marginTop: 32,
  },

  success: {
    alignItems: 'center',
    marginBottom: 24,
  },

  checkCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#000',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },

  check: {
    color: '#fff',
    fontSize: 20,
    fontWeight: '600',
  },

  title: {
    fontSize: 20,
    fontWeight: '600',
    textAlign: 'center',
  },

  goalBadge: {
    alignSelf: 'center',
    backgroundColor: '#F2F2F7',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 16,
    marginBottom: 24,
  },

  goalLabel: {
    fontSize: 12,
    color: '#6C6C70',
    textAlign: 'center',
  },

  goalValue: {
    fontSize: 14,
    fontWeight: '500',
  },

  card: {
    backgroundColor: '#F5F5F7',
    borderRadius: 20,
    padding: 16,
  },

  cardTitle: {
    fontSize: 16,
    fontWeight: '600',
  },

  cardSub: {
    fontSize: 12,
    color: '#6C6C70',
    marginBottom: 16,
  },

  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },

  stat: {
    width: '48%',
    backgroundColor: '#fff',
    borderRadius: 14,
    padding: 14,
    marginBottom: 12,
  },

  statLabel: {
    fontSize: 12,
    color: '#6C6C70',
  },

  statValue: {
    fontSize: 18,
    fontWeight: '600',
    marginTop: 4,
  },

  healthRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 12,
  },

  healthText: {
    fontSize: 14,
  },

  healthValue: {
    fontSize: 14,
    fontWeight: '600',
  },

  healthBar: {
    height: 6,
    backgroundColor: '#E5E5EA',
    borderRadius: 3,
    marginTop: 8,
  },

  healthFill: {
    width: '70%',
    height: '100%',
    backgroundColor: '#34C759',
    borderRadius: 3,
  },

  button: {
    marginTop: 'auto',
    marginBottom: 16,
    backgroundColor: '#000',
    borderRadius: 30,
    paddingVertical: 16,
    alignItems: 'center',
  },

  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});
