import React, { useState, useEffect } from 'react';
import { View, Text, Alert, StyleSheet } from 'react-native';
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
    <View style={styles.container}>
      <Text style={styles.heading}>Accelerometer Data:</Text>
      <View style={styles.dataContainer}>
        <Text style={styles.data}>X: {accelerometerData.x.toFixed(2)}</Text>
        <Text style={styles.data}>Y: {accelerometerData.y.toFixed(2)}</Text>
        <Text style={styles.data}>Z: {accelerometerData.z.toFixed(2)}</Text>
      </View>
      <View style={styles.chartContainer}>
        <LineChart
          data={{
            labels: ['X', 'Y', 'Z'],
            datasets: [{ data: [accelerometerData.x, accelerometerData.y, accelerometerData.z] }],
          }}
          width={350}
          height={300}
          chartConfig={{
            backgroundGradientFrom: '#f0f0f0',
            backgroundGradientTo: '#f0f0f0',
            decimalPlaces: 2,
            color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
          }}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  heading: {
    fontSize: 20,
    marginBottom: 10,
  },
  dataContainer: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  data: {
    fontSize: 16,
    marginRight: 20,
  },
  chartContainer: {
    alignItems: 'center',
  },
});

export default SensorDataScreen;
