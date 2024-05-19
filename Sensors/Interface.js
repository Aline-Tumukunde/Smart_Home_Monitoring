import React, { useState, useEffect } from 'react';
import { View, Text, Alert, StyleSheet, Dimensions } from 'react-native';
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
      Alert.alert(
        'Motion Detected',
        'Motion has been detected!',
        [
          {
            text: 'OK',
            style: 'cancel',
            onPress: () => console.log('OK Pressed')
          }
        ],
        {
          cancelable: false,
          style: 'default',
          titleStyle: styles.alertTitle,
          messageStyle: styles.alertMessage,
          overlayStyle: styles.alertOverlay,
          backgroundColor: '#34495e',
          shadowColor: '#000',
          shadowOpacity: 0.3,
          shadowRadius: 5,
          elevation: 5,
          tintColor: '#fff',
          titleNumberOfLines: 2,
          messageNumberOfLines: 2,
        }
      );
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: '#34495e' }]}>
      <Text style={styles.heading}>Accelerometer Data</Text>
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
          width={Dimensions.get('window').width - 40}
          height={220}
          yAxisSuffix="g"
          chartConfig={{
            backgroundColor: '#e26a00',
            backgroundGradientFrom: '#fb8c00',
            backgroundGradientTo: '#ffa726',
            decimalPlaces: 2,
            color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
            labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
            style: {
              borderRadius: 16,
            },
            propsForDots: {
              r: '6',
              strokeWidth: '2',
              stroke: '#ffa726',
            },
          }}
          bezier
          style={styles.chart}
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
    backgroundColor: '#34495e',
    padding: 20,
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#ffffff',
  },
  dataContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '80%',
    marginBottom: 20,
    backgroundColor: '#81A0BF',
    padding: 10,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5,
  },
  data: {
    fontSize: 18,
    color: '#ffffff',
  },
  chartContainer: {
    marginTop: 10,
    borderRadius: 16,
  },
  chart: {
    borderRadius: 16,
  },
  alertTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
  },
  alertMessage: {
    fontSize: 16,
    color: '#fff',
  },
  alertOverlay: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent black overlay
  },
});

export default SensorDataScreen;
