import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    Alert,
    Button,
} from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import httpUtils from '../Utils/HttpUtils'



const Home = (props) => {

    const user = 'JankiJ';
    const pass = '1987';

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

    const ViewData = () => {
        const latitude = 21.823107; 
        const longitude = 80.183739;
        let radMetter = 50 * 1000; 
        const key = 'AIzaSyCP6GyCsxbJRZdcn0veAaOLy_b_9_4y4QU'
    
        const url = 'https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=' + latitude + ',' + longitude + '&radius=' + radMetter  + '&key=' + key
    
        fetch(url)
          .then(res => {
              
            return res.json()
          })
          
          .then(res => {
           //console.log(res)
    
          var places = [] 
            for(let googlePlace of res.results) {
              var place = {}
              var lat = googlePlace.geometry.location.lat;
              var lng = googlePlace.geometry.location.lng;
              var coordinate = {
                latitude: lat,
                longitude: lng,
               
          
            }
    
              place['placeTypes'] = googlePlace.types
              place['coordinate'] = coordinate
              place['placeId'] = googlePlace.place_id
              place['placeName'] = googlePlace.name
              
    
              places.push(place);
            }
                storeUserData(places)
                props.navigation.navigate('MapData')
                // console.log(places,'place')
          })
          .catch(error => {
            console.log(error);
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
    container:{
        flex:1,
        justifyContent:'center'
    },
    button:{
        flex:1,
        
    }
})
export default Home;