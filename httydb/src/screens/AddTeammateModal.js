import React from 'react';
import {View, Text} from 'react-native';

class AddTeammateModal extends React.Component {
    static navigationOptions = ({ navigation }) => {
        return {
            headerTitleAlign: "center",
        };
    };

    constructor(props) {
        super(props);
    }

    render() {
        console.log('Rendered AddTeammateModal!');
        return (
            <View>
                <Text>Add Teammate</Text>
            </View>
        );
    }
}

export default AddTeammateModal;
