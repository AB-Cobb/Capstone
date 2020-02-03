import React from 'react';
import {View, Text, Button, Alert, StyleSheet, ScrollView} from 'react-native';

class HomeScreen extends React.Component {
  static navigationOptions = ({ navigation }) => {
    return {
      headerTitleAlign: "center",
    };
  };

  constructor(props) {
    super(props);
  }

  render() {
    console.log('Rendered HomeScreen!');
    return (
      <View>
        <Text>Home Screen!</Text>
        <View>
          <Text>Recent Layouts</Text>
        </View>
        <View>
          <Text>Recent Analytics</Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  ViewStyle: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  }
});

export default HomeScreen;
