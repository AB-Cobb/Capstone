import React from 'react';
import {
  View,
  TextInput,
  ScrollView,
  Picker,
  TouchableOpacity,
} from 'react-native';
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
      active: '',
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
    if (!this.isEmail(this.state.email)) {
      console.log('email is not correct');
      alert('Email is not correct');
    } else {
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
    }
  }

  isEmail = email => {
    let reg = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return reg.test(email);
  };
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
            keyboardType="phone-pad"
          />
        </View>
        <View>
          <Picker
            selectedValue={this.state.gender}
            onValueChange={(itemValue, itemIndex) =>
              this.setState({gender: itemValue})
            }
            mode="dropdown">
            <Picker.Item label="Male" value="Male" />
            <Picker.Item label="Female" value="Female" />
          </Picker>
        </View>
        <View>
          <TextInput
            placeholder={'Weight'}
            value={this.state.weight}
            onChangeText={this.onHandleWeight}
            keyboardType="phone-pad"
          />
        </View>
        <View>
          <TextInput
            placeholder={'Height'}
            value={this.state.height}
            onChangeText={this.onHandleHeight}
            keyboardType="phone-pad"
          />
        </View>
        <View>
          <Picker
            selectedValue={this.state.side_preference}
            onValueChange={(itemValue, itemIndex) =>
              this.setState({side_preference: itemValue})
            }
            mode="dropdown">
            <Picker.Item label="Left" value="Left" />
            <Picker.Item label="Right" value="Right" />
            <Picker.Item label="Any" value="Any" />
          </Picker>
        </View>

        <View>
          <Picker
            selectedValue={this.state.active}
            onValueChange={(itemValue, itemIndex) =>
              this.setState({active: itemValue})
            }
            mode="dropdown">
            <Picker.Item label="Yes" value="true" />
            <Picker.Item label="No" value="false" />
          </Picker>
        </View>
        <View>
          <TextInput
            placeholder={'Emergency Contact'}
            value={this.state.emergency_cont}
            onChangeText={this.onHandleEmergencyCont}
            keyboardType="phone-pad"
          />
        </View>
        <View>
          <Button title="Add" onPress={() => this.onAdd()} />
        </View>
      </ScrollView>
    );
  }
}

// <TextInput
//             placeholder={'Gender'}
//             value={this.state.gender}
//             onChangeText={this.onHandleGender}
//           />

//           <TextInput
//             placeholder={'Paddling side Preference'}
//             value={this.state.side_preference}
//             onChangeText={this.onHandleSidePreference}
//           />

//           <TextInput
//           placeholder={'Active'}
//           value={this.state.active}
//           onChangeText={this.onHandleActive}
//         />
