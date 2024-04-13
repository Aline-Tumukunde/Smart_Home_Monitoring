import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Brightness } from 'expo';

export default function App() {
  const [brightnessLevel, setBrightnessLevel] = useState(1); // Initial brightness level

  useEffect(() => {
    const _getBrightness = async () => {
      try {
        const currentBrightness = await Brightness.getSystemBrightnessAsync();
        setBrightnessLevel(currentBrightness);
      } catch (error) {
        console.error('Error getting brightness:', error);
      }
    };

    _getBrightness();

    // Set up a listener for changes in ambient light and update brightness level
    const brightnessListener = Brightness.addBrightnessChangeListener(({ brightness }) => {
      setBrightnessLevel(brightness);
    });

    // Clean up listener
    return () => {
      brightnessListener.remove();
    };
  }, []);

  // Function to adjust screen brightness based on ambient light
  const adjustBrightness = async (brightness) => {
    try {
      await Brightness.setSystemBrightnessAsync(brightness);
    } catch (error) {
      console.error('Error setting brightness:', error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Auto Brightness: {brightnessLevel}</Text>
      {/* You can display brightnessLevel in whatever way you want */}
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
