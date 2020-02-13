import React from 'react';
import {View, Button, StyleSheet, ScrollView, Text} from 'react-native';
import { Divider } from 'react-native-elements';

class ViewTeammateModal extends React.Component {
    static navigationOptions = ({ navigation }) => {
        return {
            headerTitleAlign: "center",
            headerRight: () => <Button
                onPress={() => {
                    navigation.navigate('AddTeammate');
                }}
                title="Edit"
            />,
        };
    };

    constructor(props){
        super(props);

    }

    render(){

        return (
            <ScrollView>
                <Text>Name</Text>
                <Text>{this.props.firstName || "FIRST_NAME"}</Text>
                <Divider style={{ backgroundColor: 'blue' }} />

                <Text>Gender</Text>
                <Text>{this.props.gender || "GENDER"}</Text>
                <Divider style={{ backgroundColor: 'blue' }} />

                <Text>Paddling Side Preference</Text>
                <Text>{this.props.paddlingSide || "PADDLING_SIDE"}</Text>
                <Divider style={{ backgroundColor: 'blue' }} />

                <Text>Height</Text>
                <Text>{this.props.height || "HEIGHT"}</Text>
                <Divider style={{ backgroundColor: 'blue' }} />

                <Text>Weight</Text>
                <Text>{this.props.weight || "WEIGHT"}</Text>
                <Divider style={{ backgroundColor: 'blue' }} />

                <Text>Email Address</Text>
                <Text>{this.props.email || "EMAIL"}</Text>
                <Divider style={{ backgroundColor: 'blue' }} />

                <Text>Weight</Text>
                <Text>{this.props.weight || "WEIGHT"}</Text>
                <Divider style={{ backgroundColor: 'blue' }} />

                <Text>Phone</Text>
                <Text>{this.props.phone || "PHONE"}</Text>
                <Divider style={{ backgroundColor: 'blue' }} />

                <Text>Emergency Contact</Text>
                <Text>{this.props.emergencyContact || "EMERGENCY_CONTACT"}</Text>
                <Divider style={{ backgroundColor: 'blue' }} />
            </ScrollView>
        );
    }

}

export default ViewTeammateModal;