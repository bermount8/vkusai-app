import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Dimensions, Alert, Modal } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { router } from 'expo-router';
import { FontAwesome } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';

// Define TypeScript interfaces for our data structure
interface MacroNutrient {
  consumed: number;
  target: number;
  remaining: number;
}

interface DailyCalories {
  consumed: number;
  target: number;
  remaining: number;
}

interface Macros {
  protein: MacroNutrient;
  carbs: MacroNutrient;
  fat: MacroNutrient;
}

interface Meal {
  id: string;
  name: string;
  time: string;
  calories: number;
}

interface DashboardData {
  dailyCalories: DailyCalories;
  macros: Macros;
  recentMeals: Meal[];
}

// Mock data for the dashboard
const mockData: DashboardData = {
  dailyCalories: {
    consumed: 1450,
    target: 2000,
    remaining: 550,
  },
  macros: {
    protein: { consumed: 75, target: 120, remaining: 45 },
    carbs: { consumed: 150, target: 225, remaining: 75 },
    fat: { consumed: 45, target: 65, remaining: 20 },
  },
  recentMeals: [
    { id: '1', name: 'Breakfast', time: '8:30 AM', calories: 450 },
    { id: '2', name: 'Lunch', time: '12:45 PM', calories: 650 },
    { id: '3', name: 'Snack', time: '3:30 PM', calories: 350 },
  ],
};

interface DashboardProps {}

