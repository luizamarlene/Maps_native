import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Platform,
  PermissionsAndroid,
  Dimensions,
  Button,
  Alert,
} from 'react-native';
import MapView from 'react-native-maps';
import Geolocation from '@react-native-community/geolocation';

const {width, height} = Dimensions.get('screen');

export default function App() {
  const [region, setRegion] = useState(null);
  const [lat, setLat] = useState('');
  const [long, setLong] = useState('');
  useEffect(() => {
    getMyLocation();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function getMyLocation() {
    Geolocation.getCurrentPosition(
      info => {
        //recebe as infos
        setRegion({
          //enviar pra var region
          latitude: info.coords.latitude,
          longitude: info.coords.longitude,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        });
      },
      () => {
        console.error('deu ruim');
      },
      {
        enableHighAccuracy: true,
        timeout: 2000,
      },
    );
  }

  function home() {
    setLat(region.latitude);
    setLong(region.longitude);
  }

  return (
    <View style={styles.container}>
      <MapView
        onMapReady={() => {
          //QND O MAPA TIVE CARREGADO
          Platform.OS === 'android' //SE FOR ANDROID
            ? PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
              ).then(() => {
                console.log('USUARIO ACEITOU');
              })
            : '';
        }}
        style={styles.map}
        region={region} //região
        zoomEnabled={true}
        minZoomLevel={17}
        showsUserLocation={true}
        loadingEnabled={true}
      />
      <Button style={styles.button} title="Minha casa" onPress={home} />
      <Text>{lat}</Text>
      <Text>{long}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  texto: {
    textAlign: 'center',
    marginTop: 30,
    fontSize: 30,
    fontWeight: 'bold',
    color: 'red',
  },
  map: {
    width: width,
    height: 500,
    marginBottom: 20,
  },
  button: {
    color: 'red',
    borderRadius: 20,
  },
});
