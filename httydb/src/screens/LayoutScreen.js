import React from 'react';
import {View, Text} from 'react-native';

class LayoutScreen extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    console.log('Rendered LayoutScreen!');
    return (
      <View>
        <Text>Layout Screen!</Text>
      </View>
    );
  }
}

export default LayoutScreen;
