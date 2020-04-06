import React from 'react';
import {Dimensions, StyleSheet, View, Text, TouchableOpacity} from 'react-native';
import Slider from '@react-native-community/slider';

const LayoutRow = (props) => {
  return (
    <View style={styles.Row}>
      <TouchableOpacity onPress={props.openSheet}>
        <View style={styles.Seat}>
          <Text>{props.leftSide}</Text>
        </View>
      </TouchableOpacity>
      <Slider
        style={styles.Slider}
        minimumValue={0}
        maximumValue={1}
        minimumTrackTintColor="#FFFFFF"
        maximumTrackTintColor="#000000"
      />
      <TouchableOpacity onPress={props.openSheet}>
        <View style={styles.Seat}>
          <Text>{props.rightSide}</Text>
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
