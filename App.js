import React, { useState, useEffect } from 'react';
import { View, StyleSheet, TouchableOpacity, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import MapScreen from './Sensors/MapScreen';
import StepCounter from './Sensors/StepCounter';
import LightSensorScreen from './Sensors/LightSensorScreen';
import CompassScreen from './Sensors/CompassScreen';
import * as ScreenOrientation from 'expo-screen-orientation';

const Tab = createBottomTabNavigator();

const MainTabNavigator = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="MapScreen"
        component={MapScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="map" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="StepCounterScreen"
        component={StepCounter}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="walk" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="LightSensorScreen"
        component={LightSensorScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="flash" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="CompassScreen"
        component={CompassScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="compass" size={size} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default function App() {
  const [orientation, setOrientation] = useState('PORTRAIT');

  useEffect(() => {
    const changeScreenOrientation = async () => {
      await ScreenOrientation.lockAsync(
        orientation === 'PORTRAIT'
          ? ScreenOrientation.OrientationLock.PORTRAIT
          : ScreenOrientation.OrientationLock.LANDSCAPE
      );
    };

    changeScreenOrientation();

    return () => {
      ScreenOrientation.unlockAsync(); // Unlock the screen orientation when unmounting
    };
  }, [orientation]);

  const toggleOrientation = () => {
    setOrientation(prevOrientation =>
      prevOrientation === 'PORTRAIT' ? 'LANDSCAPE' : 'PORTRAIT'
    );
  };

  return (
    <NavigationContainer>
      <MainTabNavigator />
      <TouchableOpacity style={styles.rotateButton} onPress={toggleOrientation}>
        <Text style={styles.buttonText}>
          Rotate to {orientation === 'PORTRAIT' ? 'Landscape' : 'Portrait'}
        </Text>
      </TouchableOpacity>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  rotateButton: {
    position: 'absolute',
    top: 30,
    right: 10,
    backgroundColor: 'skyblue',
    padding: 6,
    borderRadius: 5,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
  },
});
