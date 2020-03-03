import React from 'react';
import {View, Button, StyleSheet, ScrollView, Text, TextInput} from 'react-native';
import { Divider } from 'react-native-elements';

class EditTeammateModal extends React.Component {
    static navigationOptions = ({ navigation }) => {
        return {
            headerTitleAlign: "center",
            headerRight: () => (
                <Button
                    onPress={() => {

                    }}
                    title="Save"
                />
            )
        };
    };

    constructor(props){
        super(props);
        const teammate = this.props.navigation.getParam("teammate");
        this.state = {
            oldName: teammate.name,
            newName: "",
            oldGender: teammate.gender,
            newGender: "",
            oldSide: teammate.side_preference,
            newSide: "",
            oldHeight: teammate.height,
            newHeight: "",
            oldWeight: teammate.weight,
            newWeight: "",
            oldEmail: teammate.email,
            newEmail: "",
            oldPhone: teammate.phone,
            newPhone: "",
            oldEmergency: teammate.emergency_cont,
            newEmergency: "",
            oldActive: teammate.active,
            newActive: null
        }
    }

    saveHandler = () =>{

    };

    render(){

        return (
            <ScrollView>
                <Text>Name</Text>
                <TextInput>{this.state.oldName || "FIRST_NAME"}</TextInput>
                <Divider style={{ backgroundColor: 'blue' }} />

                <Text>Gender</Text>
                <TextInput>{this.state.oldGender || "GENDER"}</TextInput>
                <Divider style={{ backgroundColor: 'blue' }} />

                <Text>Paddling Side Preference</Text>
                <TextInput>{this.state.oldSide || "PADDLING_SIDE"}</TextInput>
                <Divider style={{ backgroundColor: 'blue' }} />

                <Text>Height</Text>
                <TextInput>{this.state.oldHeight || "HEIGHT"}</TextInput>
                <Divider style={{ backgroundColor: 'blue' }} />

                <Text>Weight</Text>
                <TextInput>{this.state.oldWeight || "WEIGHT"}</TextInput>
                <Divider style={{ backgroundColor: 'blue' }} />

                <Text>Email Address</Text>
                <TextInput>{this.state.oldEmail || "EMAIL"}</TextInput>
                <Divider style={{ backgroundColor: 'blue' }} />

                <Text>Phone</Text>
                <TextInput>{this.state.oldPhone || "PHONE"}</TextInput>
                <Divider style={{ backgroundColor: 'blue' }} />

                <Text>Emergency Contact</Text>
                <TextInput>{this.state.oldEmergency || "EMERGENCY_CONTACT"}</TextInput>
                <Divider style={{ backgroundColor: 'blue' }} />

                <Text>Active Teammate</Text>
                <TextInput>{this.state.oldActive || "true"}</TextInput>
                <Divider style={{ backgroundColor: 'blue' }} />
            </ScrollView>
        );
    }

}

export default EditTeammateModal;