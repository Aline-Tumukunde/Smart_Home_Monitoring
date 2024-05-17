import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Platform } from 'react-native';
import { Gyroscope } from 'expo-sensors';

export default function ScreenRotation() {
  const [rotation, setRotation] = useState(0);

  useEffect(() => {
    let subscription;
    if (Platform.OS === 'ios') {
      subscription = Gyroscope.addListener(({ x, y }) => {
        const newRotation = Math.atan2(y, x) * (180 / Math.PI);
        setRotation(newRotation);
      });
    } else {
      subscription = Gyroscope.addListener(({ x, y, z }) => {
        const newRotation = Math.atan2(x, -y) * (180 / Math.PI);
        setRotation(newRotation);
      });
    }

    return () => {
      if (subscription) {
        subscription.remove();
      }
    };
  }, []);

  return (
    <View style={[styles.container, { transform: [{ rotate: `${rotation}deg` }] }]}>
      <Text>Rotate me!</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
