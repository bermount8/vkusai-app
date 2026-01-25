import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, TextInput, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { useColorScheme } from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';
import { FontAwesome } from '@expo/vector-icons';

interface FoodItem {
  id: string;
  name: string;
  quantity: string;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  isEditing: boolean;
}

export default function MealConfirmScreen() {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';
  const params = useLocalSearchParams();
  
  // Read route params
  const photoUri = params.photoUri as string;
  const calories = params.calories ? parseInt(params.calories as string) : null;
  const protein = params.protein ? parseInt(params.protein as string) : null;
  const carbs = params.carbs ? parseInt(params.carbs as string) : null;
  const fat = params.fat ? parseInt(params.fat as string) : null;
  const items = params.items ? JSON.parse(params.items as string) : null;
  
  // Initialize state with either route params or mock data
  const [foodItems, setFoodItems] = useState<FoodItem[]>(() => {
    if (items && calories && protein && carbs && fat) {
      // Use data from camera analysis
      return items.map((item: string, index: number) => ({
        id: (index + 1).toString(),
        name: item,
        quantity: '1 serving',
        calories: Math.round(calories / items.length), // Distribute calories evenly
        protein: Math.round(protein / items.length),
        carbs: Math.round(carbs / items.length),
        fat: Math.round(fat / items.length),
        isEditing: false,
      }));
    }
    
    // Fallback to mock data
    return [
      { 
        id: '1', 
        name: 'Grilled Chicken Breast', 
        quantity: '1 piece (4 oz)', 
        calories: 187, 
        protein: 35, 
        carbs: 0, 
        fat: 4,
        isEditing: false 
      },
      { 
        id: '2', 
        name: 'Brown Rice', 
        quantity: '1 cup', 
        calories: 216, 
        protein: 5, 
        carbs: 45, 
        fat: 1.8,
        isEditing: false 
      },
      { 
        id: '3', 
        name: 'Steamed Broccoli', 
        quantity: '1 cup', 
        calories: 55, 
        protein: 3.7, 
        carbs: 11, 
        fat: 0.6,
        isEditing: false 
      },
      { 
        id: '4', 
        name: 'Olive Oil', 
        quantity: '1 tbsp', 
        calories: 119, 
        protein: 0, 
        carbs: 0, 
        fat: 14,
        isEditing: false 
      },
    ];
  });
  
  const [mealName, setMealName] = useState('Analyzed Meal');
  const [isLoading, setIsLoading] = useState(false);
  
  const totalCalories = foodItems.reduce((sum, item) => sum + item.calories, 0);
  const totalProtein = foodItems.reduce((sum, item) => sum + item.protein, 0);
  const totalCarbs = foodItems.reduce((sum, item) => sum + item.carbs, 0);
  const totalFat = foodItems.reduce((sum, item) => sum + item.fat, 0);
  
  const toggleEditItem = (id: string) => {
    setFoodItems(foodItems.map(item => 
      item.id === id ? { ...item, isEditing: !item.isEditing } : item
    ));
  };
  
  const updateFoodItem = (id: string, field: keyof FoodItem, value: string | number) => {
    setFoodItems(foodItems.map(item => 
      item.id === id ? { ...item, [field]: value } : item
    ));
  };
  
  const deleteItem = (id: string) => {
    setFoodItems(foodItems.filter(item => item.id !== id));
  };
  
  const saveMeal = () => {
    setIsLoading(true);
    
    // In a real app, we would save the meal to Supabase here
    setTimeout(() => {
      router.replace('/(app)/meals');
    }, 1000);
  };

  return (
    <SafeAreaView style={[styles.container, isDark && styles.containerDark]}>
      <StatusBar style={isDark ? 'light' : 'dark'} />
      <ScrollView style={styles.scrollView}>
        <View style={styles.header}>
          <Text style={[styles.title, isDark && styles.titleDark]}>Confirm Your Meal</Text>
          <Text style={[styles.subtitle, isDark && styles.subtitleDark]}>
            Review the detected items and make any necessary adjustments
          </Text>
        </View>
        
        <View style={[styles.imageCard, isDark && styles.imageCardDark]}>
          <Image 
            source={{ uri: photoUri || 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?q=80&w=1000' }} 
            style={styles.mealImage} 
            resizeMode="cover"
          />
        </View>
        
        <View style={[styles.mealNameCard, isDark && styles.mealNameCardDark]}>
          <Text style={[styles.mealNameLabel, isDark && styles.mealNameLabelDark]}>Meal Name</Text>
          <TextInput
            style={[styles.mealNameInput, isDark && styles.mealNameInputDark]}
            value={mealName}
            onChangeText={setMealName}
            placeholder="Enter meal name"
            placeholderTextColor={isDark ? '#8E8E93' : '#C7C7CC'}
          />
        </View>
        
        <View style={[styles.card, isDark && styles.cardDark]}>
          <Text style={[styles.cardTitle, isDark && styles.cardTitleDark]}>Detected Food Items</Text>
          
          {foodItems.map((item) => (
            <View key={item.id} style={styles.foodItem}>
              {item.isEditing ? (
                <View style={styles.foodItemEdit}>
                  <View style={styles.foodItemEditRow}>
                    <TextInput
                      style={[styles.foodItemEditInput, isDark && styles.foodItemEditInputDark]}
                      value={item.name}
                      onChangeText={(value) => updateFoodItem(item.id, 'name', value)}
                      placeholder="Food name"
                      placeholderTextColor={isDark ? '#8E8E93' : '#C7C7CC'}
                    />
                    <TextInput
                      style={[styles.foodItemEditInput, isDark && styles.foodItemEditInputDark, styles.foodItemEditInputSmall]}
                      value={item.quantity}
                      onChangeText={(value) => updateFoodItem(item.id, 'quantity', value)}
                      placeholder="Quantity"
                      placeholderTextColor={isDark ? '#8E8E93' : '#C7C7CC'}
                    />
                  </View>
                  
                  <View style={styles.foodItemEditRow}>
                    <View style={styles.foodItemEditNutrient}>
                      <Text style={[styles.foodItemEditLabel, isDark && styles.foodItemEditLabelDark]}>Calories</Text>
                      <TextInput
                        style={[styles.foodItemEditInput, isDark && styles.foodItemEditInputDark, styles.foodItemEditInputSmall]}
                        value={item.calories.toString()}
                        onChangeText={(value) => updateFoodItem(item.id, 'calories', parseInt(value) || 0)}
                        keyboardType="numeric"
                        placeholderTextColor={isDark ? '#8E8E93' : '#C7C7CC'}
                      />
                    </View>
                    
                    <View style={styles.foodItemEditNutrient}>
                      <Text style={[styles.foodItemEditLabel, isDark && styles.foodItemEditLabelDark]}>Protein (g)</Text>
                      <TextInput
                        style={[styles.foodItemEditInput, isDark && styles.foodItemEditInputDark, styles.foodItemEditInputSmall]}
                        value={item.protein.toString()}
                        onChangeText={(value) => updateFoodItem(item.id, 'protein', parseFloat(value) || 0)}
                        keyboardType="numeric"
                        placeholderTextColor={isDark ? '#8E8E93' : '#C7C7CC'}
                      />
                    </View>
                    
                    <View style={styles.foodItemEditNutrient}>
                      <Text style={[styles.foodItemEditLabel, isDark && styles.foodItemEditLabelDark]}>Carbs (g)</Text>
                      <TextInput
                        style={[styles.foodItemEditInput, isDark && styles.foodItemEditInputDark, styles.foodItemEditInputSmall]}
                        value={item.carbs.toString()}
                        onChangeText={(value) => updateFoodItem(item.id, 'carbs', parseFloat(value) || 0)}
                        keyboardType="numeric"
                        placeholderTextColor={isDark ? '#8E8E93' : '#C7C7CC'}
                      />
                    </View>
                    
                    <View style={styles.foodItemEditNutrient}>
                      <Text style={[styles.foodItemEditLabel, isDark && styles.foodItemEditLabelDark]}>Fat (g)</Text>
                      <TextInput
                        style={[styles.foodItemEditInput, isDark && styles.foodItemEditInputDark, styles.foodItemEditInputSmall]}
                        value={item.fat.toString()}
                        onChangeText={(value) => updateFoodItem(item.id, 'fat', parseFloat(value) || 0)}
                        keyboardType="numeric"
                        placeholderTextColor={isDark ? '#8E8E93' : '#C7C7CC'}
                      />
                    </View>
                  </View>
                  
                  <View style={styles.foodItemEditActions}>
                    <TouchableOpacity 
                      style={[styles.foodItemEditButton, styles.foodItemEditButtonDelete]} 
                      onPress={() => deleteItem(item.id)}
                    >
                      <Text style={styles.foodItemEditButtonText}>Delete</Text>
                    </TouchableOpacity>
                    
                    <TouchableOpacity 
                      style={styles.foodItemEditButton} 
                      onPress={() => toggleEditItem(item.id)}
                    >
                      <Text style={styles.foodItemEditButtonText}>Save</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              ) : (
                <View style={styles.foodItemView}>
                  <View style={styles.foodItemHeader}>
                    <View>
                      <Text style={[styles.foodItemName, isDark && styles.foodItemNameDark]}>{item.name}</Text>
                      <Text style={[styles.foodItemQuantity, isDark && styles.foodItemQuantityDark]}>{item.quantity}</Text>
                    </View>
                    
                    <TouchableOpacity onPress={() => toggleEditItem(item.id)}>
                      <FontAwesome name="pencil" size={16} color={isDark ? '#8E8E93' : '#8E8E93'} />
                    </TouchableOpacity>
                  </View>
                  
                  <View style={styles.foodItemNutrition}>
                    <View style={styles.nutritionItem}>
                      <Text style={[styles.nutritionValue, isDark && styles.nutritionValueDark]}>{item.calories}</Text>
                      <Text style={[styles.nutritionLabel, isDark && styles.nutritionLabelDark]}>cal</Text>
                    </View>
                    
                    <View style={styles.nutritionItem}>
                      <Text style={[styles.nutritionValue, isDark && styles.nutritionValueDark]}>{item.protein}g</Text>
                      <Text style={[styles.nutritionLabel, isDark && styles.nutritionLabelDark]}>protein</Text>
                    </View>
                    
                    <View style={styles.nutritionItem}>
                      <Text style={[styles.nutritionValue, isDark && styles.nutritionValueDark]}>{item.carbs}g</Text>
                      <Text style={[styles.nutritionLabel, isDark && styles.nutritionLabelDark]}>carbs</Text>
                    </View>
                    
                    <View style={styles.nutritionItem}>
                      <Text style={[styles.nutritionValue, isDark && styles.nutritionValueDark]}>{item.fat}g</Text>
                      <Text style={[styles.nutritionLabel, isDark && styles.nutritionLabelDark]}>fat</Text>
                    </View>
                  </View>
                </View>
              )}
            </View>
          ))}
        </View>
        
        <View style={[styles.summaryCard, isDark && styles.summaryCardDark]}>
          <Text style={[styles.summaryTitle, isDark && styles.summaryTitleDark]}>Meal Summary</Text>
          
          <View style={styles.summaryRow}>
            <Text style={[styles.summaryLabel, isDark && styles.summaryLabelDark]}>Total Calories</Text>
            <Text style={[styles.summaryValue, isDark && styles.summaryValueDark]}>{totalCalories} cal</Text>
          </View>
          
          <View style={styles.summaryRow}>
            <Text style={[styles.summaryLabel, isDark && styles.summaryLabelDark]}>Total Protein</Text>
            <Text style={[styles.summaryValue, isDark && styles.summaryValueDark]}>{totalProtein.toFixed(1)}g</Text>
          </View>
          
          <View style={styles.summaryRow}>
            <Text style={[styles.summaryLabel, isDark && styles.summaryLabelDark]}>Total Carbs</Text>
            <Text style={[styles.summaryValue, isDark && styles.summaryValueDark]}>{totalCarbs.toFixed(1)}g</Text>
          </View>
          
          <View style={styles.summaryRow}>
            <Text style={[styles.summaryLabel, isDark && styles.summaryLabelDark]}>Total Fat</Text>
            <Text style={[styles.summaryValue, isDark && styles.summaryValueDark]}>{totalFat.toFixed(1)}g</Text>
          </View>
        </View>
        
        <TouchableOpacity 
          style={[styles.saveButton, isLoading && styles.saveButtonDisabled]} 
          onPress={saveMeal}
          disabled={isLoading}
        >
          <Text style={styles.saveButtonText}>
            {isLoading ? 'Saving...' : 'Save Meal'}
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F2F2F7',
  },
  containerDark: {
    backgroundColor: '#000000',
  },
  scrollView: {
    flex: 1,
  },
  header: {
    padding: 16,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#000000',
    marginBottom: 8,
  },
  titleDark: {
    color: '#FFFFFF',
  },
  subtitle: {
    fontSize: 16,
    color: '#8E8E93',
  },
  subtitleDark: {
    color: '#8E8E93',
  },
  imageCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    marginHorizontal: 16,
    marginBottom: 16,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  imageCardDark: {
    backgroundColor: '#1C1C1E',
  },
  mealImage: {
    width: '100%',
    height: 200,
  },
  mealNameCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    marginHorizontal: 16,
    marginBottom: 16,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  mealNameCardDark: {
    backgroundColor: '#1C1C1E',
  },
  mealNameLabel: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
    color: '#000000',
  },
  mealNameLabelDark: {
    color: '#FFFFFF',
  },
  mealNameInput: {
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#E5E5EA',
    borderRadius: 8,
    padding: 12,
    color: '#000000',
  },
  mealNameInputDark: {
    borderColor: '#38383A',
    color: '#FFFFFF',
    backgroundColor: '#2C2C2E',
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    marginHorizontal: 16,
    marginBottom: 16,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
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
  cardTitleDark: {
    color: '#FFFFFF',
  },
  foodItem: {
    borderBottomWidth: 1,
    borderBottomColor: '#E5E5EA',
    paddingVertical: 12,
  },
  foodItemView: {},
  foodItemHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  foodItemName: {
    fontSize: 16,
    fontWeight: '500',
    color: '#000000',
  },
  foodItemNameDark: {
    color: '#FFFFFF',
  },
  foodItemQuantity: {
    fontSize: 14,
    color: '#8E8E93',
    marginTop: 2,
  },
  foodItemQuantityDark: {
    color: '#8E8E93',
  },
  foodItemNutrition: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  nutritionItem: {
    alignItems: 'center',
  },
  nutritionValue: {
    fontSize: 16,
    fontWeight: '500',
    color: '#000000',
  },
  nutritionValueDark: {
    color: '#FFFFFF',
  },
  nutritionLabel: {
    fontSize: 12,
    color: '#8E8E93',
  },
  nutritionLabelDark: {
    color: '#8E8E93',
  },
  foodItemEdit: {
    gap: 12,
  },
  foodItemEditRow: {
    flexDirection: 'row',
    gap: 8,
    flexWrap: 'wrap',
  },
  foodItemEditInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#E5E5EA',
    borderRadius: 8,
    padding: 8,
    fontSize: 14,
    color: '#000000',
  },
  foodItemEditInputDark: {
    borderColor: '#38383A',
    color: '#FFFFFF',
    backgroundColor: '#2C2C2E',
  },
  foodItemEditInputSmall: {
    flex: 0.5,
    minWidth: 80,
  },
  foodItemEditNutrient: {
    flex: 1,
    minWidth: 80,
  },
  foodItemEditLabel: {
    fontSize: 12,
    color: '#8E8E93',
    marginBottom: 4,
  },
  foodItemEditLabelDark: {
    color: '#8E8E93',
  },
  foodItemEditActions: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: 8,
    marginTop: 8,
  },
  foodItemEditButton: {
    backgroundColor: '#007AFF',
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
  foodItemEditButtonDelete: {
    backgroundColor: '#FF3B30',
  },
  foodItemEditButtonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '600',
  },
  summaryCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    marginHorizontal: 16,
    marginBottom: 16,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  summaryCardDark: {
    backgroundColor: '#1C1C1E',
  },
  summaryTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 16,
    color: '#000000',
  },
  summaryTitleDark: {
    color: '#FFFFFF',
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E5EA',
  },
  summaryLabel: {
    fontSize: 16,
    color: '#000000',
  },
  summaryLabelDark: {
    color: '#FFFFFF',
  },
  summaryValue: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000000',
  },
  summaryValueDark: {
    color: '#FFFFFF',
  },
  saveButton: {
    backgroundColor: '#007AFF',
    borderRadius: 12,
    marginHorizontal: 16,
    marginBottom: 32,
    padding: 16,
    alignItems: 'center',
  },
  saveButtonDisabled: {
    backgroundColor: '#99CCFF',
  },
  saveButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
});
