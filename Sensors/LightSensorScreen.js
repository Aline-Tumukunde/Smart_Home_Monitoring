import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { LightSensor } from 'expo-sensors';

export default function App() {
  const [illuminance, setIlluminance] = useState(0);

  useEffect(() => {
    let isMounted = true;

    const subscribeToLightSensor = async () => {
      try {
        // Check if LightSensor is available
        if (!(await LightSensor.isAvailableAsync())) {
          console.warn('Light sensor is not available.');
          // Simulate illuminance values
          const interval = setInterval(() => {
            const simulatedIlluminance = Math.random() * 1000; // Generate random illuminance value
            if (isMounted) {
              setIlluminance(simulatedIlluminance);
            }
          }, 1000); // Update every second
          
          // Clean up interval
          return () => clearInterval(interval);
        }

        // Subscribe to changes in illuminance
        LightSensor.addListener(handleLightChange);
      } catch (error) {
        console.error('Error subscribing to light sensor:', error);
      }
    };

    subscribeToLightSensor();

    // Clean up subscription
    return () => {
      isMounted = false;
      LightSensor.removeAllListeners();
    };
  }, []);

  const handleLightChange = ({ illuminance }) => {
    setIlluminance(illuminance);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Illuminance: {illuminance.toFixed(2)} lux</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: 20,
    fontWeight: 'bold',
  },
});
