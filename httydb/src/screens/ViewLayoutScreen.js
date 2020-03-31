import React from 'react';
import {
  View,
  Button,
  StyleSheet,
  Text,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import LayoutRow from '../components/LayoutRow';
import RBSheet from 'react-native-raw-bottom-sheet';
import {SearchBar, ListItem} from 'react-native-elements';
import {SearchableFlatList} from 'react-native-searchable-list';
import {db} from '../db/db';

class ViewLayoutScreen extends React.Component {
  static navigationOptions = ({navigation}) => {
    return {
      headerTitleAlign: 'center',
    };
  };

  constructor(props) {
    super(props);
    this.state = {
      searchTerm: '',
      searchResults: [],
      teamMembers: [],
      searchAttribute: 'name',
      addMate: '',
      ignoreCase: true,
    };
  }

  CreateRows = (numRows) => {
    const rows = [];
    for (let i = 0; i < numRows; i++) {
      rows.push(<LayoutRow key={i} />);
    }
    return rows;
  };

  componentDidMount() {
    this.listTeammembers();
    this.setState({
      teamMembers: [],
    });
  }

  addTeammamte(mate) {
    this.setState({
      addMate: mate,
    });
  }
  listTeammembers() {
    let teamMembers = [];
    db.getAllTeammembers()
      .then((data) => {
        teamMembers = data;
        console.log('View LayoutScreen: teammembers: ', teamMembers);
        this.setState({
          teamMembers: teamMembers,
          isLoading: false,
        });
      })
      .catch((err) => {
        console.log(err);
        this.setState({
          isLoading: false,
        });
      });
  }

  //   getName(name){
  //       this.props.teammateName = name
  //       console.log("props: ", this.props.teammateName)
  //       console.log("name: ", name)
  //   }
  render() {
    const rows = this.CreateRows(10);
    const {teamMembers} = this.state;
    console.log('Rendered Layout Screen!');
    console.log('rows: ', rows);
    return (
      <View>
        <View style={styles.Seat}>
          <Text>{this.state.addMate}</Text>
        </View>
        <View style={styles.ViewStyle}>
          <View style={styles.BoatOutline}>
            <TouchableOpacity
              onPress={() => {
                this.RBSheet.open(), this.props.teammateName;
              }}>
              {rows}
            </TouchableOpacity>
          </View>
          <TouchableOpacity onPress={() => this.RBSheet.open()}>
            <Text>Click to view Teammates</Text>
          </TouchableOpacity>
          <View style={styles.Row}></View>
        </View>
        <RBSheet
          ref={(ref) => {
            this.RBSheet = ref;
          }}
          closeOnDragDown={true}
          closeOnSwipeDown={true}
          height={800}
          duration={250}>
          <SearchBar
            placeholder={'Search for a teammate...'}
            onChangeText={(term) => this.setState({searchTerm: term})}
            searchIcon={false}
            clearIcon={false}
            value={this.state.searchTerm}
            lightTheme={true}
          />
          <SearchableFlatList
            data={teamMembers}
            searchTerm={this.state.searchTerm}
            searchAttribute={this.state.searchAttribute}
            ignoreCase={this.state.ignoreCase}
            renderItem={({item, index}) => (
              <TouchableOpacity
                onPress={() => {
                  this.addTeammamte(item.name), this.RBSheet.close();
                }}>
                <ListItem
                  key={index}
                  leftIcon={{name: 'face'}}
                  title={item.name}
                  subtitle={item.gender}
                  bottomDivider
                />
              </TouchableOpacity>
            )}
            keyExtractor={(item) => item.id}
          />
        </RBSheet>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  ViewStyle: {
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  RecentHeaderStyle: {
    alignSelf: 'center',
  },
  BoatOutline: {
    borderColor: 'black',
    borderWidth: 1,
    borderRadius: 4,
    width: Dimensions.get('window').width * 0.8,
    height: Dimensions.get('window').height * 0.8,
  },
  Seat: {
    borderColor: 'black',
    borderWidth: 1,
    borderRadius: 200,
    width: Dimensions.get('window').width * 0.1,
    height: Dimensions.get('window').height * 0.05,
  },
});

export default ViewLayoutScreen;
