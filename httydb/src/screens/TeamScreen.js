import React from 'react';
import {View, Text, Button} from 'react-native';

class TeamScreen extends React.Component {
  static navigationOptions = ({ navigation }) => {
    return {
      headerTitleAlign: "center",
      headerRight: () => <Button
          onPress={() => {
            navigation.navigate('AddTeammate');
          }}
          title="+"
      />,
    };
  };

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
