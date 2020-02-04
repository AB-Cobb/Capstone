import React from 'react';
import {ScrollView, Text, Button, StyleSheet, View} from 'react-native';
import Card from '../components/Card.js';

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
    this.state = {
      teammates: null,
      list: null,

    }
  }

  componentDidMount() {

    this.setState({
      teammates: ["Arsalan", "Andrew", "Guiseppe", "Nga","Zapdos","Jolteon","Pikachu","Luxray","Dedenne","Charizard"],
    });
  }

  render() {
    console.log('Rendered TeamScreen!');
    const {teammates} = this.state;
    let list = null;

    if(teammates){
      list = this.state.teammates.map((item, i) =>{
        return (<Card key={i}><Text>{item}</Text></Card>);
      });
    }

    return (
      <ScrollView>
        <View style={styles.ViewStyle}>
          {list}
        </View>
      </ScrollView>
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

export default TeamScreen;
