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
  const [region, setRegion] = useState({}); //vai mudar o mapa
  const [lat, setLat] = useState('');
  const [long, setLong] = useState('');
  const [local, setLocal] = useState({});
  useEffect(() => {
    getMyLocation();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function getMyLocation() {
    Geolocation.getCurrentPosition(
      info => {
        //recebe as infos e passa para o bjeto region
        console.log(info);
        setRegion({
          //enviar pra var region
          latitude: info.coords.latitude,
          longitude: info.coords.longitude,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        });
        console.log(region);
      },
      () => {
        console.error('Erro');
      },
      {
        enableHighAccuracy: true,
        timeout: 2000,
      },
    );
  }

  function goToHome() {
    // Minha casa {"latitude": -1.33684968, "latitudeDelta": 0.0922, "longitude": -48.41167595, "longitudeDelta": 0.0421}
    setRegion({
      latitude: -1.33684968,
      longitude: -48.41167595,
      latitudeDelta: 0.0922,
      longitudeDelta: 0.0421,
    });
  }

  function changeMap({latitude, longitude}) {
    setRegion({
      latitude: latitude,
      longitude: longitude,
      latitudeDelta: 0.0922,
      longitudeDelta: 0.0421,
    });
  }

  function click(e) {
    console.log(e.nativeEvent);
    setLat(e.nativeEvent);
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
        mapType="hybrid" /* standard | satellite | hybrid */
        onRegionChangeComplete={changeMap}
        onPress={click}
        style={styles.map}
        region={region} //região
        zoomEnabled={true}
        scrollEnabled={true}
        rotateEnabled={true}
        showsTraffic={true}
        minZoomLevel={19}
        showsUserLocation={true}
        loadingEnabled={true}
      />
      <Button style={styles.button} title="Minha casa" onPress={goToHome} />
      <Text style={styles.texto}>
        {region.latitude} | {region.longitude}
      </Text>
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
    fontSize: 15,
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
    marginBottom: 30,
  },
});
