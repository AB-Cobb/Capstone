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
import {
  CardTitle,
  CardContent,
  CardAction,
  CardButton,
  CardImage,
} from 'react-native-cards';
import {db} from '../db/db';
import {SearchBar} from 'react-native-elements';
import {SearchableFlatList} from 'react-native-searchable-list';

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
      searchTerm: '',
      searchAttribute: 'name',
      ignoreCase: true,
    };
  }

  componentDidMount() {
    this._subscribe = this.props.navigation.addListener('didFocus', () => {
      this.listTeammembers();
    });
    this.setState({
      teamMembers: [],
      isLoading: false,
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
        <SearchBar
          placeholder={'Search Team Member...'}
          onChangeText={term => this.setState({searchTerm: term})}
          value={this.state.searchTerm}
        />
        <SearchableFlatList
          data={teamMembers.sort((a, b) => a.name.localeCompare(b.name))}
          searchTerm={this.state.searchTerm}
          searchAttribute={this.state.searchAttribute}
          ignoreCase={this.state.ignoreCase}
          renderItem={({item}) => (
            <TouchableOpacity
              onPress={() =>
                this.props.navigation.navigate('ViewTeammate', {item})
              }>
              <Card>
                <CardTitle title={item.name} />
                <CardContent text={item.gender} />
                <CardContent text={item.side_preference} />
                <CardContent text={item.active} />
              </Card>
            </TouchableOpacity>
          )}
          keyExtractor={item => item.id}
          numColumns={3}
          columnWrapperStyle={StyleSheet.ListStyle}
        />
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
