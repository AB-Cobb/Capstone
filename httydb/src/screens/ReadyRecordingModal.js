import React from 'react';
import {View} from 'react-native';
import ReadyRecording from '../components/ReadyRecording';
import MapView from 'react-native-maps';
import { PROVIDER_GOOGLE, Polyline } from 'react-native-maps';
import Geolocation from '@react-native-community/geolocation';
import { request, PERMISSIONS } from 'react-native-permissions';
import { getDistance } from 'geolib';

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
            isPaused: false,
            routeData: {
              routeName: Date.now(),
              time: 0,
              distance: 0,
              points: []
            },
            markers: [],
            recentMarker: {
              latitude: 0,
              longitude: 0
            }
        }
    }

    componentDidMount(){
        this.requestLocationPermission()
    }

    componentWillUnmount(){
      console.log("Clearing Watch ID")
      Geolocation.clearWatch(this.watchID)
      console.log(this.state.routeData)
    }

    async requestLocationPermission() {
        if (Platform.OS == 'android'){
          let response = await request(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION)
    
          if (response === 'granted'){
            console.log("Permission Granted")
            await this.accessLocation()
          }
        }
      }

      //Map currently on False for High Accuracy Mode, as it does not work during debugging

    async accessLocation() {
        this.watchID = Geolocation.watchPosition((position) => {
          let paused = this.state.isPaused
          console.log(`Retrieved New Point: ${JSON.stringify(position)}`)
          let newPoint = {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
            speed: position.coords.speed,
            accuracy: position.coords.accuracy,
            timestamp: position.timestamp
          }

          let newMarker = {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
          }

          let newDistance = this.calculateDistance(position.coords.latitude, position.coords.longitude)
          console.log(`New Distance ${newDistance}`)

          if (!paused) {
            console.log("Storing New Point...")
            let pointArray = this.state.routeData.points
            let polyArray = this.state.markers.slice()
            pointArray.push(newPoint)
            polyArray.push(newMarker)
        
            this.setState({
              routeData: {
                points: pointArray,
                distance: newDistance
              },
              markers: polyArray,
              recentMarker: newMarker
            })
          }
        }, (error) => {
          console.log("An error occured: " + error.message)
        },
        {enableHighAccuracy: false, timeout:20000, maximumAge:1000})
    }

    setPause() {
      let pause = this.state.isPaused
      this.setState({
        isPaused: !pause
      })
    }

    getPaused() {
      return this.state.isPaused
    }

    calculateDistance(newLat, newLong) {
      let length = this.state.routeData.points.length
      if (length > 0){
        let prevLat = this.state.routeData.points[length -1].latitude
        console.log(`PrevLat ${prevLat}`)
        let prevLong = this.state.routeData.points[length -1].longitude

        let oldDistance = this.state.routeData.distance
        console.log(`Original Distance: ${oldDistance}`)
        let newDistance = oldDistance + getDistance({latitude: prevLat, longitude: prevLong}, {latitude: newLat, longitude: newLong})
        console.log(`NewDistance value: ${newDistance}`)

        return newDistance
      }
      return 0
    }

    render() {
        console.log("Rendered ReadyRecordingModal!")
        console.log(`Application Paused: ${this.getPaused()}`)

        let initialPos = {
            latitude: 37.421,
            longitude: -122.084,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421
          }
        return (
            <View>
                <MapView ref={map => this._mapRecord = map} provider={PROVIDER_GOOGLE} style={{width: 410, height:300}} showsUserLocation={true} followsUserLocation={true} initialRegion={initialPos}>
                    <MapView.Marker coordinate={this.state.recentMarker} title="Current Location" />
                    <Polyline coordinates={this.state.markers} />
                </MapView>
                <ReadyRecording currentLayout={this.state.selectedLayout} setPause={() => this.setPause()} isPaused={() => this.getPaused()} currVelocity={this.state.routeData.points.speed} distance={this.state.routeData.distance}/>
            </View>
        )
    }
}

export default ReadyRecordingModal;