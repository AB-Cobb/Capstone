import React from 'react';
import {ScrollView, Text, Button, StyleSheet, View, FlatList, TouchableOpacity} from 'react-native';
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

    return (
        <View>
          <View>
            <FlatList
                data={teammates}
                renderItem={({item}) => <TouchableOpacity onPress={() => this.props.navigation.navigate("ViewTeammate")}><Card><Text>{item}</Text></Card></TouchableOpacity>}
                keyExtractor={item => item.length}
                numColumns={3}
                columnWrapperStyle={styles.ListStyle}
            />
          </View>
        </View>
    );
  }
}

const styles = StyleSheet.create({
  ListStyle: {
    flex: 1,
    justifyContent: 'space-between',
  }
});

export default TeamScreen;
