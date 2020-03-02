import React from 'react';
import {View, TextInput, ScrollView} from 'react-native';
import {Button} from 'react-native-elements';
import {db} from '../db/db';
import {Team_member} from '../models/team_member';

// const db = new Database();
export default class AddTeammateModal extends React.Component {
  static navigationOptions = ({navigation}) => {
    return {
      headerTitleAlign: 'center',
    };
  };

  constructor() {
    super();
    this.state = {
      name: '',
      email: '',
      phone: '',
      gender: '',
      weight: '',
      height: '',
      side_preference: '',
      active: 'true',
      emergency_cont: '',
    };
  }

  onUpdate = (text, field) => {
    const state = this.state;
    this.setState({state, field: text});
  };

  onHandleName = event => {
    this.setState({
      name: event,
    });
  };
  onHandleEmail = event => {
    this.setState({
      email: event,
    });
  };

  onHandlePhone = event => {
    this.setState({
      phone: event,
    });
  };

  onHandleGender = event => {
    this.setState({
      gender: event,
    });
  };

  onHandleWeight = event => {
    this.setState({
      weight: event,
    });
  };

  onHandleHeight = event => {
    this.setState({
      height: event,
    });
  };

  onHandleSidePreference = event => {
    this.setState({
      side_preference: event,
    });
  };

  onHandleActive = event => {
    this.setState({
      active: event,
    });
  };

  onHandleEmergencyCont = event => {
    this.setState({
      emergency_cont: event,
    });
  };

  onAdd() {
    let data = new Team_member(
      this.state.name,
      this.state.email,
      this.state.phone,
      this.state.gender,
      this.state.weight,
      this.state.height,
      this.state.side_preference,
      this.state.active,
      this.state.emergency_cont,
    );

    db.insertTeammember(data)
      .then(result => {
        console.log(result);
        this.props.navigation.goBack();
      })
      .catch(err => {
        console.log(err);
      });
    //})
  }
  render() {
    return (
      <ScrollView>
        <View>
          <TextInput
            placeholder={'Name'}
            value={this.state.fname}
            onChangeText={this.onHandleName}
          />
        </View>
        <View>
          <TextInput
            placeholder={'Email'}
            value={this.state.email}
            onChangeText={this.onHandleEmail}
          />
        </View>
        <View>
          <TextInput
            placeholder={'Phone number'}
            value={this.state.phone}
            onChangeText={this.onHandlePhone}
          />
        </View>
        <View>
          <TextInput
            placeholder={'Gender'}
            value={this.state.gender}
            onChangeText={this.onHandleGender}
          />
        </View>
        <View>
          <TextInput
            placeholder={'Weight'}
            value={this.state.weight}
            onChangeText={this.onHandleWeight}
          />
        </View>
        <View>
          <TextInput
            placeholder={'Height'}
            value={this.state.email}
            onChangeText={this.onHandleHeight}
          />
        </View>
        <View>
          <TextInput
            placeholder={'Paddling side Preference'}
            value={this.state.side_preference}
            onChangeText={this.onHandleSidePreference}
          />
        </View>
        <View>
          <TextInput
            placeholder={'Active'}
            value={this.state.email}
            onChangeText={this.onHandleActive}
          />
        </View>
        <View>
          <TextInput
            placeholder={'Emergency Contact'}
            value={this.state.email}
            onChangeText={this.onHandleEmergencyCont}
          />
        </View>
        <View>
          <Button title="Add" onPress={() => this.onAdd()} />
        </View>
      </ScrollView>
    );
  }
}
