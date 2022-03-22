import React, { useState, useEffect } from "react";
import {
    View,
    Text,
    StyleSheet,
    Button,
    FlatList,
} from 'react-native';


const Item = ({ title }) => (
    <View style={styles.item}>
        <Text style={styles.title}>{title}</Text>
    </View>
);

const MapData = (props) => {
    const [table, setTable] = useState([]);

    useEffect(() => {
        getData();
    }, []);
    const renderItem = ({ item }) => (
        <Item title={item.LocationName} />
    );



    const getData = async () => {
       // console.log(props,'kkkkk')
        const {tableData} = props.route.params

        setTable(tableData)

    }
console.log(table,'sdjf ljlkfdjlksjdlk')

    return (
        <View style={styles.MainContainer}>
            <FlatList
                data={table}
                renderItem={renderItem}
               

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