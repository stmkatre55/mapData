import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Button,
} from 'react-native';
import MapView from 'react-native-maps';
import AsyncStorage from "@react-native-async-storage/async-storage";

const Map = () => {
  const [table, setTable] = useState([]);

  const lat = table.Latitude;
  const long = table.Longitude;


  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {

    try {

      const value = await AsyncStorage.getItem('globalData');
      if (value !== null) {
        let parsed = JSON.parse(value);
        setTable(parsed)
      }
    } catch (error) {
      // Error retrieving data
      console.log('value')
    }

  }
  return (
    <View style={styles.MainContainer}>

      <MapView
        style={styles.mapStyle}
        showsUserLocation={false}
        zoomEnabled={true}
        zoomControlEnabled={true}
      >

        {
          table.map(table => (
            <MapView.Marker
              coordinate={{ latitude: table.Latitude, longitude: table.Longitude }}
              title={table.LocationName}
            />
          ))}
      </MapView>

    </View>
  )
}
const styles = StyleSheet.create({
  MainContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  mapStyle: {
    flex: 1,
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 50,
  },
  button: {
    flex: 1,
  }
});
export default Map;