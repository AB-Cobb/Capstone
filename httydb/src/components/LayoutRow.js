import React from 'react';
import {Dimensions, StyleSheet, View, Slider, Text} from "react-native";

const LayoutRow = (props) =>{
    return(
        <View style={styles.Row}>
            <View style={styles.Seat}>
            <Text>{props.teammateName}</Text></View>
            <Slider style={styles.Slider}/>
            <View style={styles.Seat}/>
        </View>
    );
};

const styles = StyleSheet.create({
    Row: {
        alignContent: 'center',
        flexDirection: "row",
        justifyContent: 'center',

    },
    RecentHeaderStyle: {
        alignSelf: 'center',
    },
    Slider: {
        width: Dimensions.get('window').width * 0.5,
    },
    Seat: {
        borderColor: "black",
        borderWidth: 1,
        borderRadius: 200,
        width: Dimensions.get('window').width * 0.1,
        height: Dimensions.get('window').height * 0.05,
    }
});

export default LayoutRow;