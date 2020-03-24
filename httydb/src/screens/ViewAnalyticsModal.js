import React from 'react';
import {View, Text} from 'react-native';

class ViewAnalyticsModal extends React.Component {
    static navigationOptions = ({ navigation }) => {
        return {
            headerTitleAlign: "center",
        };
    };

    constructor(props){
        super(props);
    }

    render() {
        console.log('Rendered ViewAnalyticsModal!');

        return (
            <View>
                <Text>Analytics Modal!</Text>
            </View>
        )
    }
}

export default ViewAnalyticsModal