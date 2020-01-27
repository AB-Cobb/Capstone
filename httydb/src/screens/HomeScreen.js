import React from 'react';
import {View, Text, Button, Alert} from 'react-native';

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
      </View>
    );
  }
}

export default HomeScreen;
