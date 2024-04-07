import React, { useState, useEffect } from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import MapScreen from './Sensors/MapScreen';
import StepCounter from './Sensors/StepCounter';
import LightSensorScreen from './Sensors/LightSensorScreen';
import CompassScreen from './Sensors/CompassScreen';
import { Localization } from 'expo';

const Drawer = createDrawerNavigator();
const Tab = createBottomTabNavigator();

const MainTabNavigator = () => {
  return (
    <Tab.Navigator>
      {/* Define your Tab Screens here */}
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
  const [language, setLanguage] = useState('en');
  const [translations, setTranslations] = useState({});

  useEffect(() => {
    loadLanguage();
  }, []);

  const loadLanguage = async () => {
    try {
      const preferredLocales = await Localization.localesAsync();
      const preferredLanguages = preferredLocales.map(locale => locale.languageCode);

      // For simplicity, we'll use the first preferred language
      const preferredLanguage = preferredLanguages[0];
      setLanguage(preferredLanguage);

      // Load translations dynamically based on preferred language
      const translationModule = require(`./translations/${preferredLanguage}.json`);
      setTranslations(translationModule);
    } catch (error) {
      console.error("Error loading language:", error);
    }
  };

  const translate = (key) => {
    // Retrieve translation from translations object
    return translations[key] || key;
  };

  return (
    <NavigationContainer>
      <Drawer.Navigator>
        <Drawer.Screen name={translate('main')} component={MainTabNavigator} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}
