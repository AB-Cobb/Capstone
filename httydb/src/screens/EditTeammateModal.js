import React from 'react';
import {
  View,
  Button,
  StyleSheet,
  ScrollView,
  Picker,
  PickerIOS,
} from 'react-native';
import {TextInput} from 'react-native-paper';
import {Dropdown} from 'react-native-material-dropdown';
import {Divider} from 'react-native-elements';
import {db} from '../db/db';
import {Team_member} from '../models/team_member';

class EditTeammateModal extends React.Component {
  // static navigationOptions = ({navigation}) => {
  //   return {
  //     headerTitleAlign: 'center',
  //     headerRight: () => (
  //       <Button onPress={() => this.saveHandler()} title="Save" />
  //     ),
  //   };
  // };

  constructor(props) {
    super(props);
    const item = this.props.navigation.state.params.teammember;
    this.state = {
      name: item.name,
      email: item.email,
      phone: item.phone,
      gender: item.gender,
      weight: item.weight.toString(),
      height: item.height.toString(),
      side_preference: item.side_preference,
      active: item.active,
      emergency_cont: item.emergency_cont,
    };
  }

  onUpdateButton() {
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

  onDeleteButton() {
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

    db.removeTeammamber(data)
      .then(result => {
        console.log(result);
        this.props.navigation.goBack();
      })
      .catch(err => {
        console.log(err);
      });
  }

  render() {
    const styles = StyleSheet.create({
      container: {
        paddingTop: 10,
      },
      field: {
        marginTop: 10,
        marginLeft: 20,
        marginRight: 20,
      },
      saveButton: {
        backgroundColor: '#A14A76',
        padding: 10,
        margin: 15,
        height: 40,
      },
      buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 70,
        margin: 15,
        paddingTop: 23,
      },
    });

    return (
      <ScrollView>
        <View style={styles.container}>
          <TextInput
            style={styles.field}
            label="Name"
            mode="outlined"
            value={this.state.name}
            onChangeText={name => this.setState({name})}
          />
          <TextInput
            style={styles.field}
            label="Email"
            mode="outlined"
            value={this.state.email}
            onChangeText={email => this.setState({email})}
          />
          <TextInput
            style={styles.field}
            label="Phone Number"
            mode="outlined"
            value={this.state.phone}
            onChangeText={phone => this.setState({phone})}
          />
          <View style={styles.field}>
            <Dropdown
              label="Gender"
              value={this.state.gender}
              data={[{value: 'Male'}, {value: 'Female'}, {value: 'Others'}]}
              onChangeText={gender => this.setState({gender})}
            />
          </View>
          <TextInput
            style={styles.field}
            label="Weight"
            mode="outlined"
            value={this.state.weight}
            onChangeText={weight => this.setState({weight})}
          />
          <TextInput
            style={styles.field}
            label="Height"
            mode="outlined"
            value={this.state.height}
            onChangeText={height => this.setState({height})}
          />
          <View style={styles.field}>
            <Dropdown
              label="Padding Side Preference"
              value={this.state.side_preference}
              data={[{value: 'Left'}, {value: 'Right'}, {value: 'Any Sides'}]}
              onChangeText={side_preference => this.setState({side_preference})}
            />
          </View>
          <View style={styles.field}>
            <Dropdown
              label="Status"
              value={this.state.active}
              data={[{value: 'Active'}, {value: 'Inactive'}]}
              onChangeText={active => this.setState({active})}
            />
          </View>
          <TextInput
            style={styles.field}
            label="Emergency Contact"
            mode="outlined"
            value={this.state.emergency_cont}
            onChangeText={emergency_cont => this.setState({emergency_cont})}
          />
        </View>
        <View style={styles.buttonContainer}>
          <Button
            title="Save"
            style={styles.saveButton}
            onPress={() => this.onUpdateButton()}
          />
          <Button
            title="Delete"
            style={styles.saveButton}
            onPress={() => this.onDeleteButton()}
          />
        </View>
      </ScrollView>
    );
  }
}

export default EditTeammateModal;
