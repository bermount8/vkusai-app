import React, { useState, useRef, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, ActivityIndicator, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { useColorScheme } from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';
import { FontAwesome } from '@expo/vector-icons';
import { CameraView, CameraType, useCameraPermissions } from 'expo-camera';
import * as ImagePicker from 'expo-image-picker';

export default function CameraScreen() {
  // Force light mode
  const isDark = false;
  
  const params = useLocalSearchParams();
  const source = params.source as string;
  const initialUri = params.uri as string;
  
  const [permission, requestPermission] = useCameraPermissions();
  const [facing, setFacing] = useState<CameraType>('back');
  const [isCapturing, setIsCapturing] = useState(false);
  const [capturedImage, setCapturedImage] = useState<string | null>(initialUri || null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const cameraRef = useRef<CameraView>(null);
  
  // Request camera permissions when component mounts
  useEffect(() => {
    if (!permission) {
      requestPermission();
    }
  }, [permission, requestPermission]);

  const takePicture = async () => {
    if (isCapturing || !cameraRef.current) return;
    
    setIsCapturing(true);
    
    try {
      const photo = await cameraRef.current.takePictureAsync({
        quality: 0.8,
        base64: false,
      });
      
      if (photo && photo.uri) {
        setCapturedImage(photo.uri);
      }
    } catch (error) {
      console.error('Error taking picture:', error);
      Alert.alert('Error', 'Failed to take picture. Please try again.');
    } finally {
      setIsCapturing(false);
    }
  };
  
  const pickImageFromGallery = async () => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 0.8,
      });

      if (!result.canceled && result.assets && result.assets[0]) {
        setCapturedImage(result.assets[0].uri);
      }
    } catch (error) {
      console.error('Error picking image:', error);
      Alert.alert('Error', 'Failed to pick image from gallery. Please try again.');
    }
  };
  
  const retakePicture = () => {
    setCapturedImage(null);
  };
  
  const analyzePicture = async () => {
    if (!capturedImage || isAnalyzing) return;
    
    setIsAnalyzing(true);
    
    try {
      // Defensive check
      if (!capturedImage) {
        Alert.alert('Error', 'No photo captured. Please take a photo first.');
        setIsAnalyzing(false);
        return;
      }

      // Fake nutrition analysis result
      const fakeResult = {
        calories: 520,
        protein: 32,
        carbs: 55,
        fat: 18,
        items: ["Grilled Chicken", "Brown Rice", "Mixed Vegetables"]
      };

      // Navigate to confirm screen with photo URI and fake results
      router.push({
        pathname: '/meals/confirm',
        params: {
          photoUri: capturedImage,
          calories: fakeResult.calories.toString(),
          protein: fakeResult.protein.toString(),
          carbs: fakeResult.carbs.toString(),
          fat: fakeResult.fat.toString(),
          items: JSON.stringify(fakeResult.items),
        },
      });
    } catch (error) {
      console.error('Error analyzing picture:', error);
      Alert.alert('Error', 'Failed to analyze image. Please try again.');
    } finally {
      setIsAnalyzing(false);
    }
  };
  
  const toggleCameraFacing = () => {
    setFacing(current => (current === 'back' ? 'front' : 'back'));
  };
  
  if (!permission) {
    return (
      <View style={[styles.container, styles.centered]}>
        <Text style={styles.text}>Requesting camera permission...</Text>
      </View>
    );
  }
  
  if (!permission.granted) {
    return (
      <View style={[styles.container, styles.centered]}>
        <Text style={styles.text}>
          Camera access denied. Please enable camera permissions in your device settings.
        </Text>
        <TouchableOpacity style={styles.button} onPress={requestPermission}>
          <Text style={styles.buttonText}>Grant Permission</Text>
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
          <CameraView 
            ref={cameraRef}
            style={styles.cameraPreview}
            facing={facing}
            mode="picture"
          />
          
          <View style={styles.cameraControls}>
            <TouchableOpacity style={styles.galleryButton} onPress={pickImageFromGallery}>
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
            
            <TouchableOpacity style={styles.flipButton} onPress={toggleCameraFacing}>
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
