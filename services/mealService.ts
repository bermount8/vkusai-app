import { supabase } from './supabase';

export interface Meal {
  id: string;
  user_id: string;
  name: string;
  photo_url: string;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  fiber: number;
  sugar: number;
  sodium: number;
  analyzed_at: string;
  consumed_at: string;
  created_at: string;
  updated_at: string;
}

export interface MealAnalysis {
  food_items: Array<{
    name: string;
    confidence: number;
    calories: number;
    protein: number;
    carbs: number;
    fat: number;
    weight_grams: number;
  }>;
  total_calories: number;
  total_protein: number;
  total_carbs: number;
  total_fat: number;
  confidence_score: number;
}

class MealService {
  async createMeal(
    userId: string,
    photoUri: string,
    analysis: MealAnalysis,
    mealName?: string
  ): Promise<Meal> {
    try {
      // Upload photo to Supabase Storage
      const fileName = `${userId}/${Date.now()}.jpg`;
      const { data: uploadData, error: uploadError } = await supabase.storage
        .from('meal-photos')
        .upload(fileName, {
          uri: photoUri,
          type: 'image/jpeg',
        });

      if (uploadError) {
        throw new Error(`Failed to upload photo: ${uploadError.message}`);
      }

      // Get public URL for the uploaded photo
      const { data: urlData } = supabase.storage
        .from('meal-photos')
        .getPublicUrl(fileName);

      // Create meal record in database
      const { data: mealData, error: mealError } = await supabase
        .from('meals')
        .insert({
          user_id: userId,
          name: mealName || 'Analyzed Meal',
          photo_url: urlData.publicUrl,
          calories: analysis.total_calories,
          protein: analysis.total_protein,
          carbs: analysis.total_carbs,
          fat: analysis.total_fat,
          fiber: 0, // Will be calculated from analysis
          sugar: 0, // Will be calculated from analysis
          sodium: 0, // Will be calculated from analysis
          consumed_at: new Date().toISOString(),
        })
        .select()
        .single();

      if (mealError) {
        throw new Error(`Failed to create meal record: ${mealError.message}`);
      }

      return mealData;
    } catch (error) {
      console.error('Error creating meal:', error);
      throw error;
    }
  }

  async getMealsByUserId(userId: string, limit = 50): Promise<Meal[]> {
    try {
      const { data, error } = await supabase
        .from('meals')
        .select('*')
        .eq('user_id', userId)
        .order('consumed_at', { ascending: false })
        .limit(limit);

      if (error) {
        throw new Error(`Failed to fetch meals: ${error.message}`);
      }

      return data || [];
    } catch (error) {
      console.error('Error fetching meals:', error);
      throw error;
    }
  }

  async getMealsByDateRange(
    userId: string,
    startDate: string,
    endDate: string
  ): Promise<Meal[]> {
    try {
      const { data, error } = await supabase
        .from('meals')
        .select('*')
        .eq('user_id', userId)
        .gte('consumed_at', startDate)
        .lte('consumed_at', endDate)
        .order('consumed_at', { ascending: false });

      if (error) {
        throw new Error(`Failed to fetch meals by date range: ${error.message}`);
      }

      return data || [];
    } catch (error) {
      console.error('Error fetching meals by date range:', error);
      throw error;
    }
  }

  async deleteMeal(mealId: string): Promise<void> {
    try {
      // Get meal data to delete photo from storage
      const { data: mealData } = await supabase
        .from('meals')
        .select('photo_url')
        .eq('id', mealId)
        .single();

      if (mealData?.photo_url) {
        // Extract file path from URL
        const urlParts = mealData.photo_url.split('/');
        const fileName = urlParts[urlParts.length - 1];
        const filePath = `${fileName.split('_')[0]}/${fileName}`;

        // Delete photo from storage
        await supabase.storage.from('meal-photos').remove([filePath]);
      }

      // Delete meal record from database
      const { error } = await supabase
        .from('meals')
        .delete()
        .eq('id', mealId);

      if (error) {
        throw new Error(`Failed to delete meal: ${error.message}`);
      }
    } catch (error) {
      console.error('Error deleting meal:', error);
      throw error;
    }
  }

  async updateMeal(mealId: string, updates: Partial<Meal>): Promise<Meal> {
    try {
      const { data, error } = await supabase
        .from('meals')
        .update(updates)
        .eq('id', mealId)
        .select()
        .single();

      if (error) {
        throw new Error(`Failed to update meal: ${error.message}`);
      }

      return data;
    } catch (error) {
      console.error('Error updating meal:', error);
      throw error;
    }
  }

  async getDailyNutritionSummary(userId: string, date: string): Promise<{
    totalCalories: number;
    totalProtein: number;
    totalCarbs: number;
    totalFat: number;
    mealCount: number;
  }> {
    try {
      const startDate = new Date(date);
      startDate.setHours(0, 0, 0, 0);
      
      const endDate = new Date(date);
      endDate.setHours(23, 59, 59, 999);

      const meals = await this.getMealsByDateRange(
        userId,
        startDate.toISOString(),
        endDate.toISOString()
      );

      return {
        totalCalories: meals.reduce((sum, meal) => sum + meal.calories, 0),
        totalProtein: meals.reduce((sum, meal) => sum + meal.protein, 0),
        totalCarbs: meals.reduce((sum, meal) => sum + meal.carbs, 0),
        totalFat: meals.reduce((sum, meal) => sum + meal.fat, 0),
        mealCount: meals.length,
      };
    } catch (error) {
      console.error('Error getting daily nutrition summary:', error);
      throw error;
    }
  }
}

export const mealService = new MealService();
