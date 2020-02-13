import React from 'react';
import {View, Button, StyleSheet, ScrollView} from 'react-native';
import { Divider, Text } from 'react-native-elements';
import Card from "../components/Card";


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
        analytics: ['May 6th - A Team', 'May 11th - B Team', 'May 18th - Mixed Team']
    };
  }

  render() {
      const {layouts, analytics} = this.state;
      let layoutList = null;
      let analyticsList = null;

      if (layouts){
          layoutList = layouts.map((item, i) =>{
              return(<Card key={i}><Text>{item}</Text></Card>)
          });
      }

      if (analytics){
          analyticsList = layouts.map((item, i) =>{
              return(<Card key={i}><Text>{item}</Text></Card>)
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
