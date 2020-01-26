import React from 'react';
import {View, Text, Button, Alert} from 'react-native';

class LayoutScreen extends React.Component {
  static navigationOptions = ({ navigation }) => {
    return {
      headerTitleAlign: "center",
      headerRight: () => <Button
              onPress={() => {
                navigation.navigate('AddLayout');
              }}
              title="+"
          />,
    };
  };

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
