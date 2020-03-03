import React from 'react';
import {View, Button, StyleSheet, ScrollView, Text} from 'react-native';
import {Divider} from 'react-native-elements';

class ViewTeammateModal extends React.Component {
  static navigationOptions = ({navigation}) => {
    return {
      headerTitleAlign: 'center',
      headerRight: () => (
        <Button
          onPress={() => {
            navigation.navigate('EditTeammate', {teammate: navigation.getParam("teammate")});
          }}
          title="Edit"
        />
      ),
    };
  };

  constructor(props) {
    super(props);
    const teammate = this.props.navigation.getParam("teammate");
    this.state = {
        teammate
    }
  }

  render() {
      const {teammate} = this.state;
    return (
      <ScrollView>
        <Text>Name</Text>
        <Text>{teammate.name || 'FIRST_NAME'}</Text>
        <Divider style={{backgroundColor: 'blue'}} />

        <Text>Gender</Text>
        <Text>{teammate.gender || 'GENDER'}</Text>
        <Divider style={{backgroundColor: 'blue'}} />

        <Text>Paddling Side Preference</Text>
        <Text>{teammate.side_preference || 'PADDLING_SIDE'}</Text>
        <Divider style={{backgroundColor: 'blue'}} />

        <Text>Height</Text>
        <Text>{teammate.height || 'HEIGHT'}</Text>
        <Divider style={{backgroundColor: 'blue'}} />

        <Text>Weight</Text>
        <Text>{teammate.weight || 'WEIGHT'}</Text>
        <Divider style={{backgroundColor: 'blue'}} />

        <Text>Email Address</Text>
        <Text>{teammate.email || 'EMAIL'}</Text>
        <Divider style={{backgroundColor: 'blue'}} />

        <Text>Phone</Text>
        <Text>{teammate.phone || 'PHONE'}</Text>
        <Divider style={{backgroundColor: 'blue'}} />

        <Text>Emergency Contact</Text>
        <Text>{teammate.emergency_cont || 'EMERGENCY_CONTACT'}</Text>
        <Divider style={{backgroundColor: 'blue'}} />
      </ScrollView>
    );
  }
}

export default ViewTeammateModal;
