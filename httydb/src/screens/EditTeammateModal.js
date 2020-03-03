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
            oldHeight: teammate.height.toString(),
            newHeight: "",
            oldWeight: teammate.weight.toString(),
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
                <TextInput placeholder={this.state.oldName || "FIRST_NAME"}
                           onChangeText={(text) => this.setState({newName: text})}
                           value={this.state.newName}
                />
                <Divider style={{ backgroundColor: 'blue' }} />

                <Text>Gender</Text>
                <TextInput placeholder={this.state.oldGender || "GENDER"}
                           onChangeText={(text) => this.setState({newGender: text})}
                           value={this.state.newGender}
                />
                <Divider style={{ backgroundColor: 'blue' }} />

                <Text>Paddling Side Preference</Text>
                <TextInput placeholder={this.state.oldSide || "PADDLING_SIDE"}
                           onChangeText={(text) => this.setState({newSide: text})}
                           value={this.state.newSide}
                />
                <Divider style={{ backgroundColor: 'blue' }} />

                <Text>Height</Text>
                <TextInput placeholder={this.state.oldHeight || "HEIGHT"}
                           onChangeText={(text) => this.setState({newHeight: text})}
                           value={this.state.newHeight}
                />
                <Divider style={{ backgroundColor: 'blue' }} />

                <Text>Weight</Text>
                <TextInput placeholder={this.state.oldWeight || "WEIGHT"}
                           onChangeText={(text) => this.setState({newWeight: text})}
                           value={this.state.newWeight}
                />
                <Divider style={{ backgroundColor: 'blue' }} />

                <Text>Email Address</Text>
                <TextInput placeholder={this.state.oldEmail || "EMAIL"}
                           onChangeText={(text) => this.setState({newEmail: text})}
                           value={this.state.newEmail}
                />
                <Divider style={{ backgroundColor: 'blue' }} />

                <Text>Phone</Text>
                <TextInput placeholder={this.state.oldPhone || "PHONE"}
                           onChangeText={(text) => this.setState({newPhone: text})}
                           value={this.state.newPhone}
                />
                <Divider style={{ backgroundColor: 'blue' }} />

                <Text>Emergency Contact</Text>
                <TextInput placeholder={this.state.oldEmergency || "EMERGENCY_CONTACT"}
                           onChangeText={(text) => this.setState({newEmergency: text})}
                           value={this.state.newEmergency}
                />
                <Divider style={{ backgroundColor: 'blue' }} />

                <Text>Active Teammate</Text>
                <TextInput placeholder={this.state.oldActive || "true"}
                           onChangeText={(text) => this.setState({newActive: text})}
                           value={this.state.newActive}
                />
                <Divider style={{ backgroundColor: 'blue' }} />
            </ScrollView>
        );
    }

}

export default EditTeammateModal;