function Dashboard({}: DashboardProps) {
  // Force light mode
  const isDark = false;
  const [showAddModal, setShowAddModal] = useState(false);
  const [meals, setMeals] = useState<Meal[]>([]);
  const [dailyNutrition, setDailyNutrition] = useState({
    totalCalories: 0,
    totalProtein: 0,
    totalCarbs: 0,
    totalFat: 0,
    mealCount: 0,
  });
  const [loading, setLoading] = useState(true);
  
  // TODO: Get actual user ID from authentication context
  const userId = 'mock-user-id';
  const targetCalories = 2000; // TODO: Get from user profile
  const targetProtein = 120; // TODO: Get from user profile
  const targetCarbs = 225; // TODO: Get from user profile
  const targetFat = 65; // TODO: Get from user profile

  useEffect(() => {
    loadMealData();
  }, []);

  const loadMealData = async () => {
    try {
      setLoading(true);
      
      // For now, use mock data since we're not connecting to backend
      // This can be replaced with real API calls later
      setTimeout(() => {
        setDailyNutrition({
          totalCalories: mockData.dailyCalories.consumed,
          totalProtein: mockData.macros.protein.consumed,
          totalCarbs: mockData.macros.carbs.consumed,
          totalFat: mockData.macros.fat.consumed,
          mealCount: mockData.recentMeals.length,
        });
        setMeals(mockData.recentMeals);
        setLoading(false);
      }, 1000);
    } catch (error) {
      console.error('Error loading meal data:', error);
      // Use mock data as fallback
      setDailyNutrition({
        totalCalories: mockData.dailyCalories.consumed,
        totalProtein: mockData.macros.protein.consumed,
        totalCarbs: mockData.macros.carbs.consumed,
        totalFat: mockData.macros.fat.consumed,
        mealCount: mockData.recentMeals.length,
      });
      setMeals(mockData.recentMeals);
      setLoading(false);
    }
  };

  // Calculate progress percentages
  const calorieProgress = (dailyNutrition.totalCalories / targetCalories) * 100;
  const proteinProgress = (dailyNutrition.totalProtein / targetProtein) * 100;
  const carbsProgress = (dailyNutrition.totalCarbs / targetCarbs) * 100;
  const fatProgress = (dailyNutrition.totalFat / targetFat) * 100;

  const remainingCalories = Math.max(0, targetCalories - dailyNutrition.totalCalories);
  const remainingProtein = Math.max(0, targetProtein - dailyNutrition.totalProtein);
  const remainingCarbs = Math.max(0, targetCarbs - dailyNutrition.totalCarbs);
  const remainingFat = Math.max(0, targetFat - dailyNutrition.totalFat);

  const handleAddMeal = () => {
    setShowAddModal(true);
  };

  const handleCameraPress = () => {
    setShowAddModal(false);
    router.push('/camera');
  };

  const handleGalleryPress = async () => {
    setShowAddModal(false);
    
    try {
      // Request gallery permissions
      const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
      
      if (!permissionResult.granted) {
        Alert.alert('Permission required', 'Please grant gallery permissions to select photos.');
        return;
      }

      // Launch image picker
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 0.8,
      });

      if (result.canceled || !result.assets || result.assets.length === 0) {
        // User cancelled, do nothing
        return;
      }

      // Get the selected image URI
      const selectedImageUri = result.assets[0].uri;
      
      // Navigate to camera screen with the selected image
      router.push({
        pathname: '/camera',
        params: {
          source: 'gallery',
          uri: selectedImageUri,
        },
      });
    } catch (error) {
      console.error('Error picking image from gallery:', error);
      Alert.alert('Error', 'Failed to pick image from gallery. Please try again.');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style='dark' />
      <ScrollView style={styles.scrollView}>
        <View style={styles.header}>
          <View style={styles.headerContent}>
            {/* Logo */}
            <View style={styles.logoContainer}>
              <View style={styles.appTitle}>
                <Text style={styles.brandTitle}>ВкусAI</Text>
                <Text style={styles.brandEmoji}>🥞</Text>
              </View>
            </View>

            {/* Date Selector */}
            <ScrollView 
              horizontal 
              showsHorizontalScrollIndicator={false}
              snapToInterval={Dimensions.get('window').width - 32}
              decelerationRate="fast"
              contentContainerStyle={styles.dateSelectorContent}
            >
            {[...Array(4)].reverse().map((_, weekIndex) => {
              const dates = [];
              const startDate = new Date();
              
              // Generate 7 consecutive dates for this week
              for (let i = 0; i < 7; i++) {
                const date = new Date(startDate);
                date.setDate(date.getDate() - (weekIndex * 7) - i);
                dates.push(date);
              }
              
              return (
                <View key={weekIndex} style={styles.weekContainer}>
                  {dates.map((date, dayIndex) => {
                    const isToday = date.toDateString() === new Date().toDateString();
                    
                    return (
                      <TouchableOpacity 
                        key={dayIndex}
                        style={[styles.dateItem, isToday && styles.selectedDateItem]}
                      >
                        <Text style={[styles.dayName, isToday && styles.selectedDayName]}>
                          {date.toLocaleDateString('en-US', { weekday: 'short' }).toUpperCase()}
                        </Text>
                        <Text style={[styles.dayNumber, isToday && styles.selectedDayNumber]}>
                          {date.getDate()}
                        </Text>
                      </TouchableOpacity>
                    );
                  })}
                </View>
              );
            })}
            </ScrollView>
          </View>
        </View>

        {/* Calorie Summary */}
        <View style={styles.card}>
          <View style={styles.calorieContainer}>
            <View>
              <Text style={styles.calorieValue}>
                {loading ? '...' : remainingCalories}
              </Text>
              <Text style={styles.calorieLabel}>Calories left</Text>
            </View>
            <View style={styles.circleProgress}>
              <View style={styles.circleInner}>
                <Text style={styles.iconText}>🔥</Text>
              </View>
            </View>
          </View>
        </View>

        {/* Macros Grid */}
        <View style={styles.macrosGrid}>
          {/* Protein */}
          <View style={styles.macroCard}>
            <Text style={styles.macroValue}>{loading ? '...' : remainingProtein}g</Text>
            <Text style={styles.macroLabel}>Protein left</Text>
            <View style={styles.macroCircleProgress}>
              <View style={styles.macroCircleInner}>
                <Text style={styles.macroIcon}>🍗</Text>
              </View>
            </View>
          </View>

          {/* Carbs */}
          <View style={styles.macroCard}>
            <Text style={styles.macroValue}>{loading ? '...' : remainingCarbs}g</Text>
            <Text style={styles.macroLabel}>Carbs left</Text>
            <View style={styles.macroCircleProgress}>
              <View style={styles.macroCircleInner}>
                <Text style={styles.macroIcon}>🍞</Text>
              </View>
            </View>
          </View>

          {/* Fat */}
          <View style={styles.macroCard}>
            <Text style={styles.macroValue}>{loading ? '...' : remainingFat}g</Text>
            <Text style={styles.macroLabel}>Fat left</Text>
            <View style={styles.macroCircleProgress}>
              <View style={styles.macroCircleInner}>
                <Text style={styles.macroIcon}>🧈</Text>
              </View>
            </View>
          </View>
        </View>

        {/* Activity */}
        <Text style={styles.activityTitle}>Activity</Text>
        <View style={styles.activityCard}>
          {loading ? (
            <View style={styles.emptyStateContainer}>
              <Text style={styles.emptyStateTitle}>Loading meals...</Text>
            </View>
          ) : meals.length === 0 ? (
            <View style={styles.emptyStateContainer}>
              <Text style={styles.emptyStateTitle}>No meals yet</Text>
              <Text style={styles.emptyStateSubtitle}>Start by scanning your first meal</Text>
            </View>
          ) : (
            meals.slice(0, 5).map((meal) => (
              <View key={meal.id} style={styles.activityItem}>
                <View>
                  <Text style={styles.activityName}>{meal.name}</Text>
                  <Text style={styles.activityTime}>{meal.time}</Text>
                </View>
                <Text style={styles.activityCalories}>{meal.calories} cal</Text>
              </View>
            ))
          )}
        </View>
      </ScrollView>
        
        {/* Floating Action Button */}
        <TouchableOpacity 
          style={styles.fab} 
          onPress={handleAddMeal}
        >
          <FontAwesome name="plus" size={24} color="#FFFFFF" />
        </TouchableOpacity>

        {/* Add Meal Modal */}
        <Modal
          visible={showAddModal}
          transparent={true}
          animationType="fade"
          onRequestClose={() => setShowAddModal(false)}
        >
          <View style={styles.modalOverlay}>
            <View style={styles.modalContent}>
              <Text style={styles.modalTitle}>Add Meal</Text>
              <Text style={styles.modalSubtitle}>Choose how you want to add your meal</Text>
              
              <TouchableOpacity style={styles.modalButton} onPress={handleCameraPress}>
                <FontAwesome name="camera" size={24} color="#000" />
                <Text style={styles.modalButtonText}>Камера</Text>
              </TouchableOpacity>
              
              <TouchableOpacity style={styles.modalButton} onPress={handleGalleryPress}>
                <FontAwesome name="image" size={24} color="#000" />
                <Text style={styles.modalButtonText}>Добавить фото из галереи</Text>
              </TouchableOpacity>
              
              <TouchableOpacity 
                style={[styles.modalButton, styles.modalCancelButton]} 
                onPress={() => setShowAddModal(false)}
              >
                <Text style={styles.modalCancelText}>Cancel</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      </SafeAreaView>
    );
  }

