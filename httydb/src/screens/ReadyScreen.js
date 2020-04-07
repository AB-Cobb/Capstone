import React from 'react';
import {View, Dimensions, StyleSheet} from 'react-native';
import ReadyOptions from '../components/ReadyOptions';
import MapView from 'react-native-maps';
import { PROVIDER_GOOGLE } from 'react-native-maps';
import Geolocation from '@react-native-community/geolocation';
import { request, PERMISSIONS } from 'react-native-permissions';
import { Boat_Layout } from '../models/boat_layout';

class ReadyScreen extends React.Component {
  static navigationOptions = ({ navigation }) => {
    return {
      headerTitleAlign: "center",
    };
  };

  constructor(props) {
    super(props);
    this.state = {
      layouts: [{name: "-- Select A Layout --", id: 0}, 
      new Boat_Layout(12, "Dummy Layout One", Date.now(), true, 1), 
      new Boat_Layout(16, "Dummy Layout Two", Date.now(), true, 2), 
      new Boat_Layout(20, "Dummy Layout Three", Date.now(), true, 3)],
      selectedLayout: 0,
      locationData: {
          latitude: 0,
          longitude: 0,
          speed: null,
          accuracy: null,
          timestamp: null
      },
      marker: {
        latitude: 0,
        longitude: 0
      },
      mapRegion: {
        latitude: 37.421,
        longitude: -122.084,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421
      }
    }
  }

  componentDidMount() {
    this.requestLocationPermission()
  }

  handleClick() {
    if (this.state.selectedLayout != 0){
      console.log("Clearing Watch ID")
      Geolocation.clearWatch(this.watchID)
      this.props.navigation.navigate('ReadyRecording', {
        selectedLayout: this.state.layouts[this.state.selectedLayout]
      });
    }
  }

  async requestLocationPermission() {
    if (Platform.OS == 'android'){
      let response = await request(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION)

      if (response === 'granted'){
        console.log("Permission Granted")
        this.accessLocation()
      }
    }
  }

  accessLocation() {
      this.watchID = Geolocation.watchPosition((position) => {
        console.log(position)

        let mapRegion = {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421
        }

        this.setState({
          locationData: {
              latitude: position.coords.latitude,
              longitude: position.coords.longitude,
              speed: position.coords.speed,
              accuracy: position.coords.accuracy,
              timestamp: position.timestamp
          },
          marker: {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
          },
          mapRegion: mapRegion
        })
      }, (error) => {
        console.log("An error occured: " + error.message)
      },
      {enableHighAccuracy: false, timeout:20000, maximumAge:1000})
  }

  changeLayout(layoutIndex) {
    this.setState({selectedLayout: layoutIndex});
  }

  render() {
    console.log('Rendered ReadyScreen!');

    return (
      <View>
        <MapView ref={map => this._map = map} provider={PROVIDER_GOOGLE} style={styles.MapStyle} showsUserLocation={true} followsUserLocation={true} initialRegion={this.state.mapRegion} region={this.state.mapRegion}>
          <MapView.Marker coordinate={this.state.marker} title="Current Location" />
        </MapView>
        <ReadyOptions layouts={this.state.layouts} selectedLayout={this.state.selectedLayout}  onClick={() => this.handleClick()} onChange={i => this.changeLayout(i)}/>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  MapStyle: {
    width: Dimensions.get('window').width * 1,
    height: Dimensions.get('window').height * 0.45
  }
})

export default ReadyScreen;


