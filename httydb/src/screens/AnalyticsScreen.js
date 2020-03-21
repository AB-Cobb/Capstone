import React from 'react';
import {
  ScrollView,
  Text,
  Button,
  StyleSheet,
  View,
  FlatList,
  TouchableOpacity,
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

class AnalyticsScreen extends React.Component {
  static navigationOptions = ({ navigation }) => {
    return {
      headerTitleAlign: "center",
    };
  };

  constructor(props) {
    super(props);
    this.state = {
      analytics: null
    }
  }

  componentDidMount() {
    this._subscribe = this.props.navigation.addListener('didFocus', () => {
      this.getAnalytics()
    })
    this.setState({
      analytics: [],
      isLoading: false
    })
  }

  getAnalytics() {
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
  }

  render() {
    console.log('Rendered Analytics Screen!');
    const {analytics} = this.state

    return (
      <View>
        <FlatList data={analytics} renderItem={({item}) => (
          <TouchableOpacity onPress={() => {
            this.props.navigation.navigation('ViewAnalytics', {
              item
            })
          }}>
            <Card>
              <CardTitle title={item.name}/>
            </Card>
          </TouchableOpacity>
        )} keyExtractor={item => item.id} numColumns={3} columnWrapperStyle={StyleSheet.ListStyle}/>
      </View>
    );
  }
}

export default AnalyticsScreen;
