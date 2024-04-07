import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { LightSensor } from 'expo-sensors';

export default function App() {
  const [lightData, setLightData] = useState(null);

  useEffect(() => {
    _subscribe();
    return () => {
      _unsubscribe();
    };
  }, []);

  const _subscribe = () => {
    LightSensor.isAvailableAsync().then(
      result => {
        if (result) {
          LightSensor.addListener(({ lightIntensity }) => {
            setLightData(lightIntensity);
          });
        } else {
          console.log('Light sensor is not available');
        }
      },
      error => {
        console.log('Error checking for light sensor availability:', error);
      }
    );
  };

  const _unsubscribe = () => {
    LightSensor.removeAllListeners();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Light Intensity: {lightData !== null ? lightData.toFixed(2) : 'Loading...'}</Text>
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
