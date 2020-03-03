import React from 'react';
import {
  ScrollView,
  Text,
  Button,
  StyleSheet,
  View,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import Card from '../components/Card.js';
import {db} from '../db/db';

class TeamScreen extends React.Component {
  static navigationOptions = ({navigation}) => {
    return {
      headerTitleAlign: 'center',
      headerRight: () => (
        <Button
          onPress={() => {
            navigation.navigate('AddTeammate');
          }}
          title="+"
        />
      ),
    };
  };

  constructor(props) {
    super(props);
    this.state = {
      teamMembers: [],
      isLoading: false,
    };
  }

  componentDidMount() {
    // this.setState({
    //   teammates: ["Arsalan", "Andrew", "Guiseppe", "Nga","Zapdos","Jolteon","Pikachu","Luxray","Dedenne","Charizard"],
    // });

    this._subscribe = this.props.navigation.addListener('didFocus', () => {
      this.listTeammembers();
    });
  }

  listTeammembers() {
    let teamMembers = [];
    db.getAllTeammembers()
      .then(data => {
        teamMembers = data;
        console.log('Teamscreen: teammembers: ', teamMembers);
        this.setState({
          teamMembers: teamMembers,
          isLoading: false,
        });
      })
      .catch(err => {
        console.log(err);
        this.setState({
          isLoading: false,
        });
      });
  }

  render() {
    console.log('Rendered TeamScreen! testing');
    const {teamMembers} = this.state;
    console.log(teamMembers);

    return (
      <View>
        <View>
          <FlatList
            data={teamMembers}
            renderItem={({item}) => (
              <TouchableOpacity
                onPress={() => this.props.navigation.navigate('ViewTeammate')}>
                <Card>
                  <Text>{item.name}</Text>
                  <Text>{item.phone}</Text>
                  <Text>{item.side_preference}</Text>
                </Card>
              </TouchableOpacity>
            )}
            keyExtractor={item => item.id}
            numColumns={3}
            columnWrapperStyle={StyleSheet.ListStyle}
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
  },
});

export default TeamScreen;
