import React from 'react';
import {View, Text} from 'react-native';

class AnalyticsScreen extends React.Component {
  static navigationOptions = ({ navigation }) => {
    return {
      headerTitleAlign: "center",
    };
  };

  constructor(props) {
    super(props);
  }

  render() {
    console.log('Rendered Analytics Screen!');
    return (
      <View>
        <Text>Analytics Screen!</Text>
      </View>
    );
  }
}

export default AnalyticsScreen;
