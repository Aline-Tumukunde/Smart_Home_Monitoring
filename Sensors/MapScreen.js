import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { useTranslation } from 'react-i18next'; // Import the useTranslation hook

const MapScreen = () => {
  const { t } = useTranslation(); // Use the useTranslation hook to access translation function

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: 37.78825,
          longitude: -122.4324,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
      >
        <Marker
          coordinate={{ latitude: 37.78825, longitude: -122.4324 }}
          title={t('marker_title')} // Translate the marker title
          description={t('marker_description')} // Translate the marker description
        />
      </MapView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
});

export default MapScreen;
