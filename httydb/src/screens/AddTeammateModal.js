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
import {Dropdown} from 'react-native-material-dropdown';
// import Icon from 'react-native-vector-icons/FontAwesome';
// import {Input} from 'react-native-elements';
import {
  TextField,
  FilledTextField,
  OutlinedTextField,
} from 'react-native-material-textfield';

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

  formatText = text => {
    return text.replace(/[^+\d]/g, '');
  };

  isEmail = email => {
    let reg = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return reg.test(email);
  };
  render() {
    return (
      <ScrollView>
        <OutlinedTextField
          label="Name"
          keyboardType="default"
          onChangeText={this.onHandleName}
        />
        <OutlinedTextField
          label="Email"
          keyboardType="email-address"
          onChangeText={this.onHandleEmail}
        />
        <OutlinedTextField
          label="Phone number"
          keyboardType="phone-pad"
          formatText={this.formatText}
          onChangeText={this.onHandlePhone}
        />
        <Dropdown
          label="Gender"
          data={[
            {
              value: 'Female',
            },
            {
              value: 'Male',
            },
            {
              value: 'Others',
            },
          ]}
          selectedValue={this.state.gender}
          onValueChange={(item, index) => this.setState({gender: item})}
        />
        <OutlinedTextField
          label="Weight (lb)"
          keyboardType="numeric"
          formatText={this.formatText}
          onChangeText={this.onHandleWeight}
        />
        <OutlinedTextField
          label="Height (cm)"
          keyboardType="numeric"
          formatText={this.formatText}
          onChangeText={this.onHandleHeight}
        />
        <Dropdown
          label="Padding Side Preference"
          data={[
            {
              value: 'Left',
            },
            {
              value: 'Right',
            },
            {
              value: 'Any',
            },
          ]}
          selectedValue={this.state.side_preference}
          onValueChange={(item, index) =>
            this.setState({side_preference: item})
          }
        />
        <Dropdown
          label="Status"
          data={[
            {
              value: 'Active',
            },
            {
              value: 'Inactive',
            },
          ]}
          selectedValue={this.state.active}
          onValueChange={(item, index) => this.setState({active: item})}
        />
        <OutlinedTextField
          label="Emergency Contact"
          keyboardType="phone-pad"
          formatText={this.formatText}
          onChangeText={this.onHandleEmergencyCont}
        />
        <View>
          <Button title="Add" onPress={() => this.onAdd()} />
        </View>
      </ScrollView>
    );
  }
}
