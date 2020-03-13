import React from 'react';
import {View} from 'react-native';
import ReadyRecording from '../components/ReadyRecording';
import MapView from 'react-native-maps';
import { PROVIDER_GOOGLE } from 'react-native-maps';
import Geolocation from '@react-native-community/geolocation';
import { request, PERMISSIONS } from 'react-native-permissions';

let watchID
class ReadyRecordingModal extends React.Component {
    static navigationOptions = ({ navigation }) => {
        return {
            headerTitleAlign: "center"
        };
    };

    constructor(props) {
        super(props)
        this.state = {
            selectedLayout: props.selectedLayout,
            onPause: false,
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
            }
        }
    }

    componentDidMount(){
        this.requestLocationPermission()
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
        let paused = this.state.onPause
        console.log(paused)
        if (!paused) {
            this.watchID = Geolocation.watchPosition((position) => {
                console.log(position)
              
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
                  }
                })
              }, (error) => {
                console.log("An error occured: " + error.message)
              },
              {enableHighAccuracy: false, timeout:20000, maximumAge:1000})
        }
    }

    render() {
        console.log("Rendered ReadyRecordingModal!")

        let initialPos = {
            latitude: 37.421,
            longitude: -122.084,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421
          }

        return (
            <View>
                <MapView ref={map => this._mapRecord = map} provider={PROVIDER_GOOGLE} style={{width: 410, height:300}} showsUserLocation={true} followsUserLocation={true} initialRegion={initialPos}>
                    <MapView.Marker coordinate={this.state.marker} title="Current Location" />
                </MapView>
                <ReadyRecording currentLayout={this.state.selectedLayout} />
            </View>
        )
    }
}

export default ReadyRecordingModal;