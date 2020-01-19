import React from 'react';
import {View, Text} from 'react-native';

class TeamScreen extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    console.log('Rendered TeamScreen!');
    return (
      <View>
        <Text>Team Screen!</Text>
      </View>
    );
  }
}

export default TeamScreen;
