import React, { useState, useEffect, useRef } from 'react';
import { Text, View, Button, StyleSheet, ActivityIndicator, Alert, Animated } from 'react-native';
import { Accelerometer } from 'expo-sensors';
import { AnimatedCircularProgress } from 'react-native-circular-progress';

export default function StepCounter() {
  const [steps, setSteps] = useState(0);
  const [isTracking, setIsTracking] = useState(false);
  const [lastAcceleration, setLastAcceleration] = useState(null);
  const [isPeak, setIsPeak] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const threshold = 0.1;
  const updateInterval = 100;

  const translateYAnimation = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    let subscription;

    const handleAcceleration = ({ x, y, z }) => {
      const acceleration = Math.sqrt(x * x + y * y + z * z);

      if (lastAcceleration !== null) {
        const delta = Math.abs(acceleration - lastAcceleration);

        if (!isPeak && acceleration > lastAcceleration) {
          setIsPeak(true);
        } else if (isPeak && acceleration < lastAcceleration) {
          setIsPeak(false);
          if (delta > threshold) {
            setSteps(prevSteps => prevSteps + 1);
          } else if (delta > threshold / 2) {
            Alert.alert('Other Motion Detected', 'Other motion detected, but not counted as a step.');
          }
        }
      }

      setLastAcceleration(acceleration);
    };

    const startTracking = async () => {
      setIsLoading(true);
      Accelerometer.setUpdateInterval(updateInterval);
      subscription = Accelerometer.addListener(handleAcceleration);
      setIsTracking(true);
      setIsLoading(false);
    };

    const stopTracking = () => {
      subscription && subscription.remove();
      setIsTracking(false);
    };

    if (isTracking) {
      startTracking();
    } else {
      stopTracking();
    }

    return () => {
      subscription && subscription.remove();
    };
  }, [isTracking, lastAcceleration, isPeak]);

  const animateSteps = () => {
    Animated.sequence([
      Animated.timing(translateYAnimation, {
        toValue: -10,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.timing(translateYAnimation, {
        toValue: 0,
        duration: 100,
        useNativeDriver: true,
      }),
    ]).start();
  };

  const resetSteps = () => {
    setSteps(0);
  };

  return (
    <View style={styles.container}>
      <AnimatedCircularProgress
        size={200}
        width={20}
        fill={(steps % 10000) / 100}
        tintColor="#00e0ff"
        backgroundColor="#3d5875"
        lineCap="round"
        rotation={0}
        style={styles.circularProgress}
      >
        {() => (
          <View style={styles.progressContent}>
            <Text style={styles.stepCounter}>{steps}</Text>
            <Text style={styles.stepText}>Steps</Text>
          </View>
        )}
      </AnimatedCircularProgress>
      <View style={styles.buttonContainer}>
        <Button
          title={isTracking ? 'Stop Tracking' : 'Start Tracking'}
          onPress={() => setIsTracking(prevState => !prevState)}
          color={isTracking ? "#dc3545" : "#007bff"}
        />
        <Button
          title="Reset Steps"
          onPress={resetSteps}
          color="#dc3545"
        />
      </View>
      {isLoading && <ActivityIndicator style={styles.activityIndicator} size="large" color="#007bff" />}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f6fa',
    paddingHorizontal: 20,
  },
  circularProgress: {
    marginBottom: 40,
  },
  progressContent: {
    alignItems: 'center',
  },
  stepCounter: {
    fontSize: 40,
    fontWeight: 'bold',
    color: '#00e0ff',
  },
  stepText: {
    fontSize: 20,
    color: '#3d5875',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    marginBottom: 20,
  },
  activityIndicator: {
    marginBottom: 10,
  },
});
