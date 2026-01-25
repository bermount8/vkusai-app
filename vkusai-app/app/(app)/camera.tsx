import React, { useState, useRef, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { useColorScheme } from 'react-native';
import { router } from 'expo-router';
import { FontAwesome } from '@expo/vector-icons';

export default function CameraScreen() {
  // Force light mode
  const isDark = false;
  
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);
  const [isCapturing, setIsCapturing] = useState(false);
  const [capturedImage, setCapturedImage] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  
  // Request camera permissions when component mounts
  useEffect(() => {
    // Simulating permission request
    setTimeout(() => {
      setHasPermission(true);
    }, 500);
  }, []);

  const takePicture = async () => {
    if (isCapturing) return;
    
    setIsCapturing(true);
    
    // Simulate taking a picture
    setTimeout(() => {
      // Mock captured image URL (would be a local file URI in a real app)
      setCapturedImage('https://images.unsplash.com/photo-1546069901-ba9599a7e63c?q=80&w=1000');
      setIsCapturing(false);
    }, 1000);
  };
  
  const retakePicture = () => {
    setCapturedImage(null);
  };
  
  const analyzePicture = () => {
    if (!capturedImage || isAnalyzing) return;
    
    setIsAnalyzing(true);
    
    // Simulate AI analysis
    setTimeout(() => {
      // In a real app, we would send the image to Deepseek API for analysis
      // and then navigate to a confirmation screen with the results
      router.push('/meals/confirm');
      setIsAnalyzing(false);
    }, 2000);
  };
  
  if (hasPermission === null) {
    return (
      <View style={[styles.container, styles.centered]}>
        <Text style={styles.text}>Requesting camera permission...</Text>
      </View>
    );
  }
  
  if (hasPermission === false) {
    return (
      <View style={[styles.container, styles.centered]}>
        <Text style={styles.text}>
          Camera access denied. Please enable camera permissions in your device settings.
        </Text>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Open Settings</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style='dark' />
      
      {capturedImage ? (
        // Preview captured image
        <View style={styles.previewContainer}>
          <Image source={{ uri: capturedImage }} style={styles.previewImage} />
          
          <View style={styles.previewOverlay}>
            <Text style={styles.previewText}>
              {isAnalyzing ? 'Analyzing your meal...' : 'How does this look?'}
            </Text>
            
            <View style={styles.previewActions}>
              {isAnalyzing ? (
                <ActivityIndicator size="large" color="#FFFFFF" />
              ) : (
                <>
                  <TouchableOpacity 
                    style={[styles.previewButton, styles.previewButtonSecondary]} 
                    onPress={retakePicture}
                  >
                    <Text style={styles.previewButtonText}>Retake</Text>
                  </TouchableOpacity>
                  
                  <TouchableOpacity 
                    style={styles.previewButton} 
                    onPress={analyzePicture}
                  >
                    <Text style={styles.previewButtonText}>Analyze</Text>
                  </TouchableOpacity>
                </>
              )}
            </View>
          </View>
        </View>
      ) : (
        // Camera view
        <View style={styles.cameraContainer}>
          {/* This would be a real camera view in a production app */}
          <View style={[styles.cameraPreview, isDark && styles.cameraPreviewDark]}>
            <Text style={[styles.cameraPlaceholder, isDark && styles.cameraPlaceholderDark]}>
              Camera Preview
            </Text>
          </View>
          
          <View style={styles.cameraControls}>
            <TouchableOpacity style={styles.galleryButton}>
              <FontAwesome name="image" size={24} color={isDark ? '#FFFFFF' : '#000000'} />
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={[styles.captureButton, isCapturing && styles.captureButtonDisabled]} 
              onPress={takePicture}
              disabled={isCapturing}
            >
              {isCapturing ? (
                <ActivityIndicator size="small" color="#FFFFFF" />
              ) : (
                <View style={styles.captureButtonInner} />
              )}
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.flipButton}>
              <FontAwesome name="refresh" size={24} color={isDark ? '#FFFFFF' : '#000000'} />
            </TouchableOpacity>
          </View>
          
          <View style={styles.instructions}>
            <Text style={[styles.instructionsText, isDark && styles.instructionsTextDark]}>
              Take a clear photo of your meal to analyze calories and nutrients
            </Text>
          </View>
        </View>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
  },
  containerDark: {
    backgroundColor: '#000000',
  },
  centered: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  text: {
    color: '#FFFFFF',
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 16,
  },
  textDark: {
    color: '#FFFFFF',
  },
  button: {
    backgroundColor: '#007AFF',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 8,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  cameraContainer: {
    flex: 1,
    justifyContent: 'space-between',
  },
  cameraPreview: {
    flex: 1,
    backgroundColor: '#1C1C1E',
    justifyContent: 'center',
    alignItems: 'center',
  },
  cameraPreviewDark: {
    backgroundColor: '#1C1C1E',
  },
  cameraPlaceholder: {
    color: '#8E8E93',
    fontSize: 18,
  },
  cameraPlaceholderDark: {
    color: '#8E8E93',
  },
  cameraControls: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingVertical: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
  },
  galleryButton: {
    padding: 12,
  },
  captureButton: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  captureButtonDisabled: {
    backgroundColor: '#8E8E93',
  },
  captureButtonInner: {
    width: 60,
    height: 60,
    borderRadius: 30,
    borderWidth: 2,
    borderColor: '#000000',
  },
  flipButton: {
    padding: 12,
  },
  instructions: {
    padding: 16,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
  },
  instructionsText: {
    color: '#FFFFFF',
    textAlign: 'center',
    fontSize: 14,
  },
  instructionsTextDark: {
    color: '#FFFFFF',
  },
  previewContainer: {
    flex: 1,
    position: 'relative',
  },
  previewImage: {
    flex: 1,
    resizeMode: 'cover',
  },
  previewOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    padding: 20,
  },
  previewText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '600',
    textAlign: 'center',
    marginBottom: 20,
  },
  previewActions: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 16,
  },
  previewButton: {
    backgroundColor: '#007AFF',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
    minWidth: 120,
    alignItems: 'center',
  },
  previewButtonSecondary: {
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
  },
  previewButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
});
