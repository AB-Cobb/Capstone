import React from 'react';
import {View, Button, StyleSheet, ScrollView, TouchableOpacity, Dimensions} from 'react-native';
import { Divider, Text } from 'react-native-elements';
import Card from "../components/Card.js";
import {
  CardTitle,
  CardContent,
  CardAction,
  CardButton,
  CardImage,
} from 'react-native-cards';
import { LineChart } from 'react-native-chart-kit';
import { Race } from '../models/race.ts'
import { Boat_Layout } from '../models/boat_layout.ts'
import { Map_Point } from '../models/map_point.ts';

const MAX_POINTS = 6
class HomeScreen extends React.Component {
  static navigationOptions = ({ navigation }) => {
    return {
      headerTitleAlign: "center",
    };
  };

  constructor(props) {
    super(props);
    this.state = {
        layouts: ['A Team', 'B Team', 'Mixed Team'],
        analytics: []
    };
  }

  getDate(){
    let today = new Date()
    return `${today.getMonth() + 1}/${today.getDate()}/${today.getFullYear()}`
  }

  getLabels(item) {
    let labels = []
    for (let i = 0; i < MAX_POINTS; i++) {
      labels.push(item.map_points[i].timestamp)
    }
    return labels
  }

  getData(item) {
    let data = []
    for (let i = 0; i < MAX_POINTS; i++) {
      data.push(item.map_points[i].speed)
    }
    return data
  }

  getAnalytics() {
    /*
      Database code goes here
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

  componentDidMount(){
    this._subscribe = this.props.navigation.addListener('didFocus', () => {
      this.getAnalytics()
    })
  }

  render() {
      let {layouts, analytics} = this.state;
      let layoutList = null;
      let analyticsList = null;

      if (layouts){
          layoutList = layouts.map((item, i) =>{
              return(<Card key={i}><Text>{item}</Text></Card>)
          });
      }

      if (analytics){
          let cutAnalytics = analytics.slice(-3)
          analyticsList = cutAnalytics.map((item, id) =>{
              return(<TouchableOpacity onPress={() => {
                this.props.navigation.navigate('ViewAnalytics', {
                  race: item
                })
              }}>
                <Card>
                  <LineChart 
                  data={{
                    labels: this.getLabels(item),
                    datasets: [{
                      data: this.getData(item)
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
              </TouchableOpacity>)
          });
      }

    console.log('Rendered HomeScreen!');
    return (
      <View>
        <Text h2 style={styles.RecentHeaderStyle}>How to Train your Dragon Boat</Text>
        <View style={styles.BottomHalf}>
            <Divider style={{ backgroundColor: 'blue' }} />
            <Text h4 style={styles.RecentHeaderStyle}>Recent Layouts</Text>
            <ScrollView style={styles.ViewStyle} horizontal={true}>
                {layoutList}
            </ScrollView>
            <Divider style={{ backgroundColor: 'blue' }} />
            <Text h4 style={styles.RecentHeaderStyle}>Recent Analytics</Text>
            <ScrollView style={styles.ViewStyle} horizontal={true}>
                {analyticsList}
            </ScrollView>
            <Divider style={{ backgroundColor: 'blue' }} />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  ViewStyle: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingBottom: 10,
  },
  RecentHeaderStyle: {
    alignSelf: 'center',
  },
  BottomHalf: {
      justifyContent: 'flex-end'
  }
});

export default HomeScreen;
