import React from 'react';
import {View, Dimensions, StyleSheet} from 'react-native';
import ReadyRecording from '../components/ReadyRecording';
import MapView from 'react-native-maps';
import { PROVIDER_GOOGLE, Polyline } from 'react-native-maps';
import Geolocation from '@react-native-community/geolocation';
import { request, PERMISSIONS } from 'react-native-permissions';
import { getDistance } from 'geolib';
import { Race } from '../models/race';
import { Map_Point} from '../models/map_point';
import { db } from '../db/db';


class ReadyRecordingModal extends React.Component {
    static navigationOptions = ({ navigation }) => {
        return {
            headerTitleAlign: "center"
        };
    };

    constructor(props) {
        super(props)
        const {params} = this.props.navigation.state
        this.state = {
            selectedLayout: params.selectedLayout,
            layoutName: params.layoutName,
            isPaused: false,
            routeData: {
              routeName: "",
              time: 0,
              distance: 0,
              points: [],
              length: 0
            },
            markers: [],
            recentMarker: {
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

    componentDidMount(){
        this.requestLocationPermission()
    }

    componentWillUnmount(){
      console.log("Clearing Watch ID")
      Geolocation.clearWatch(this.watchID)
    }

    async requestLocationPermission() {
        if (Platform.OS == 'android'){
          let response = await request(PERMISSIONS.ANDROID.ACCESS_COARSE_LOCATION)
    
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
          /*
          let newPoint = {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
            speed: position.coords.speed,
            accuracy: position.coords.accuracy,
            timestamp: position.timestamp
          }//*/
          let newPoint = new Map_Point (position.timestamp, position.coords.longitude, position.coords.latitude, position.coords.accuracy, position.coords.speed)

          let newMarker = {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
          }

          let {mapRegion} = this.state
          mapRegion = {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421
          }

          let newDistance = this.calculateDistance(position.coords.latitude, position.coords.longitude)

          let newLength = this.state.routeData.length + 1

          if (!paused) {
            console.log("Storing New Point...")
            let pointArray = this.state.routeData.points
            let polyArray = this.state.markers.slice()
            pointArray.push(newPoint)
            polyArray.push(newMarker)
        
            this.setState({
              routeData: {
                points: pointArray,
                distance: newDistance,
                length: newLength,
                time: 0,
                routeName: ""
              },
              markers: polyArray,
              recentMarker: newMarker,
              isRegionSet: true,
              mapRegion: mapRegion
            })
          }
        }, (error) => {
          console.log("An error occured: " + error.message)
        },
        {enableHighAccuracy: true, timeout:20000, maximumAge:1000})
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

    getElapsedTime() {
      return this.refs.readyRecording.getElapsedTime()
    }

    getDate(){
      let today = new Date()
      return `${today.getMonth() + 1}/${today.getDate()}/${today.getFullYear()}`
    }

    saveData() {
      console.log("saveing race")
      let newRace = new Race(Date.now, this.getDate(), this.state.routeData.distance, this.getElapsedTime(), -1, this.props.selectedLayout, this.state.routeData.points)
      /*
      let newRouteObject = {
        routeName: Date.now(),
        time: this.getElapsedTime(),
        distance: this.state.routeData.distance,
        points: this.state.routeData.points.slice()
      }//*/
      this.setState({
        routeData: newRace
      }, () => {
        console.log(this.state.routeData)
        db.insertRace(newRace).then( id => console.log("Race inserted with id : " + id))
      })
     this.props.navigation.navigate('Ready');
    }

    calculateAverageSpeed() {
      let speedSum = 0
      let length = this.state.routeData.length
      if (length > 0) {
        for (let i = 0; i < length; i++){
          speedSum += this.state.routeData.points[i].speed
        }
        let averageSpeed = (speedSum / length)
        return averageSpeed
      }
      return 0
    }

    getCurrentSpeed() {
      if (this.state.routeData.length > 0){
        return this.state.routeData.points[this.state.routeData.length - 1].speed
      }
      return 0
    }

    calculateDistance(newLat, newLong) {
      let length = this.state.routeData.length
      if (length > 0){
        let prevLat = this.state.routeData.points[length -1].latitude
        let prevLong = this.state.routeData.points[length -1].longitude

        let oldDistance = this.state.routeData.distance
        let newDistance = oldDistance + Number((getDistance({latitude: prevLat, longitude: prevLong}, {latitude: newLat, longitude: newLong}) / 1000).toFixed(3))

        return newDistance
      }
      return 0
    }

    render() {
        console.log("Rendered ReadyRecordingModal!")
        console.log(`Application Paused: ${this.getPaused()}`)

        const {layoutName} = this.state
        const distance = this.state.routeData.distance

        return (
            <View>
                <MapView ref={map => this._mapRecord = map} provider={PROVIDER_GOOGLE} style={styles.MapStyle} showsUserLocation={true} followsUserLocation={true} initialRegion={this.state.mapRegion} region={this.state.mapRegion}>
                    <MapView.Marker coordinate={this.state.recentMarker} title="Current Location" />
                    <Polyline coordinates={this.state.markers} />
                </MapView>
                <ReadyRecording ref="readyRecording" currentLayout={this.state.selectedLayout.name} distance={distance} currentSpeed={this.getCurrentSpeed()} averageSpeed={this.calculateAverageSpeed()} setPause={() => this.setPause()} isPaused={() => this.getPaused()} sendTime={(time) => this.getTime(time)} saveData={() => this.saveData()}/>
            </View>
        )
    }
}

const styles = StyleSheet.create({
  MapStyle: {
    width: Dimensions.get('window').width * 1,
    height: Dimensions.get('window').height * 0.45
  }
})

export default ReadyRecordingModal;