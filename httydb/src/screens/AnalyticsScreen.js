import React from 'react';
import {
  ScrollView,
  Text,
  Button,
  StyleSheet,
  View,
  FlatList,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import Card from '../components/Card.js';
import {
  CardTitle,
  CardContent,
  CardAction,
  CardButton,
  CardImage,
} from 'react-native-cards';
import {db} from '../db/db';
import { Race } from '../models/race.ts';
import { Boat_Layout } from '../models/boat_layout.ts';
import { Map_Point } from '../models/map_point.ts';
import { LineChart } from 'react-native-chart-kit'
import { getUnavailabilityReason } from 'expo/build/AR';

class AnalyticsScreen extends React.Component {
  static navigationOptions = ({ navigation }) => {
    return {
      headerTitleAlign: "center",
    };
  };

  constructor(props) {
    super(props);
    this.state = {
      analytics: [
        new Race(
          Date.now(), this.getDate(), 2, 5, 1, new Boat_Layout(12, "Dummy Layout One", Date.now(), true, 1), 
          [new Map_Point(1584235300, 43.629, -79.459, 10, 1),
            new Map_Point(1584235400, 43.630, -79.459, 10, 2),
            new Map_Point(1584235500, 43.630, -79.460, 10, 1),
            new Map_Point(1584235600, 43.630, -79.461, 10, 2),
            new Map_Point(1584235700, 43.631, -79.461, 10, 1),
            new Map_Point(1584235800, 43.631, -79.461, 10, 3)])
      ]
    }
  }

  getDate(){
    let today = new Date()
    return `${today.getMonth() + 1}/${today.getDate()}/${today.getFullYear()}`
  }

  componentDidMount() {
    /*
    this._subscribe = this.props.navigation.addListener('didFocus', () => {
      this.getAnalytics()
    })
    this.setState({
      analytics: [],
      isLoading: false
    })
    */
  }

  getAnalytics() {
    /*
    let analytics = []
    db.getAllRaces().then(data => {
      analytics = data;
      console.log('Analytics Data: ', analytics)
      this.setState({
        analytics: analytics,
        isLoading: false
      })
    }).catch(error => {
      console.log(error);
        this.setState({
          isLoading: false,
        });
    })
    */
  }

  getLabels(id) {
    console.log(id)
    let labels = []
    this.state.analytics[id - 1].map_points.map(point => {labels.push(point.timestamp)})
    return labels
  }

  getData(id) {
    let data = []
    this.state.analytics[id - 1].map_points.map(point => {data.push(point.speed)})
    return data
  }

  render() {
    console.log('Rendered Analytics Screen!');
    const {analytics} = this.state

    return (
      <View>
        <FlatList data={analytics} renderItem={({item}) => (
          <TouchableOpacity onPress={() => {
            this.props.navigation.navigate('ViewAnalytics', {
              item
            })
          }}>
            <Card>
              <LineChart 
              data={{
                labels: this.getLabels(item.id),
                datasets: [{
                  data: this.getData(item.id)
                }],
              }}
              xAxisLabel="$"
              width={Dimensions.get('window').width * 0.3}
              height={Dimensions.get('window').height * 0.15}
              yAxisSuffix=' m/s'
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
              <CardContent text={item.name} width={Dimensions.get('window').width * 0.05}/>
            </Card>
          </TouchableOpacity>
        )} keyExtractor={item => item.id} numColumns={3} columnWrapperStyle={StyleSheet.ListStyle}/>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  ListStyle: {
    flex: 1,
    justifyContent: 'space-between',
  },
});

export default AnalyticsScreen;
