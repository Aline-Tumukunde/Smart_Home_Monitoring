import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text, Platform, Switch } from 'react-native';
import * as Brightness from 'expo-brightness';

export default function App() {
    const [brightness, setBrightness] = useState(1);
    const [darkMode, setDarkMode] = useState(false);

    useEffect(() => {
        const fetchBrightness = async () => {
            try {
                // Get the current system brightness
                const currentBrightness = await Brightness.getBrightnessAsync();
                setBrightness(currentBrightness);

                // Polling every 1000ms to update brightness
                const interval = setInterval(async () => {
                    const updatedBrightness = await Brightness.getBrightnessAsync();
                    setBrightness(updatedBrightness);
                    if (updatedBrightness < 0.5) {
                        setDarkMode(true); // Enable dark mode if brightness is low
                    } else {
                        setDarkMode(false); // Disable dark mode if brightness is high
                    }
                }, 1000);

                // Clean up interval
                return () => clearInterval(interval);
            } catch (error) {
                console.error('Error fetching brightness:', error);
            }
        };

        fetchBrightness();
    }, []);

    return (
        <View style={styles.container}>
            <Text>Current Brightness: {brightness.toFixed(2)}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});
