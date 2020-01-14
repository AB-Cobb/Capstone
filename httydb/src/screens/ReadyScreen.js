import React from 'react';
import {View, Text} from 'react-native';

class ReadyScreen extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    console.log('Rendered ReadyScreen!');
    return (
      <View>
        <Text>Ready Screen!</Text>
      </View>
    );
  }
}

export default ReadyScreen;
