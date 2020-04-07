import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet, Dimensions} from 'react-native';
import Timer from './Timer';

class ReadyRecording extends React.Component {
    constructor(props) {
      super(props)
      this.state = {
        currentLayout: props.currentLayout
      }
    }

    getElapsedTime(){
       return this.refs.timerRef.getElapsedTime()
    }

    saveData(){
      this.props.saveData()
    }

    render() {
      return (
        <View style={{flexDirection: "row", justifyContent: "space-between"}}>
          <View style={{alignItems: "flex-start", width: Dimensions.get('window').width * 0.5}}>
            <Text style={styles.TextSpacing}>{this.state.currentLayout}</Text>
            <Text style={styles.TextSpacing}>Distance: {this.props.distance} km</Text>
            <Text style={styles.TextSpacing}>Current Velocity: {this.props.currentSpeed} m/s</Text>
            <Text style={styles.TextSpacing}>Average Velocity: {this.props.averageSpeed} m/s</Text>
          </View>
  
          <View style={{alignItems: "flex-end", width: Dimensions.get('window').width * 0.5}}>
            <Timer ref="timerRef" isPaused={() => this.props.isPaused()} elapsedTime={0} sendTime={(time) => this.sendTime(time)}></Timer>
            <TouchableOpacity>
              <Text style={styles.ButtonStyleOne} onPress={() => this.props.setPause()}>
                Pause
              </Text>
            </TouchableOpacity>
            <TouchableOpacity>
              <Text style={styles.ButtonStyleTwo} onPress={() => this.props.saveData()}>
                Stop and Save
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      );
    }
  }

const styles = StyleSheet.create({
  ButtonStyleTwo: {
    backgroundColor: "lightgrey",
    margin: 15,
    height: 75,
    width: 125,
    textAlign: "center",
    textAlignVertical: "center", 
    fontSize: 24,
    color: "white",
    borderWidth: 1,
    borderColor: "grey",
    borderRadius: 2,
  },

  ButtonStyleOne: {
    backgroundColor: "lightgrey",
    margin: 15,
    height: 75,
    width: 125,
    textAlign: "center",
    textAlignVertical: "center", 
    fontSize: 24,
    color: "white",
    borderWidth: 1,
    borderColor: "grey",
    borderRadius: 2,
  },

  TextSpacing: {
    margin: 15,
    fontSize: 16
  }
});

export default ReadyRecording