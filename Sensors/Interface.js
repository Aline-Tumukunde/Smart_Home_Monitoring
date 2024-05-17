import React, { useState, useEffect } from 'react';
import { View, Text, Alert } from 'react-native';
import { Accelerometer } from 'expo-sensors';
import { LineChart } from 'react-native-chart-kit';

const SensorDataScreen = () => {
  const [accelerometerData, setAccelerometerData] = useState({ x: 0, y: 0, z: 0 });

  useEffect(() => {
    const subscription = Accelerometer.addListener(accelerometerData => {
      setAccelerometerData(accelerometerData);
      checkForMotion(accelerometerData);
    });

    return () => {
      subscription.remove();
    };
  }, []);

  const checkForMotion = ({ x, y, z }) => {
    const threshold = 1.5; // Adjust as needed
    const motionDetected = Math.sqrt(x * x + y * y + z * z) > threshold;
    if (motionDetected) {
      Alert.alert('Motion Detected', 'Motion has been detected!');
    }
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Accelerometer Data:</Text>
      <Text>X: {accelerometerData.x.toFixed(2)}</Text>
      <Text>Y: {accelerometerData.y.toFixed(2)}</Text>
      <Text>Z: {accelerometerData.z.toFixed(2)}</Text>
      <LineChart
        data={{
          labels: ['X', 'Y', 'Z'],
          datasets: [{ data: [accelerometerData.x, accelerometerData.y, accelerometerData.z] }],
        }}
        width={300}
        height={200}
        chartConfig={{
          backgroundGradientFrom: '#ffffff',
          backgroundGradientTo: '#ffffff',
          decimalPlaces: 2,
          color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
        }}
      />
    </View>
  );
};

export default SensorDataScreen;
