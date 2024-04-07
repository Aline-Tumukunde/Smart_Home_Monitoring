import React, { useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { ScreenOrientation } from 'expo';

const ScreenRotation = ({ children }) => {
  useEffect(() => {
    async function changeScreenOrientation() {
      await ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.LANDSCAPE);
    }
    changeScreenOrientation();
    
    return async () => {
      await ScreenOrientation.unlockAsync();
    };
  }, []);

  return (
    <View style={styles.container}>
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default ScreenRotation;
