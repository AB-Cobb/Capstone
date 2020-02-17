import React from 'react';
import {ScrollView, Text, Button, StyleSheet, View, FlatList} from 'react-native';
import Card from '../components/Card.js';
import {db} from '../db/db';

//Database = new db_init()

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
      isLoading: false
    }
  }

  componentDidMount() {

    // this.setState({
    //   teammates: ["Arsalan", "Andrew", "Guiseppe", "Nga","Zapdos","Jolteon","Pikachu","Luxray","Dedenne","Charizard"],
    // });

    this._subscribe = this.props.navigation.addListener('didFocus', () => {
      //db.open().then(()=>{
        this.listTeammate();
      //})
    });
    
  }

  listTeammate() {
    let teammates = [];
    db.getAllTeammembers().then((data)=>{
      teammates = data;
      console.log("Teamscreen: teammembers: ", teammates)
      this.setState({
        teammates,
        isLoading: false,
      });
    }).catch((err) => {
      console.log(err);
      this.setState = {
        isLoading: false
      }
    })
  }

  render() {
    console.log('Rendered TeamScreen!');
    // const {teammates} = this.state;

    // if(this.state.teammates.length === 0){
    //   return(
    //     <View>
    //       <Text>Teammate View</Text>
    //     </View>
    //   )
    // }

    return (
        <View>
          <View>

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
