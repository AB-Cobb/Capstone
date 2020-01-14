import React from 'react';
import {View, Text} from 'react-native';

class HomeScreen extends React.Component {
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
