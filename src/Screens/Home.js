import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Alert,
  Button,
} from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import httpUtils from '../Utils/HttpUtils';
import Geolocation from '@react-native-community/geolocation';


const Home = (props) => {

  const [table, setTable] = useState([]);
  const [lat, setlat] = useState('');
  const [long, setLong] = useState('');


  const user = 'JankiJ';
  const pass = '1987';

  useEffect(() => {
    Geolocation.getCurrentPosition(
      (position) => {
        const currentLongitude =
          JSON.stringify(position.coords.longitude);
        setLong(currentLongitude)
        const currentLatitude =
          JSON.stringify(position.coords.latitude);
        setlat(currentLatitude)

        console.log(lat,long,"latlong")

      }, (error) => alert(error.message), {
      enableHighAccuracy: true, timeout: 20000, maximumAge: 1000
    }
    );
  })

  const storeUserData = async (userData) => {
    await AsyncStorage.setItem(
      'globalData',
      JSON.stringify(userData));
  }

  const ViewMap = async () => {

    const request = {
      'UserName': user,
      'Password': pass
    }
    // console.log(request, "request")
    await axios({
      method: 'post',
      url: `${httpUtils.API_BASE_URL}${httpUtils.LOGIN}`,
      data: request
    })
      .then(async response => {
        if (response.status === 200) {
          //console.log(response.data.Table2, 'Data')

          storeUserData(response.data.Table2)
          props.navigation.navigate('Map')
        }
        else {
          Alert.alert('Error!', response.data.msg)
        }
      })
      .catch(error => {

        console.log(error, "error")
      });



  }

  const distance = (lat1, long1, lat2, long2) => {
    let R = 6371;
    return Math.acos(Math.sin(lat1) * Math.sin(lat2) +
      Math.cos(lat1) * Math.cos(lat2) *
      Math.cos(long2 - long1)) * R;
  }

  const ViewData = () => {
    const latitude = lat;
    const longitude = long;

    const data = {
      'UserName': user,
      'Password': pass
    };
    fetch('http://94.237.72.174/AUDITRESTAPI/api/Values/Login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
      .then(response => response.json())
      .then(data => {

        var tempArray = []

        for (let item of data.Table2) {
          var dist = distance(latitude, longitude, item.Latitude, item.Longitude)
          if (dist <= 50) {
            tempArray.push(item)
          }
        }
        setTable(tempArray)

        props.navigation.navigate('MapData', { tableData: tempArray })

      })
      .catch((error) => {
        console.error('Error:', error);
      });



  }

  return (
    <View style={styles.container}>
      <Button style={styles.button} title='Go To Map' onPress={ViewMap}></Button>
      <Button style={styles.button} title='MapData' onPress={ViewData}></Button>
    </View>
  )
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center'
  },
  button: {
    flex: 1,

  }
})
export default Home;