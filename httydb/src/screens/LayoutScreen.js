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
import {
  CardTitle,
  CardContent,
} from 'react-native-cards';
import Card from '../components/Card';
import {
  db
} from '../db/db';
import { SearchBar, ListItem } from 'react-native-elements';
import { SearchableFlatList } from "react-native-searchable-list";

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

  // static navigationOptions = ({ navigation }) => {
  //   return (
  //     <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
  //       <Text>Home Screen</Text>
  //       <Button
  //         title="View"
  //         onPress={() => navigation.navigate('ViewLayoutScreen')}
  //       />
  //     </View>
  //   );
  // };

  constructor(props) {
    super(props);
    this.state = {
      layouts: [],
      teamMembers: [],
      searchTerm: '',
      searchAttribute: 'name',
      ignoreCase: true,
    };
  }

  componentDidMount() {
    this.listTeammembers();
    this.setState({
      layouts: [],
      teamMembers: [],
      isLoading: false,
    });
  }

  listTeammembers() {
    let teamMembers = [];
    db.getAllTeammembers()
      .then(data => {
        teamMembers = data;
        console.log('LayoutScreen: teammembers: ', teamMembers);
        this.setState({
            layouts: ["Mens Team", "Womens Team", "A Team", "B Team","Mixed Team","C Team","Practice Team A","Practice Team B","Test Team","Team Team 2"],
          teamMembers: teamMembers,
          isLoading: false,
        });
    }
      )
      .catch(err => {
        console.log(err);
        this.setState({
          isLoading: false,
        });
      });
  }

  // searchFilter(keyword) {
  //   const searchKey = this.teamMembers.filter(item => {
  //     const data = `${item.name} ${item.side_preference}`
  //     return data.indexOf(keyword) > -1
  //   })

  //   this.setState({
  //     search: searchKey
  //   })
  // }

  onHandleSearch = event => {
    this.setState({
      searchTerm: event
    })
  }
  render() {
    const {layouts} = this.state;
    return ( 
      <View styles={styles.container}>
       
        <FlatList
                    data={layouts}
                    renderItem={({item}) =>
                        <TouchableOpacity onPress={() => this.props.navigation.navigate('ViewLayout', {layout: item})}>
                        <Card><Text>{item}</Text></Card>
                        </TouchableOpacity>}
                    keyExtractor={item => item.length}
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
    marginTop:60
  },
  circle: {
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  //   borderBottomLeftRadius: 20,
    // borderTopEndRadius: 500,
    // borderBottomEndRadius: 500,
  },
  card: {
    borderRadius: 8 
  }
});
  
export default LayoutScreen;

// <Button
//           onPress={() => {
//             this.props.navigation.navigate('ViewLayout', teamMembers);
//           }}
//           title="View"
//         />