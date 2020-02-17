import React from 'react';
import {View, Button, StyleSheet, ScrollView, Text, TextInput} from 'react-native';
import { Divider } from 'react-native-elements';

class EditTeammateModal extends React.Component {
    static navigationOptions = ({ navigation }) => {
        return {
            headerTitleAlign: "center",
        };
    };

    constructor(props){
        super(props);

    }

    render(){

        return (
            <ScrollView>
                <Text>Name</Text>
                <TextInput>{this.props.firstName || "FIRST_NAME"}</TextInput>
                <Divider style={{ backgroundColor: 'blue' }} />

                <Text>Gender</Text>
                <TextInput>{this.props.gender || "GENDER"}</TextInput>
                <Divider style={{ backgroundColor: 'blue' }} />

                <Text>Paddling Side Preference</Text>
                <TextInput>{this.props.paddlingSide || "PADDLING_SIDE"}</TextInput>
                <Divider style={{ backgroundColor: 'blue' }} />

                <Text>Height</Text>
                <TextInput>{this.props.height || "HEIGHT"}</TextInput>
                <Divider style={{ backgroundColor: 'blue' }} />

                <Text>Weight</Text>
                <TextInput>{this.props.weight || "WEIGHT"}</TextInput>
                <Divider style={{ backgroundColor: 'blue' }} />

                <Text>Email Address</Text>
                <TextInput>{this.props.email || "EMAIL"}</TextInput>
                <Divider style={{ backgroundColor: 'blue' }} />

                <Text>Weight</Text>
                <TextInput>{this.props.weight || "WEIGHT"}</TextInput>
                <Divider style={{ backgroundColor: 'blue' }} />

                <Text>Phone</Text>
                <TextInput>{this.props.phone || "PHONE"}</TextInput>
                <Divider style={{ backgroundColor: 'blue' }} />

                <Text>Emergency Contact</Text>
                <TextInput>{this.props.emergencyContact || "EMERGENCY_CONTACT"}</TextInput>
                <Divider style={{ backgroundColor: 'blue' }} />
            </ScrollView>
        );
    }

}

export default EditTeammateModal;