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
        ready: false,
        posObject: {
          latitude: null,
          longitude: null,
          speed: null,
          accuracy: null,
          timestamp: null
        },
        error: null
      },
      markerData: {
        latitude: 0,
        longitude: 0,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421
      }
    }
  }

  componentDidMount() {
    this.setState({locationData: {ready: false, error: null}})
    Geolocation.getCurrentPosition((position) => {
      console.log(position)
      this.setState({
        locationData: {
          ready: true,
          posObject: {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
            speed: position.coords.speed,
            accuracy: position.coords.accuracy,
            timestamp: position.timestamp
          },
          markerData: {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          }
        }
      })
    }, (error) => {
      console.log("An error occured: " + error.message)
      this.setState({locationData: {error: error.message}})
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
    return (
      <View>
        <MapView provider={PROVIDER_GOOGLE} style={{width: 410, height:300}} showsUserLocation>
          <MapView.Marker coordinate={this.state.markerData} title="Current Location" />
        </MapView>
        <ReadyOptions layouts={this.state.layouts} selectedLayout={this.state.selectedLayout} onClick={() => this.handleClick()} onChange={i => this.changeLayout(i)}/>
      </View>
    );
  }
}

export default ReadyScreen;


