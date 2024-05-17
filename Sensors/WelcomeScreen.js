import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';

const WelcomeDashboard = ({ navigation }) => {

    // Example navigation function
    const handlePress = (screen) => {
        console.log(`Navigate to ${screen}`);
        navigation.navigate(screen);
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Welcome to Smart Home Monitoring System</Text>
            <View style={styles.cardContainer}>
                <View style={styles.row}>
                    <TouchableOpacity
                        style={[styles.card, { backgroundColor: '#3A638C' }]}
                        onPress={() => handlePress('LightSensorScreen')}>
                        <Text style={styles.cardText}>LightSensor</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={[styles.card, { backgroundColor: '#81A0BF' }]}
                        onPress={() => handlePress('Interface')}>
                        <Text style={styles.cardText}>UserInterface</Text>
                    </TouchableOpacity>
                </View>

                <View style={styles.row}>
                    <TouchableOpacity
                        style={[styles.card, { backgroundColor: '#074E4F' }]}
                        onPress={() => handlePress('MapScreen')}>
                        <Text style={styles.cardText}>Map</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
   style={[styles.card, { backgroundColor: '#17863E' }]}
   onPress={() => handlePress('StepCounterScreen')}>
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
        padding: 20,
    },
    title: {
        fontSize: 24,
        marginBottom: 20,
    },
    cardContainer: {
        width: '100%',
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginBottom: 10,
    },
    card: {
        width: windowWidth * 0.45,
        maxWidth: windowWidth * 0.45,
        height: 120,
        borderRadius: 8,
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.23,
        shadowRadius: 2.62,
        elevation: 4,
    },
    cardText: {
        color: 'white',
        fontSize: 16,
        textAlign: 'center',
    },
});

export default WelcomeDashboard;
