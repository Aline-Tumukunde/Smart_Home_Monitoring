import React, { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';
const HOME_COORDINATES = { latitude: 37.7749, longitude: -122.4194 }; 
const WORK_COORDINATES = { latitude: 37.7749, longitude: -122.4194 }; 

export default function App() {
  const [region, setRegion] = useState(null);

  useEffect(() => {
    (async () => {
      
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        console.error('Permission to access location was denied');
        return;
      }
      Location.watchPositionAsync({ distanceInterval: 10 }, handleLocationUpdate);
    })();
  }, []);

  const handleLocationUpdate = (location) => {
    const { latitude, longitude } = location.coords;
    setRegion({ latitude, longitude });
    if (isInsideGeofence(location.coords, HOME_COORDINATES)) {
      console.log('Device is at home');
    }

    if (isInsideGeofence(location.coords, WORK_COORDINATES)) {
      console.log('Device is at work');
    }
  };
  const isInsideGeofence = (currentCoords, geofenceCoords) => {
    const { latitude, longitude } = currentCoords;
    const latDiff = Math.abs(latitude - geofenceCoords.latitude);
    const longDiff = Math.abs(longitude - geofenceCoords.longitude);
    return latDiff < 0.001 && longDiff < 0.001; 
  };

  return (
    <View style={styles.container}>
      {region && (
        <MapView
          style={styles.map}
          initialRegion={{
            ...region,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
          showsUserLocation={true}
          followsUserLocation={true}
        >
          <Marker coordinate={{ latitude: region.latitude, longitude: region.longitude }} />
        </MapView>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  map: {
    width: '100%',
    height: '100%',
  },
});
