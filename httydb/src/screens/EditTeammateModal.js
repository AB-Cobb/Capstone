import React from 'react';
import {View, Button, StyleSheet, ScrollView, Text} from 'react-native';
import {TextInput} from 'react-native-paper';
import {Divider} from 'react-native-elements';
class EditTeammateModal extends React.Component {
  static navigationOptions = ({navigation}) => {
    return {
      headerTitleAlign: 'center',
    };
  };

  constructor(props) {
    super(props);
    const item = this.props.navigation.state.params.teammember;
    this.state = {
      name: item.name,
      email: item.email,
      phone: item.phone,
      gender: item.gender,
      weight: item.weight,
      height: item.height,
      side_preference: item.side_preference,
      active: item.active,
      emergency_cont: item.emergency_cont,
    };
  }

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

  onUpdateButton() {
    if (!this.isEmail(this.state.email)) {
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

      db.updateTeammamber(data)
        .then(result => {
          console.log(result);
          this.props.navigation.goBack();
        })
        .catch(err => {
          console.log(err);
        });
    }
  }

  onDeleteButton() {
    console.log('Button clicked');
  }

  formatText = text => {
    return text.replace(/[^+\d]/g, '');
  };

  isEmail = email => {
    let reg = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return reg.test(email);
  };

  render() {
    const styles = StyleSheet.create({
      container: {
        paddingTop: 23,
      },
      input: {
        margin: 15,
        height: 40,
        borderColor: '#A14A76',
        borderWidth: 1,
      },
      saveButton: {
        backgroundColor: '#A14A76',
        padding: 10,
        margin: 15,
        height: 40,
      },
      submitButtonText: {
        color: 'white',
      },
    });

    const item = this.props.navigation.state.params.teammember;
    console.log('passed item ', item);
    return (
      <ScrollView>
        <View style={styles.container}>
          <TextInput
            label="Name"
            mode="outlined"
            value={item.name}
            onChangeText={name => this.setState({name})}
          />

          <Text>Gender</Text>
          <TextInput>{this.props.gender || 'GENDER'}</TextInput>
          <Divider style={{backgroundColor: 'blue'}} />

          <Text>Paddling Side Preference</Text>
          <TextInput>{this.props.paddlingSide || 'PADDLING_SIDE'}</TextInput>
          <Divider style={{backgroundColor: 'blue'}} />

          <Text>Height</Text>
          <TextInput>{this.props.height || 'HEIGHT'}</TextInput>
          <Divider style={{backgroundColor: 'blue'}} />

          <Text>Weight</Text>
          <TextInput>{this.props.weight || 'WEIGHT'}</TextInput>
          <Divider style={{backgroundColor: 'blue'}} />

          <Text>Email Address</Text>
          <TextInput>{this.props.email || 'EMAIL'}</TextInput>
          <Divider style={{backgroundColor: 'blue'}} />

          <Text>Weight</Text>
          <TextInput>{this.props.weight || 'WEIGHT'}</TextInput>
          <Divider style={{backgroundColor: 'blue'}} />

          <Text>Phone</Text>
          <TextInput>{this.props.phone || 'PHONE'}</TextInput>
          <Divider style={{backgroundColor: 'blue'}} />

          <Text>Emergency Contact</Text>
          <TextInput>
            {this.props.emergencyContact || 'EMERGENCY_CONTACT'}
          </TextInput>
          <Divider style={{backgroundColor: 'blue'}} />
        </View>
      </ScrollView>
    );
  }
}

export default EditTeammateModal;
