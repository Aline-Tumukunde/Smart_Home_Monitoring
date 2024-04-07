import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { Magnetometer } from 'expo-sensors';

const Compass = () => {
  const [compassData, setCompassData] = useState({
    x: 0,
    y: 0,
    z: 0,
  });

  useEffect(() => {
    const subscription = Magnetometer.addListener((data) => {
      setCompassData(data);
    });

    Magnetometer.setUpdateInterval(100); // Set update interval as needed

    return () => {
      subscription && subscription.remove();
    };
  }, []);

  // Calculate the rotation angle based on compass data
  const rotationAngle = compassData ? Math.atan2(compassData.y, compassData.x) * (180 / Math.PI) : 0;
  const direction = getDirection(rotationAngle);

  return (
    <View style={styles.container}>
      <View style={styles.compassContainer}>
        <View style={[styles.needle, { transform: [{ rotate: `${rotationAngle}deg` }] }]}></View>
        <Text style={[styles.directionText, styles.north]}>S</Text>
        <Text style={[styles.directionText, styles.east]}>W</Text>
        <Text style={[styles.directionText, styles.south]}>N</Text>
        <Text style={[styles.directionText, styles.west]}>E</Text>
      </View>
      <View style={styles.infoContainer}>
        <Text style={styles.info}>{Math.round(rotationAngle)}° {direction}</Text>
      </View>
    </View>
  );
};

const getDirection = (angle) => {
  if (angle >= -45 && angle < 45) {
    return 'South';
  } else if (angle >= 45 && angle < 135) {
    return 'West';
  } else if (angle >= 135 && angle < 225) {
    return 'North';
  } else if (angle >= 225 && angle < 315) {
    return 'East';
  } else {
    return 'South';
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  compassContainer: {
    width: 300,
    height: 300,
    borderRadius: 150,
    borderColor: 'white', // Changed line color to white
    borderWidth: 2,
    position: 'relative',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'black',
  },
  directionText: {
    position: 'absolute',
    fontSize: 16,
    color: 'white', // Changed text color to white
  },
  north: {
    top: 10,
    alignSelf: 'center',
  },
  east: {
    right: 10,
    alignSelf: 'center',
  },
  south: {
    bottom: 10,
    alignSelf: 'center',
  },
  west: {
    left: 10,
    alignSelf: 'center',
  },
  needle: {
    position: 'absolute',
    width: 2,
    height: '40%',
    backgroundColor: 'white', // Changed needle color to white
    top: '50%',
    left: '50%',
    marginLeft: -1,
    marginTop: -30,
  },
  infoContainer: {
    marginTop: 20,
  },
  info: {
    fontSize: 20,
    color: 'black', // Changed text color to black
  },
});

export default Compass;
