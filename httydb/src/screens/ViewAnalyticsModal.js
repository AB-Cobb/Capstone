import React from 'react';
import {View, Text, ScrollView, Dimensions, StyleSheet, Button} from 'react-native';
import { Race } from '../models/race.ts'
import { Boat_Layout } from '../models/boat_layout.ts'
import { Map_Point } from '../models/map_point.ts';
import { LineChart } from 'react-native-chart-kit'
import MapView from 'react-native-maps';
import {PROVIDER_GOOGLE, Polyline} from 'react-native-maps';
import Timer from '../components/Timer.js'
import { TouchableOpacity } from 'react-native-gesture-handler';

class ViewAnalyticsModal extends React.Component {
    static navigationOptions = ({ navigation }) => {
        return {
            headerTitleAlign: "center",
            headerRight: () => (
                <Button onPress={() => {
                    console.log("Analytics to delete: " + navigation.getParam("race").id);
                    /*
                        Database call to delete race goes here
                    */
                   navigation.navigate('Analytics')
                }} title="Delete"/>
            )
        };
    };

    constructor(props){
        super(props);
        const {params} = this.props.navigation.state
        this.state = {
            race: params.race
        }
    }

    getLabels() {
        const labels = []
        const {map_points} = this.state.race
        const length = map_points.length
        const startTime = map_points[0].timestamp
        labels.push(0)
        for (let i = 1; i < length; i++) {
            let timePassed = Math.floor((map_points[i].timestamp - startTime) / 1000)
            labels.push(timePassed)
        }
        labels.push(this.state.race.duration)
        return labels
    }

    getData() {
        const data = []
        const {map_points} = this.state.race
        map_points.map(point => data.push(point.speed))
        return data
    }

    getRoute() {
        const points = []
        const {map_points} = this.state.race
        map_points.map(point => points.push({latitude: point.lat, longitude: point.long}))
        return points
    }

    getAverageSpeed() {
        const {duration, distance} = this.state.race
        const averageSpeed = (distance * 1000 / duration).toFixed(2)
        return averageSpeed
    }

    getTime(){
        const {duration} = this.state.race
        const seconds = (('0' + duration % 60).slice(-2))
        const minutes = (('0' + Math.floor(duration / 60)).slice(-2))
        return `${minutes}:${seconds}`
    }

    render() {
        console.log('Rendered ViewAnalyticsModal!');

        const initialPos = {
            latitude: this.state.race.map_points[0].lat,
            longitude: this.state.race.map_points[0].long,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421
        }

        const markers = this.getRoute()

        return (
            <View>
                <ScrollView horizontal={true}>
                    <LineChart
                        data={{
                            labels: this.getLabels(),
                            datasets: [{
                                data: this.getData()
                            }],
                        }}
                        xAxisLabel="s"
                        yAxisSuffix=" m/s"
                        yAxisLabel="Speed"
                        width={Dimensions.get('window').width * 1}
                        height={Dimensions.get('window').height * 0.30}
                        chartConfig={{
                            backgroundColor: "lightblue",
                            backgroundGradientFrom: "#fb8c00",
                            backgroundGradientTo: "#ffa726",
                            decimalPlaces: 2, // optional, defaults to 2dp
                            color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                            labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                            style: {
                              borderRadius: 16
                            },
                            propsForDots: {
                              r: "6",
                              strokeWidth: "2",
                              stroke: "#ffa726"
                            }
                          }}
                          bezier
                    />
                </ScrollView>
                <MapView provider={PROVIDER_GOOGLE} style={styles.MapStyle} initialRegion={initialPos}>
                    <Polyline coordinates={markers} />
                </MapView>
                <View style={styles.DataStyle}>
                    <Text style={styles.Text}>{this.state.race.name}</Text>
                    <Text style={styles.Text}>Layout Used: {this.state.race.layout.name}</Text>
                    <Text style={styles.Text}>Distance: {this.state.race.distance} Km</Text>
                    <Text style={styles.Text}>Duration: {this.getTime()}</Text>
                    <Text style={styles.Text}>Average Speed: {this.getAverageSpeed()} m/s</Text>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    MapStyle: {
        width: Dimensions.get('window').width * 1,
        height: Dimensions.get('window').height * 0.4
    },
    DataStyle: {
        width: Dimensions.get('window').width * 1,
        height: Dimensions.get('window').height * 0.3
    },
    Text: {
        fontSize: 14,
        textAlign: "center"
    }
})

export default ViewAnalyticsModal