import React, { useState, useEffect } from 'react';
import { Text, View, Button, StyleSheet, ActivityIndicator } from 'react-native';
import { Accelerometer } from 'expo-sensors';

export default function StepCounter() {
  const [steps, setSteps] = useState(0);
  const [isTracking, setIsTracking] = useState(false);
  const [lastAcceleration, setLastAcceleration] = useState(null);
  const [isPeak, setIsPeak] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
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

  const resetSteps = () => {
    setSteps(0);
  };

  return (
    <View style={styles.container}>
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
    backgroundColor: 'lightblue',
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
    marginTop: 20,
  },
});
