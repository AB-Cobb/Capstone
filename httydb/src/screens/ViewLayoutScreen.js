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
      headerRight: () => (
        <Button onPress={() => this.onAddLayout} title="Save" />
      ),
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
      layout: [],
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
    layout[0][0].append;
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
  onAddLayout() {
    let data = new Boat_Layout(
      this.state.num_paddlers,
      this.state.name,
      this.state.date,
      this.state.active,
      this.state.id,
    );
    console.log('new boad add: ', data);
    this.props.navigation.navigate('ViewLayout', {data});
  }

  // searchFilter(keyword) {
  //   const searchKey = this.teamMembers.filter((item) => {
  //     const data = `${item.name} ${item.side_preference}`;
  //     return data.indexOf(keyword) > -1;
  //   });

  //   getName(name){
  //       this.props.teammateName = name
  //       console.log("props: ", this.props.teammateName)
  //       console.log("name: ", name)
  //   }
  render() {
    const layout = this.props.navigation.state.params.data;
    const rows = this.CreateRows(layout.num_paddlers);
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
                  this.addTeammamte(item), this.RBSheet.close();
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
