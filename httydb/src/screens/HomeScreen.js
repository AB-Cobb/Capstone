import React from 'react';
import {View, Button, StyleSheet} from 'react-native';
import { Divider, Text } from 'react-native-elements';


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
        <Divider style={{ backgroundColor: 'blue' }} />
        <View style={styles.RecentHeaderStyle}>
          <Text h4>Recent Layouts</Text>
        </View>
        <Divider style={{ backgroundColor: 'blue' }} />
        <View style={styles.RecentHeaderStyle}>
          <Text h4>Recent Analytics</Text>
        </View>
        <Divider style={{ backgroundColor: 'blue' }} />
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
  },
  RecentHeaderStyle: {
    alignSelf: 'center',
  }
});

export default HomeScreen;
