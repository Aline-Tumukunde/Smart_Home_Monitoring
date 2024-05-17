import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { Ionicons } from '@expo/vector-icons';
import * as ScreenOrientation from 'expo-screen-orientation';
import MapScreen from './Sensors/MapScreen';
import StepCounter from './Sensors/StepCounter';
import LightSensorScreen from './Sensors/LightSensorScreen';
import Interface from './Sensors/Interface';
import WelcomeScreen from './Sensors/WelcomeScreen';

const Drawer = createDrawerNavigator();

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
      ScreenOrientation.unlockAsync();
    };
  }, [orientation]);

  const toggleOrientation = () => {
    setOrientation(prevOrientation =>
      prevOrientation === 'PORTRAIT' ? 'LANDSCAPE' : 'PORTRAIT'
    );
  };

  return (
    <NavigationContainer>
      <Drawer.Navigator>
        <Drawer.Screen
          name="Welcome"
          component={WelcomeScreen}
          options={{
            drawerIcon: ({ color, size }) => (
              <Ionicons name="home" size={size} color={color} />
            ),
          }}
        />
        <Drawer.Screen
          name="MapScreen"
          component={MapScreen}
          options={{
            drawerIcon: ({ color, size }) => (
              <Ionicons name="map" size={size} color={color} />
            ),
          }}
        />
        <Drawer.Screen
          name="StepCounterScreen"
          component={StepCounter}
          options={{
            drawerIcon: ({ color, size }) => (
              <Ionicons name="walk" size={size} color={color} />
            ),
          }}
        />
        <Drawer.Screen
          name="LightSensorScreen"
          component={LightSensorScreen}
          options={{
            drawerIcon: ({ color, size }) => (
              <Ionicons name="flash" size={size} color={color} />
            ),
          }}
        />
        <Drawer.Screen
          name="Interface"
          component={Interface}
          options={{
            drawerIcon: ({ color, size }) => (
              <Ionicons name="person" size={size} color={color} />
            ),
          }}
        />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}
