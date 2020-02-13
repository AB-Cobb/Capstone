import React from 'react';
import {View, Text, ScrollView} from 'react-native';

class AddLayoutModal extends React.Component {
    static navigationOptions = ({ navigation }) => {
        return {
            headerTitleAlign: "center",
        };
    };

    constructor(props) {
        super(props);
    }

    render() {
        console.log('Rendered AddLayoutModal!');
        return (
            <View>
                <Text>Add Layout</Text>
            </View>
        );
    }
}

export default AddLayoutModal;
