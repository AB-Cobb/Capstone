import React from 'react';
import {
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

const MAX_POINTS = 6
class AnalyticsScreen extends React.Component {
  static navigationOptions = ({ navigation }) => {
    return {
      headerTitleAlign: "center",
    };
  };

  constructor(props) {
    super(props);
    this.state = {
      analytics: []
    }
  }

  getDate(){
    let today = new Date()
    return `${today.getMonth() + 1}/${today.getDate()}/${today.getFullYear()}`
  }

  componentDidMount() {
    this._subscribe = this.props.navigation.addListener('didFocus', () => {
      this.getAnalytics()
    })
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

    this.setState({
      analytics: [
        new Race(
          Date.now(), this.getDate(), 2, 6, 1, new Boat_Layout(12, "Dummy Layout One", Date.now(), true, 1), 
          [new Map_Point(15842353000, -79.408, 43.671, 10, 1),
            new Map_Point(15842354000, -79.408, 43.675, 10, 2),
            new Map_Point(15842355000, -79.413, 43.675, 10, 1),
            new Map_Point(15842356000, -79.418, 43.675, 10, 2),
            new Map_Point(15842357000, -79.423, 43.675, 10, 1),
            new Map_Point(15842358000, -79.423, 43.679, 10, 3)]),
        new Race(
          Date.now(), this.getDate(), 1.5, 8, 2, new Boat_Layout(16, "Dummy Layout Two", Date.now(), true, 2), 
          [new Map_Point(15842353000, -79.408, 43.671, 10, 2),
            new Map_Point(15842354000, -79.408, 43.675, 10, 4),
            new Map_Point(15842355000, -79.413, 43.675, 10, 1),
            new Map_Point(15842356000, -79.418, 43.675, 10, 2),
            new Map_Point(15842357000, -79.423, 43.675, 10, 4),
            new Map_Point(15842358000, -79.423, 43.679, 10, 3),
            new Map_Point(15842359000, -79.423, 43.683, 10, 1),
            new Map_Point(15842360000, -79.427, 43.683, 10, 1)]),
        new Race(
          Date.now(), this.getDate(), 2.1, 10, 3, new Boat_Layout(20, "Dummy Layout Three", Date.now(), true, 3), 
          [new Map_Point(15842353000, -79.408, 43.671, 10, 0.5),
            new Map_Point(15842354000, -79.408, 43.675, 10, 2),
            new Map_Point(15842355000, -79.413, 43.675, 10, 4),
            new Map_Point(15842356000, -79.418, 43.675, 10, 3),
            new Map_Point(15842357000, -79.423, 43.675, 10, 1.5),
            new Map_Point(15842358000, -79.423, 43.679, 10, 3),
            new Map_Point(15842359000, -79.423, 43.683, 10, 4),
            new Map_Point(15842360000, -79.427, 43.683, 10, 1),
            new Map_Point(15842361000, -79.431, 43.683, 10, 2),
            new Map_Point(15842362000, -79.431, 43.679, 10, 5)]),
        new Race(
          Date.now(), this.getDate(), 1.65, 8, 4, new Boat_Layout(14, "Dummy Layout Four", Date.now(), true, 4), 
          [new Map_Point(15842353000, -79.408, 43.671, 10, 1),
            new Map_Point(15842354000, -79.408, 43.675, 10, 4),
            new Map_Point(15842355000, -79.413, 43.675, 10, 3),
            new Map_Point(15842356000, -79.418, 43.675, 10, 3),
            new Map_Point(15842357000, -79.423, 43.675, 10, 3.2),
            new Map_Point(15842358000, -79.423, 43.679, 10, 2),
            new Map_Point(15842359000, -79.423, 43.683, 10, 1.4),
            new Map_Point(15842360000, -79.427, 43.683, 10, 1)])
      ]
    })
  }

  getLabels(id) {
    let labels = []
    for (let i = 0; i < MAX_POINTS; i++) {
      labels.push(this.state.analytics[id - 1].map_points[i].timestamp)
    }
    return labels
  }

  getData(id) {
    let data = []
    for (let i = 0; i < MAX_POINTS; i++) {
      data.push(this.state.analytics[id - 1].map_points[i].speed)
    }
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
              race: item
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
