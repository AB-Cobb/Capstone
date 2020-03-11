import React from 'react';
import {View, Image, } from 'react-native';
import ReadyOptions from '../components/ReadyOptions';
import Map from '../components/Map'
import MapView from 'react-native-maps';
import { PROVIDER_GOOGLE } from 'react-native-maps';
import Geolocation from '@react-native-community/geolocation';

class ReadyScreen extends React.Component {
  static navigationOptions = ({ navigation }) => {
    return {
      headerTitleAlign: "center",
    };
  };

  constructor(props) {
    super(props);
    this.state = {
      layouts: ["-- Select A Layout --", "Layout One", "Layout Two", "Layout Three"],
      selectedLayout: 0,
      isRecording: false,
      locationData: {
          latitude: 0,
          longitude: 0,
          speed: null,
          accuracy: null,
          timestamp: null
      }
    }
  }

  async componentDidMount() {
    Geolocation.getCurrentPosition((position) => {
      console.log(position)
      this.setState({
        locationData: {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
            speed: position.coords.speed,
            accuracy: position.coords.accuracy,
            timestamp: position.timestamp
        }
      })
    }, (error) => {
      console.log("An error occured: " + error.message)
    },
    {enableHighAccuracy: false, timeout:20000, maximumAge:1000})
  }

  handleClick() {
    if (this.state.selectedLayout != 0){
      this.props.navigation.navigate('ReadyRecording', {
        selectedLayout: this.state.layouts[this.state.selectedLayout]
      });
    }
  }

  changeLayout(layoutIndex) {
    this.setState({selectedLayout: layoutIndex});
  }

  render() {
    console.log('Rendered ReadyScreen!');
    console.log(this.state.locationData)
    const marker = {latitude: this.state.locationData.latitude, longitude: this.state.locationData.longitude}

    return (
      <View>
        <MapView provider={PROVIDER_GOOGLE} style={{width: 410, height:300}} showsUserLocation>
          <MapView.Marker coordinate={marker} title="Current Location" />
        </MapView>
        <ReadyOptions layouts={this.state.layouts} selectedLayout={this.state.selectedLayout} onClick={() => this.handleClick()} onChange={i => this.changeLayout(i)}/>
      </View>
    );
  }
}

export default ReadyScreen;


