import React, { useState, useEffect, useRef } from 'react';
import { Text, View, Button, StyleSheet, ActivityIndicator, Alert, Animated } from 'react-native';
import { Accelerometer } from 'expo-sensors';

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
            setSteps(prevSteps => {
              animateSteps();
              return prevSteps + 1;
            });
          } else {
            if (delta > threshold / 2) { 
              Alert.alert('Other Motion Detected');
            }
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
        toValue: -50, // Adjust this value to control how far the steps move upwards
        duration: 250, // Adjust animation duration as needed
        useNativeDriver: true,
      }),
      Animated.timing(translateYAnimation, {
        toValue: 0,
        duration: 250,
        useNativeDriver: true,
      }),
    ]).start();
  };

  const resetSteps = () => {
    setSteps(0);
  };

  return (
    <View style={styles.container}>
      <Animated.View style={{ transform: [{ translateY: translateYAnimation }] }}>
        <Text style={styles.text}>🦵</Text>
      </Animated.View>
      <Text style={styles.text}>Steps: {steps}</Text>
      <View style={styles.buttonContainer}>
        <Button
          title={isTracking ? 'Stop Tracking' : 'Start Tracking'}
          onPress={() => setIsTracking(prevState => !prevState)}
          style={styles.button}
          color={isTracking ? "#dc3545" : "#007bff"}
        />
        <Button
          title="Reset Steps"
          onPress={resetSteps}
          style={styles.button}
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
    backgroundColor: 'white',
  },
  text: {
    fontSize: 24,
    marginBottom: 20,
    color: '#333',
    // fontFamily: 'italic',
    fontStyle: 'italic',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '80%',
  },
  button: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 5,
    fontFamily: 'Arial',
  },
  activityIndicator: {
    marginTop: 10,
  },
});
