import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Platform } from 'react-native';
import { LightSensor } from 'expo-sensors';
import { NativeModules } from 'react-native';

const { TorchModule } = NativeModules;

const LightSensorScreen = () => {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const subscribeToLightSensor = async () => {
      LightSensor.addListener(({ light }) => {
        setIsDark(light < 100); // Adjust the threshold as per your requirement
      });
    };

    subscribeToLightSensor();

    return () => {
      LightSensor.removeAllListeners();
    };
  }, []);

  useEffect(() => {
    const controlFlashlight = () => {
      if (TorchModule && TorchModule.toggleFlashlight) {
        const shouldTurnOnLight = !isDark; // Inverse the value of isDark to turn on the light when it's dark
        TorchModule.toggleFlashlight(shouldTurnOnLight);
      }
    };

    controlFlashlight();
  }, [isDark]);

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Light Sensor: {isDark ? 'Dark' : 'Bright'}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 20,
  },
});

export default LightSensorScreen;
