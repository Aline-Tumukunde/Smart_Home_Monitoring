// App.js

import React, { useState, useEffect, createContext } from 'react';
import { View, StyleSheet, TouchableOpacity, Text, Modal, Button } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import * as ScreenOrientation from 'expo-screen-orientation';
import MapScreen from './Sensors/MapScreen';
import StepCounter from './Sensors/StepCounter';
import LightSensorScreen from './Sensors/LightSensorScreen';
import CompassScreen from './Sensors/CompassScreen';
import LocalizationScreen from './Sensors/LocalizationScreen';
import BrightnessSensorScreen from './Sensors/BrightSensorScreen'; // Import the BrightnessSensorScreen component
import i18next from 'i18next';
import { initReactI18next } from 'react-i18next';
import Constants from 'expo-constants';

// Initialize i18next with translations
i18next.use(initReactI18next).init({
  lng: 'en', // Default language
  resources: {
    en: {
      translation: {
        map: 'Map',
        walk: 'Walk',
        flash: 'Flash',
        compass: 'Compass',
        localization: 'Localization',
        rotate_to: 'Rotate to',
        landscape: 'Landscape',
        portrait: 'Portrait',
        select_language: 'Select Language',
        english: 'English',
        french: 'French',
      },
    },
    fr: {
      translation: {
        map: 'Carte',
        walk: 'Marche',
        flash: 'Flash',
        compass: 'Boussole',
        localization: 'Localisation',
        rotate_to: 'Tourner en',
        landscape: 'Paysage',
        portrait: 'Portrait',
        select_language: 'Choisir la langue',
        english: 'Anglais',
        french: 'Français',
      },
    },
  },
});

// Create a language context
const LanguageContext = createContext();

// Create Stack Navigator
const Stack = createStackNavigator();

// Create Tab Navigator
const Tab = createBottomTabNavigator();

// Define screens for Tab Navigator
const MapTabScreen = () => (
  <View style={styles.container}>
    <MapScreen />
  </View>
);

const StepCounterTabScreen = () => (
  <StepCounter />
);

const LightSensorTabScreen = () => (
  <LightSensorScreen />
);

const CompassTabScreen = () => (
  <CompassScreen />
);

const LocalizationTabScreen = () => (
  <View style={styles.container}>
    <LocalizationScreen />
  </View>
);

// Define Main Tab Navigator
const MainTabNavigator = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="MapScreen"
        component={MapTabScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="map" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="StepCounterScreen"
        component={StepCounterTabScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="walk" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="LightSensorScreen"
        component={LightSensorTabScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="flash" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="CompassScreen"
        component={CompassTabScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="compass" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="LocalizationScreen"
        component={LocalizationTabScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="pin" size={size} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

// Create Drawer Navigator
const Drawer = createDrawerNavigator();

// Define Drawer Navigator
const DrawerNavigator = () => {
  return (
    <Drawer.Navigator>
      <Drawer.Screen name="Main" component={MainTabNavigator} />
      <Drawer.Screen name="BrightnessSensorScreen" component={BrightnessSensorScreen} />
    </Drawer.Navigator>
  );
};

// App component
export default function App() {
  const [orientation, setOrientation] = useState('PORTRAIT');
  const [selectedLanguage, setSelectedLanguage] = useState('en');
  const [modalVisible, setModalVisible] = useState(false);

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

  const handleChangeLanguage = async (language) => {
    await i18next.changeLanguage(language);
    setSelectedLanguage(language);
    setModalVisible(false);
  };

  return (
    <LanguageContext.Provider value={{ selectedLanguage }}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="MainTab"
            component={DrawerNavigator} // Use DrawerNavigator instead of MainTabNavigator directly
            options={{ headerShown: false }}
          />
        </Stack.Navigator>
      </NavigationContainer>
      <TouchableOpacity style={styles.rotateButton} onPress={toggleOrientation}>
        <Text style={styles.buttonText}>
          Rotate to {orientation === 'PORTRAIT' ? 'Landscape' : 'Portrait'}
        </Text>
      </TouchableOpacity>
      <View style={styles.languageButton}>
        <Button title={i18next.t('select_language')} onPress={() => setModalVisible(true)} />
      </View>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Button title="English" onPress={() => handleChangeLanguage('en')} />
            <Button title="Français" onPress={() => handleChangeLanguage('fr')} />
          </View>
        </View>
      </Modal>
    </LanguageContext.Provider>
  );
}

// Define styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
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
  languageButton: {
    position: 'absolute',
    top: 30,
    left: 10,
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
});
