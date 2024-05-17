import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Alert } from 'react-native';
import { Accelerometer } from 'expo-sensors';
import { LineChart } from 'react-native-chart-kit';
import { useNavigation } from '@react-navigation/native';

export default function App() {
  const navigation = useNavigation();
  const [accelerometerData, setAccelerometerData] = useState({ x: 0, y: 0, z: 0 });
  const [data, setData] = useState([]);

  useEffect(() => {
    const subscription = Accelerometer.addListener(sensorData => {
      setAccelerometerData(sensorData);
      setData(prevData => [...prevData, sensorData]);
      checkForMotion(sensorData);
    });

    return () => {
      subscription.remove();
    };
  }, []);

  const checkForMotion = ({ x, y, z }) => {
    if (Math.abs(x) > 1 || Math.abs(y) > 1 || Math.abs(z) > 1) {
      sendAlert();
    }
  };

  const sendAlert = () => {
    Alert.alert(
      'Motion Detected!',
      'Motion has been detected in your home.',
      [
        {
          text: 'OK',
          onPress: () => {
            console.log('Alert closed');
            navigation.navigate('NextScreen');
          }
        }
      ]
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.header}>Welcome to Smart Home Monitoring</Text>
      </View>
      <View style={styles.chartContainer}>
        <LineChart
          data={{
            labels: data.map((_, index) => ''),
            datasets: [
              {
                data: data.map(entry => entry.x),
                color: (opacity = 1) => `rgba(255, 0, 0, ${opacity})`,
                strokeWidth: 2,
              },
              {
                data: data.map(entry => entry.y),
                color: (opacity = 1) => `rgba(0, 255, 0, ${opacity})`,
                strokeWidth: 2,
              },
              {
                data: data.map(entry => entry.z),
                color: (opacity = 1) => `rgba(0, 0, 255, ${opacity})`,
                strokeWidth: 2,
              },
            ],
          }}
          width={350}
          height={200}
          yAxisLabel=""
          yAxisSuffix=""
          yAxisInterval={1}
          chartConfig={{
            backgroundColor: '#ffffff',
            backgroundGradientFrom: '#ffffff',
            backgroundGradientTo: '#ffffff',
            decimalPlaces: 2,
            color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
            labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
            style: {
              borderRadius: 16,
            },
            propsForDots: {
              r: '4',
              strokeWidth: '2',
              stroke: '#ffa726',
            },
          }}
          bezier
          style={styles.chart}
        />
      </View>
      <View style={styles.dataContainer}>
        <Text style={styles.data}>X: {accelerometerData.x.toFixed(2)}</Text>
        <Text style={styles.data}>Y: {accelerometerData.y.toFixed(2)}</Text>
        <Text style={styles.data}>Z: {accelerometerData.z.toFixed(2)}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f0f0f0',
    padding: 20,
  },
  headerContainer: {
    marginTop: 10,
    marginBottom: 10,
  },
  header: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
  },
  chartContainer: {
    backgroundColor: '#fff',
    borderRadius: 16,
    marginBottom: 20,
    padding: 10,
    elevation: 4,
  },
  dataContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  data: {
    fontSize: 18,
    marginRight: 10,
    color: '#555',
  },
  chart: {
    borderRadius: 16,
  },
});
