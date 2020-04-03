import React from 'react';
import {
  View,
  Text,
  Button,
  Alert,
  StyleSheet,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import {CardTitle, CardContent} from 'react-native-cards';
import Card from '../components/Card';
import {db} from '../db/db';
import {SearchBar, ListItem} from 'react-native-elements';
import {SearchableFlatList} from 'react-native-searchable-list';

class LayoutScreen extends React.Component {
  static navigationOptions = ({navigation}) => {
    return {
      headerTitleAlign: 'center',
      headerRight: () => (
        <Button
          onPress={() => {
            navigation.navigate('AddLayout');
          }}
          title="+"
        />
      ),
    };
  };

  constructor(props) {
    super(props);
    this.state = {
      layouts: [],
      searchTerm: '',
      searchAttribute: '',
      ignoreCase: true,
    };
  }

  componentDidMount() {
    this._subscribe = this.props.navigation.addListener('didFocus', () => {
      this.listLayouts();
    });
    this.setState({
      layouts: [],
      isLoading: false,
    });
  }

  listLayouts() {
    let layouts = [];
    db.getallBoatLayouts()
      .then((data) => {
        layouts = data;
        console.log('LayoutScreen: ', layouts);
        this.setState({
          layouts: layouts,
        });
      })
      .catch((err) => {
        console.log(err);
        this.setState({
          isLoading: false,
        });
      });
  }

  onHandleSearch = (event) => {
    this.setState({
      searchTerm: event,
    });
  };
  render() {
    const {layouts} = this.state;
    return (
      <View styles={styles.container}>
        <SearchBar
          placeholder="Search Layout..."
          onChangeText={this.onHandleSearch}
          value={this.state.searchTerm}
        />
        <SearchableFlatList
          data={layouts}
          searchTerm={this.state.searchTerm}
          searchAttribute={this.state.searchAttribute}
          ignoreCase={this.state.ignoreCase}
          renderItem={({item}) => (
            <TouchableOpacity
              onPress={() =>
                this.props.navigation.navigate('ViewLayout', {layout: item})
              }>
              <Card>
                <Text>{item}</Text>
              </Card>
            </TouchableOpacity>
          )}
          keyExtractor={(item) => item.length}
          numColumns={3}
          columnWrapperStyle={styles.ListStyle}
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
  container: {
    flex: 1,
    marginTop: 60,
  },
  circle: {
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  card: {
    borderRadius: 8,
  },
});

export default LayoutScreen;
