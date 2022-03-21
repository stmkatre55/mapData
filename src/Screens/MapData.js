import React, { useState, useEffect } from "react";
import {
    View,
    Text,
    StyleSheet,
    Button,
    FlatList,
} from 'react-native';

import AsyncStorage from "@react-native-async-storage/async-storage";

const Item = ({ title }) => (
    <View style={styles.item}>
        <Text style={styles.title}>{title}</Text>
    </View>
);

const MapData = () => {
    const [table, setTable] = useState([]);

    useEffect(() => {
        //Runs only on the first render
        getData();
    }, []);
    const renderItem = ({ item }) => (
        <Item title={item.placeName} />
    );



    const getData = async () => {

        try {

            const value = await AsyncStorage.getItem('globalData');
            if (value !== null) {
                // We have data!!
                let parsed = JSON.parse(value);
                setTable(parsed)
                console.log(table)
            }
        } catch (error) {
            // Error retrieving data
            console.log('value')
        }

    }
    return (
        <View style={styles.MainContainer}>
            <FlatList
                data={table}
                renderItem={renderItem}
                keyExtractor={item => item.placeId}

            ></FlatList>
        </View>
    )
}
const styles = StyleSheet.create({
    MainContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'flex-end',
    },
    item: {
        backgroundColor: '#f9c2ff',
        padding: 20,
        marginVertical: 8,
        marginHorizontal: 16,
    },
    title: {
        fontSize: 20,
    },
});
export default MapData;