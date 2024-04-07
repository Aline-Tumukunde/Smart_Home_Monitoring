import React, { useState, useEffect } from 'react';
import { Text, View, Button, StyleSheet } from 'react-native';
import { Accelerometer } from 'expo-sensors';

export default function StepCounter() {
  const [steps, setSteps] = useState(0);
  const [isTracking, setIsTracking] = useState(false);
  const [lastAcceleration, setLastAcceleration] = useState(null);
  const [isPeak, setIsPeak] = useState(false);
  const threshold = 0.1;
  const updateInterval = 50;

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
          }
        }
      }

      setLastAcceleration(acceleration);
    };

    const startTracking = async () => {
      Accelerometer.setUpdateInterval(updateInterval);
      subscription = Accelerometer.addListener(handleAcceleration);
      setIsTracking(true);
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

  const resetSteps = () => {
    setSteps(0);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Steps: {steps}</Text>
      <Button
        title={isTracking ? 'Stop Tracking' : 'Start Tracking'}
        onPress={() => setIsTracking(prevState => !prevState)}
      />
      <Button title="Reset Steps" onPress={resetSteps} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 24,
    marginBottom: 20,
  },
});
