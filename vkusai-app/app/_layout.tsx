import React from 'react';
import { Stack } from 'expo-router';
import { useColorScheme } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { StyleSheet, View } from 'react-native';

interface RootLayoutProps {}

function RootLayout({}: RootLayoutProps) {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';

  return (
    <View style={styles.container}>
      <SafeAreaProvider>
        <Stack
          screenOptions={{
            headerStyle: {
              backgroundColor: isDark ? '#1C1C1E' : '#FFFFFF',
            },
            headerTintColor: isDark ? '#FFFFFF' : '#000000',
            headerShadowVisible: false,
            headerBackTitle: 'Back',
          }}
        >
          <Stack.Screen
            name="index"
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="auth/signin"
            options={{
              title: 'Sign In',
              presentation: 'card',
            }}
          />
          <Stack.Screen
            name="auth/signup"
            options={{
              title: 'Sign Up',
              presentation: 'card',
            }}
          />
          <Stack.Screen
            name="onboarding/subscription"
            options={{
              title: 'Choose Plan',
              headerShown: false,
              gestureEnabled: false,
            }}
          />
          <Stack.Screen
            name="onboarding/goals"
            options={{
              title: 'Set Goals',
              headerShown: false,
              gestureEnabled: false,
            }}
          />
          <Stack.Screen
            name="(app)"
            options={{
              headerShown: false,
              gestureEnabled: false,
            }}
          />
          <Stack.Screen
            name="meals/confirm"
            options={{
              title: 'Confirm Meal',
              presentation: 'card',
            }}
          />
        </Stack>
      </SafeAreaProvider>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default RootLayout;