export default Dashboard;

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
    paddingTop: 4,
  },
  caloriesCard: {
    flex: 1.5,
    marginRight: 8,
  },
  dateSelectorContent: {
    paddingHorizontal: 16,
    paddingBottom: 8,
  },
  weekContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: Dimensions.get('window').width - 32,
  },
  dateItem: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 6,
    borderRadius: 8,
    width: (Dimensions.get('window').width - 32) / 7,
  },
  selectedDateItem: {
    backgroundColor: '#000',
  },
  dayName: {
    fontSize: 11,
    color: '#666',
    marginBottom: 2,
  },
  selectedDayName: {
    color: '#fff',
  },
  dayNumber: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
  },
  selectedDayNumber: {
    color: '#fff',
  },
  container: {
    flex: 1,
    backgroundColor: '#F8F8F8',
  },
  containerDark: {
    backgroundColor: '#000000',
  },
  header: {
    paddingTop: 4,
  },
  headerContent: {
  },
  logoContainer: {
    paddingHorizontal: 16,
    marginBottom: 8,
  },
  appTitle: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  brandTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    marginRight: 4,
  },
  brandEmoji: {
    fontSize: 28,
    marginLeft: 8,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold' as const,
    color: '#000000',
  },
  titleDark: {
    color: '#FFFFFF',
  },
  date: {
    fontSize: 16,
    color: '#8E8E93',
    marginTop: 4,
  },
  dateDark: {
    color: '#8E8E93',
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 12,
    marginHorizontal: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 1,
  },
  calorieCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 24,
    padding: 20,
    paddingVertical: 32,
    marginHorizontal: 16,
    marginBottom: 12,
    minHeight: 180,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
  },
  activityCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderRadius: 16,
    marginHorizontal: 16,
    marginBottom: 12,
    paddingVertical: 8,
  },
  cardDark: {
    backgroundColor: '#1C1C1E',
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 16,
    color: '#000000',
  },
  activityTitle: {
    fontSize: 22,
    fontWeight: '700',
    marginTop: 12,
    marginBottom: 8,
    marginHorizontal: 16,
    color: '#000000',
  },
  cardTitleDark: {
    color: '#FFFFFF',
  },
  calorieContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  circleProgress: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#F5F5F5',
    justifyContent: 'center',
    alignItems: 'center',
  },
  circleInner: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  macrosGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 16,
    marginBottom: 16,
  },
  macroCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 16,
    width: '31%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 2,
  },
  macroValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000000',
    marginBottom: 4,
  },
  macroLabel: {
    fontSize: 14,
    color: '#666666',
    marginBottom: 4,
  },
  macroCircleProgress: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#F5F5F5',
    justifyContent: 'center',
    alignItems: 'center',
  },
  macroCircleInner: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  macroIcon: {
    fontSize: 16,
  },
  calorieItem: {
    alignItems: 'center',
  },
  calorieValue: {
    fontSize: 48,
    fontWeight: '600',
    color: '#000000',
    marginBottom: 8,
  },
  calorieValueDark: {
    color: '#FFFFFF',
  },
  calorieLabel: {
    fontSize: 16,
    color: '#8E8E93',
  },
  calorieLabelDark: {
    color: '#8E8E93',
  },
  circleIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#F2F2F7',
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconText: {
    fontSize: 20,
  },
  iconTextDark: {
    color: '#FFFFFF',
  },
  progressBarContainer: {
    marginTop: 8,
  },
  progressBarBackground: {
    height: 8,
    backgroundColor: '#E5E5EA',
    borderRadius: 4,
    overflow: 'hidden',
  },
  progressBarFill: {
    height: '100%',
    backgroundColor: '#007AFF',
    borderRadius: 4,
  },
  proteinBar: {
    backgroundColor: '#5856D6',
  },
  carbsBar: {
    backgroundColor: '#FF9500',
  },
  fatBar: {
    backgroundColor: '#FF2D55',
  },
  progressText: {
    fontSize: 14,
    color: '#8E8E93',
    marginTop: 8,
    textAlign: 'right',
  },
  progressTextDark: {
    color: '#8E8E93',
  },
  macroItem: {
    marginBottom: 16,
  },
  macroHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  macroName: {
    fontSize: 16,
    fontWeight: '500' as const,
    color: '#000000',
  },
  macroNameDark: {
    color: '#FFFFFF',
  },
  macroValues: {
    fontSize: 16,
    color: '#8E8E93',
  },
  macroValuesDark: {
    color: '#8E8E93',
  },
  emptyStateContainer: {
    alignItems: 'center',
    paddingVertical: 6,
  },
  emptyStateTitle: {
    fontSize: 15,
    fontWeight: '600',
    color: '#000',
    marginBottom: 2,
  },
  emptyStateSubtitle: {
    fontSize: 13,
    color: '#8E8E93',
    textAlign: 'center',
  },
  activityItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E5EA',
  },
  activityName: {
    fontSize: 16,
    fontWeight: '500' as const,
    color: '#000000',
  },
  activityNameDark: {
    color: '#FFFFFF',
  },
  activityTime: {
    fontSize: 14,
    color: '#8E8E93',
    marginTop: 2,
  },
  activityTimeDark: {
    color: '#8E8E93',
  },
  activityCalories: {
    fontSize: 16,
    fontWeight: '500' as const,
    color: '#007AFF',
  },
  mealCaloriesDark: {
    color: '#0A84FF',
  },
  // Floating Action Button styles
  fab: {
    position: 'absolute',
    bottom: 30,
    right: 20,
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#007AFF',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  // Modal styles
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 24,
    width: '80%',
    maxWidth: 300,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 8,
  },
  modalSubtitle: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    marginBottom: 20,
  },
  modalButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F5F5F5',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 12,
    width: '100%',
    marginBottom: 8,
    justifyContent: 'flex-start',
  },
  modalButtonText: {
    fontSize: 16,
    color: '#000',
    marginLeft: 12,
  },
  modalCancelButton: {
    backgroundColor: 'transparent',
    justifyContent: 'center',
  },
  modalCancelText: {
    fontSize: 16,
    color: '#007AFF',
    fontWeight: '600',
  },
});
