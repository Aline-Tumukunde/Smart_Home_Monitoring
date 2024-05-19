import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Dimensions, Switch } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import Slider from '@react-native-community/slider';

const WelcomeDashboard = ({ navigation }) => {
    const [isDarkMode, setIsDarkMode] = useState(false);
    const [brightness, setBrightness] = useState(1);

    const handlePress = (screen) => {
        console.log(`Navigate to ${screen}`);
        navigation.navigate(screen);
    };

    const toggleDarkMode = () => {
        setIsDarkMode(!isDarkMode);
    };

    return (
        <View style={[styles.container, { backgroundColor: isDarkMode ? '#2c3e50' : '#ecf0f1', opacity: brightness, paddingHorizontal: 7 }]}>
            <Text style={[styles.title, { color: isDarkMode ? '#ffffff' : '#2f3640' }]}>Welcome to Smart Home Monitoring System</Text>
            <View style={styles.controlsContainer}>
                <View style={styles.darkModeContainer}>
                    <Text style={[styles.darkModeText, { color: isDarkMode ? '#ffffff' : '#2f3640' }]}>Dark Mode</Text>
                    <Switch
                        trackColor={{ false: "#767577", true: "#81b0ff" }}
                        thumbColor={isDarkMode ? "#f5dd4b" : "#f4f3f4"}
                        ios_backgroundColor="#3e3e3e"
                        onValueChange={toggleDarkMode}
                        value={isDarkMode}
                    />
                </View>
                <View style={styles.brightnessContainer}>
                    <Text style={[styles.brightnessText, { color: isDarkMode ? '#ffffff' : '#2f3640' }]}>Brightness</Text>
                    <Slider
                        style={styles.slider}
                        minimumValue={0}
                        maximumValue={1}
                        minimumTrackTintColor="#81b0ff"
                        maximumTrackTintColor="#000000"
                        thumbTintColor="#f5dd4b"
                        value={brightness}
                        onValueChange={value => setBrightness(value)}
                    />
                </View>
            </View>
            <View style={styles.cardContainer}>
                <View style={styles.row}>
                    <TouchableOpacity
                        style={[styles.card, { backgroundColor: isDarkMode ? '#34495e' : '#3A638C' }]}
                        onPress={() => handlePress('LightSensorScreen')}>
                        <Icon name="bulb-outline" size={30} color="white" />
                        <Text style={styles.cardText}>LightSensor</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={[styles.card, { backgroundColor: isDarkMode ? '#34495e' : '#81A0BF' }, { marginLeft: 20 }]}
                        onPress={() => handlePress('Interface')}>
                        <Icon name="person-outline" size={30} color="white" />
                        <Text style={styles.cardText}>UserInterface</Text>
                    </TouchableOpacity>
                </View>

                <View style={styles.row}>
                    <TouchableOpacity
                        style={[styles.card, { backgroundColor: isDarkMode ? '#34495e' : '#074E4F' }]}
                        onPress={() => handlePress('MapScreen')}>
                        <Icon name="location-outline" size={30} color="white" />
                        <Text style={styles.cardText}>Map</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={[styles.card, { backgroundColor: isDarkMode ? '#34495e' : '#17863E' }, { marginLeft: 20 }]}
                        onPress={() => handlePress('StepCounterScreen')}>
                        <Icon name="walk-outline" size={30} color="white" />
                        <Text style={styles.cardText}>MotionDetection</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
};

const windowWidth = Dimensions.get('window').width;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'center',
    },
    controlsContainer: {
        width: '100%',
        alignItems: 'center',
        marginTop: 20,
    },
    cardContainer: {
        width: '100%',
        marginTop: 20,
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginBottom: 20,
    },
    card: {
        width: windowWidth * 0.45,
        maxWidth: windowWidth * 0.45,
        height: 120,
        borderRadius: 15,
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.30,
        shadowRadius: 4.65,
        elevation: 8,
    },
    cardText: {
        color: 'white',
        fontSize: 18,
        marginTop: 10,
        textAlign: 'center',
    },
    darkModeContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 20,
    },
    darkModeText: {
        fontSize: 18,
        marginRight: 10,
    },
    brightnessContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 20,
    },
    brightnessText: {
        fontSize: 18,
        marginRight: 10,
    },
    slider: {
        width: windowWidth * 0.6,
        height: 40,
    },
});

export default WelcomeDashboard;
