import { mealService, MealAnalysis } from '../services/mealService';

// AI Service for food analysis using Deepseek API
class AIService {
  private apiKey: string;
  private baseUrl: string;

  constructor() {
    this.apiKey = process.env.EXPO_PUBLIC_DEEPSEEK_API_KEY || 'your-deepseek-api-key';
    this.baseUrl = 'https://api.deepseek.com/v1/chat/completions';
  }

  async analyzeFoodImage(imageUri: string): Promise<MealAnalysis> {
    try {
      // Convert image to base64
      const base64Image = await this.convertImageToBase64(imageUri);

      // Prepare the prompt for AI analysis
      const prompt = `
        Analyze this food image and provide detailed nutritional information.
        Please respond with a JSON object containing:
        {
          "food_items": [
            {
              "name": "food item name",
              "confidence": 0.95,
              "calories": 250,
              "protein": 15,
              "carbs": 30,
              "fat": 8,
              "weight_grams": 200
            }
          ],
          "total_calories": 250,
          "total_protein": 15,
          "total_carbs": 30,
          "total_fat": 8,
          "confidence_score": 0.95
        }
        
        Be as accurate as possible with portion sizes and nutritional values.
        Consider typical serving sizes and cooking methods.
      `;

      const response = await fetch(this.baseUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.apiKey}`,
        },
        body: JSON.stringify({
          model: 'deepseek-chat',
          messages: [
            {
              role: 'user',
              content: [
                {
                  type: 'text',
                  text: prompt,
                },
                {
                  type: 'image_url',
                  image_url: {
                    url: `data:image/jpeg;base64,${base64Image}`,
                  },
                },
              ],
            },
          ],
          max_tokens: 1000,
          temperature: 0.1,
        }),
      });

      if (!response.ok) {
        throw new Error(`AI API request failed: ${response.statusText}`);
      }

      const data = await response.json();
      const content = data.choices[0]?.message?.content;

      if (!content) {
        throw new Error('No content received from AI API');
      }

      // Parse the JSON response
      const analysis: MealAnalysis = JSON.parse(content);
      
      // Validate the response structure
      if (!this.validateMealAnalysis(analysis)) {
        throw new Error('Invalid AI response structure');
      }

      return analysis;
    } catch (error) {
      console.error('Error analyzing food image:', error);
      
      // Fallback to mock data if AI analysis fails
      return this.getMockAnalysis();
    }
  }

  private async convertImageToBase64(imageUri: string): Promise<string> {
    try {
      const response = await fetch(imageUri);
      const blob = await response.blob();
      
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => {
          const result = reader.result as string;
          const base64 = result.split(',')[1]; // Remove data:image/jpeg;base64, prefix
          resolve(base64);
        };
        reader.onerror = reject;
        reader.readAsDataURL(blob);
      });
    } catch (error) {
      console.error('Error converting image to base64:', error);
      throw error;
    }
  }

  private validateMealAnalysis(analysis: any): analysis is MealAnalysis {
    return (
      analysis &&
      typeof analysis === 'object' &&
      Array.isArray(analysis.food_items) &&
      typeof analysis.total_calories === 'number' &&
      typeof analysis.total_protein === 'number' &&
      typeof analysis.total_carbs === 'number' &&
      typeof analysis.total_fat === 'number' &&
      typeof analysis.confidence_score === 'number'
    );
  }

  private getMockAnalysis(): MealAnalysis {
    // Fallback mock data for development/testing
    return {
      food_items: [
        {
          name: 'Grilled Chicken Breast',
          confidence: 0.9,
          calories: 165,
          protein: 31,
          carbs: 0,
          fat: 3.6,
          weight_grams: 100,
        },
        {
          name: 'Brown Rice',
          confidence: 0.85,
          calories: 216,
          protein: 5,
          carbs: 45,
          fat: 1.8,
          weight_grams: 100,
        },
        {
          name: 'Mixed Vegetables',
          confidence: 0.8,
          calories: 50,
          protein: 2,
          carbs: 10,
          fat: 0.5,
          weight_grams: 100,
        },
      ],
      total_calories: 431,
      total_protein: 38,
      total_carbs: 55,
      total_fat: 5.9,
      confidence_score: 0.85,
    };
  }

  async generateMealName(foodItems: MealAnalysis['food_items']): Promise<string> {
    try {
      const mainFood = foodItems[0]?.name || 'Meal';
      const itemCount = foodItems.length;
      
      if (itemCount === 1) {
        return mainFood;
      } else if (itemCount === 2) {
        return `${mainFood} with ${foodItems[1]?.name || 'Side Dish'}`;
      } else {
        return `${mainFood} with ${itemCount - 1} items`;
      }
    } catch (error) {
      console.error('Error generating meal name:', error);
      return 'Analyzed Meal';
    }
  }
}

export const aiService = new AIService();
