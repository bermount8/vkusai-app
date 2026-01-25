# ВкусAI - AI-Powered Calorie Tracking App

ВкусAI is a modern calorie tracking app for iOS that simplifies food logging using AI-powered image recognition. Users capture meal photos, and the app extracts food items, quantities, and nutritional data via Deepseek's Vision Language Model (VL2 OCR VLM) and LLM chat model. The app tracks daily calories, macronutrients, and progress toward health goals.

## 🚀 Tech Stack

- **Framework**: Expo (React Native)
- **Language**: TypeScript
- **Navigation**: Expo Router
- **UI Library**: React Native Paper
- **Backend/Auth**: Supabase (authentication, data storage)
- **Deployment**: Expo Go

## ✨ Features

- **AI-Powered Food Recognition**: Capture meals via camera and get instant nutritional information
- **Comprehensive Nutrition Tracking**: Monitor calories, macros, and progress toward goals
- **User Authentication**: Secure sign-up and login via Supabase
- **Subscription Management**: Premium features with Stripe integration
- **Personalized Goals**: Set and track custom health and nutrition targets
- **Offline Support**: Local data storage with sync when online
- **Dark/Light Mode**: Adaptive UI based on device settings

## 🛠️ Project Structure

```
/app
  /_layout.tsx            # Root layout with navigation configuration
  /index.tsx              # Landing/welcome screen
  /(app)                  # Main app screens (protected routes)
    /_layout.tsx          # Tab navigation layout
    /index.tsx            # Dashboard screen
    /camera.tsx           # Meal capture screen
    /meals.tsx            # Meal history and tracking
    /profile.tsx          # User profile and settings
  /auth                   # Authentication screens
    /signin.tsx           # Sign in screen
    /signup.tsx           # Sign up screen
  /onboarding             # Onboarding flow
    /subscription.tsx     # Subscription selection
    /goals.tsx            # Health goals setup
  /meals                  # Meal-related screens
    /confirm.tsx          # Meal confirmation after capture
```

## 📱 Getting Started

### Prerequisites

- Node.js (v16 or newer)
- npm or yarn
- Expo CLI

### Installation

```bash
# Clone the repository
git clone https://github.com/yourusername/vkusai-app.git
cd vkusai-app

# Install dependencies
npm install

# Start the development server
npm start
```

### Running on a Device

- Install the Expo Go app on your iOS device
- Scan the QR code from the terminal or Expo Dev Tools

## 🔧 Environment Setup

Create a `.env` file in the root directory with the following variables:

```
SUPABASE_URL=your_supabase_url
SUPABASE_ANON_KEY=your_supabase_anon_key
DEEPSEEK_API_KEY=your_deepseek_api_key
STRIPE_PUBLISHABLE_KEY=your_stripe_publishable_key
```

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 📚 Resources

- [Expo Documentation](https://docs.expo.dev/)
- [React Native Documentation](https://reactnative.dev/docs/getting-started)
- [Expo Router Documentation](https://docs.expo.dev/router/introduction/)
- [Supabase Documentation](https://supabase.io/docs)
- [React Native Paper Documentation](https://callstack.github.io/react-native-paper/)
