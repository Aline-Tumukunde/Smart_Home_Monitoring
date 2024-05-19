import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, TouchableOpacity, View, Platform, Modal, TouchableHighlight } from 'react-native';
import { LightSensor } from 'expo-sensors';
import { FontAwesome5 } from '@expo/vector-icons';

export default function LightSensorComponent() {
    const [illuminance, setIlluminance] = useState(0);
    const [iconColor, setIconColor] = useState("#333");
    const [modalVisible, setModalVisible] = useState(false);
    const [notification, setNotification] = useState(null);
    const [subscription, setSubscription] = useState(null);

    useEffect(() => {
        _toggle();

        return () => {
            _unsubscribe();
        };
    }, []);

    const _toggle = () => {
        if (subscription) {
            _unsubscribe();
        } else {
            _subscribe();
        }
    };

    const _subscribe = () => {
        const sub = LightSensor.addListener(({ illuminance }) => {
            setIlluminance(illuminance);
            checkIlluminanceThreshold(illuminance);
        });
        setSubscription(sub);
    };

    const _unsubscribe = () => {
        subscription && subscription.remove();
        setSubscription(null);
    };

    const checkIlluminanceThreshold = (illum) => {
        if (illum > 100) {
            setNotification('High Light Alert: The ambient light level is high.');
            setModalVisible(true);
        } else if (illum < 100) {
            setNotification('Low Light Alert: The ambient light level is low.');
            setModalVisible(true);
        } else {
            setNotification(null);
            setModalVisible(false);
        }
    };

    const renderModal = () => {
        return (
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                    setModalVisible(!modalVisible);
                }}
            >
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <Text style={styles.modalText}>{notification}</Text>
                        <TouchableHighlight
                            style={{ ...styles.openButton, backgroundColor: "#2196F3" }}
                            onPress={() => {
                                setModalVisible(!modalVisible);
                            }}
                        >
                            <Text style={styles.textStyle}>Dismiss</Text>
                        </TouchableHighlight>
                    </View>
                </View>
            </Modal>
        );
    };

    useEffect(() => {
        if (illuminance > 0) {
            setIconColor("yellow");
        } else {
            setIconColor("#333");
        }
    }, [illuminance]);

    return (
        <View style={styles.container}>
            <View style={styles.sensor}>
                <FontAwesome5 name={'lightbulb'} size={100} color={iconColor} style={styles.icon} />

                <Text style={[styles.sensorText, { color: '#fff' }]}>Light Sensor</Text>
                <Text style={[styles.sensorValue, { color: '#fff' }]}>{Platform.OS === 'android' ? `${illuminance} lx` : `Only available on Android`}</Text>
                <TouchableOpacity onPress={_toggle} style={styles.toggleButton}>
                    <Text style={styles.toggleButtonText}>{subscription ? "Stop" : "Start"} Monitoring</Text>
                </TouchableOpacity>
            </View>
            {renderModal()}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#34495e', // Container background color
        paddingHorizontal: 20,
        paddingTop: 50,
    },
    sensor: {
        alignItems: 'center',
        backgroundColor: '#81A0BF', // Data container background color
        borderRadius: 20,
        padding: 20,
        width: '100%', 
        elevation: 5,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 4,
    },
    icon: {
        marginBottom: 20,
    },
    sensorText: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    sensorValue: {
        fontSize: 18,
        marginBottom: 20,
    },
    toggleButton: {
        backgroundColor: '#2196F3',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 10,
    },
    toggleButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 10,
    },
    modalView: {
        backgroundColor: "white",
        borderRadius: 20,
        padding: 35,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    openButton: {
        backgroundColor: "#F194FF",
        borderRadius: 20,
        padding: 10,
        elevation: 2,
    },
    textStyle: {
        color: "white",
        fontWeight: "bold",
        textAlign: "center",
    },
    modalText: {
        marginBottom: 15,
        textAlign: "center",
    },
});
