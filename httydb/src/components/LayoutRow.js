import React from 'react';
import {Dimensions, StyleSheet, View, Text, TouchableOpacity} from 'react-native';
import Slider from '@react-native-community/slider';

const LayoutRow = (props) => {

  let left = "Click";
  let right = "Click";
  let weight = 0;

  const rowNum = props.rowNum;
  if (props.leftSide){
    left = props.leftSide;
  }

  if (props.rightSide){
    right = props.rightSide;
  }

  if (props.leftSide && props.rightSide){
    weight = (left.weight - right.weight)/100;
  }

  console.log(`Left Seat: ${left.name || "Click"}`);
  console.log(`right Seat: ${right.name || "Click"}`);

  return (
    <View style={styles.Row}>
      <TouchableOpacity onPress={props.leftSeatPress}>
        <View style={styles.Seat}>
          <Text>{left.name || "Click"}</Text>
        </View>
      </TouchableOpacity>
      <Slider
        style={styles.Slider}
        minimumValue={-1}
        maximumValue={1}
        minimumTrackTintColor="#FFFFFF"
        maximumTrackTintColor="#000000"
      />
      <TouchableOpacity onPress={props.rightSeatPress}>
        <View style={styles.Seat}>
          <Text>{right.name || "Click"}</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  Row: {
    alignContent: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  RecentHeaderStyle: {
    alignSelf: 'center',
  },
  Slider: {
    width: Dimensions.get('window').width * 0.5,
  },
  Seat: {
    borderColor: 'black',
    borderWidth: 1,
    borderRadius: 200,
    width: Dimensions.get('window').width * 0.1,
    height: Dimensions.get('window').height * 0.05,
  },
});

export default LayoutRow;
