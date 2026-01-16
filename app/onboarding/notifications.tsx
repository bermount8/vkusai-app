import React, { useRef, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Animated,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';

export default function NotificationsBoard() {
  const opacity = useRef(new Animated.Value(0)).current;
  const translateY = useRef(new Animated.Value(12)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(opacity, {
        toValue: 1,
        duration: 400,
        useNativeDriver: true,
      }),
      Animated.timing(translateY, {
        toValue: 0,
        duration: 400,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  const requestPermission = async () => {
    // TODO: Implement actual notification permissions
    // await Notifications.requestPermissionsAsync();
    router.push('/onboarding/generate-plan');
  };

  return (
    <SafeAreaView style={styles.container}>
      <Animated.View
        style={[
          styles.content,
          { opacity, transform: [{ translateY }] },
        ]}
      >
        <Text style={styles.title}>
          Reach your goals with{'\n'}notifications
        </Text>

        {/* Fake system modal */}
        <View style={styles.fakeModal}>
          <Text style={styles.modalText}>
            Cal AI would like to send you{'\n'}Notifications
          </Text>

          <View style={styles.modalActions}>
            <TouchableOpacity style={styles.dontAllow}>
              <Text style={styles.dontAllowText}>Don't Allow</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.allow}
              onPress={requestPermission}
            >
              <Text style={styles.allowText}>Allow</Text>
            </TouchableOpacity>
          </View>
        </View>

        <Text style={styles.hint}>👇</Text>
      </Animated.View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
  },

  content: {
    alignItems: 'center',
    paddingHorizontal: 32,
  },

  title: {
    fontSize: 22,
    fontWeight: '600',
    textAlign: 'center',
    marginBottom: 32,
    lineHeight: 30,
  },

  fakeModal: {
    width: '100%',
    backgroundColor: '#E5E5EA',
    borderRadius: 14,
    paddingTop: 16,
    overflow: 'hidden',
  },

  modalText: {
    textAlign: 'center',
    fontSize: 15,
    color: '#000',
    marginBottom: 12,
    lineHeight: 20,
  },

  modalActions: {
    flexDirection: 'row',
    borderTopWidth: 1,
    borderColor: '#C6C6C8',
  },

  dontAllow: {
    flex: 1,
    paddingVertical: 12,
    alignItems: 'center',
    backgroundColor: '#D1D1D6',
  },

  dontAllowText: {
    fontSize: 16,
    color: '#000',
  },

  allow: {
    flex: 1,
    paddingVertical: 12,
    alignItems: 'center',
    backgroundColor: '#1C1C1E',
  },

  allowText: {
    fontSize: 16,
    color: '#fff',
    fontWeight: '600',
  },

  hint: {
    fontSize: 22,
    marginTop: 16,
  },
});
