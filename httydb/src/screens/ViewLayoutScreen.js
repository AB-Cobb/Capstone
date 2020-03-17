import React from 'react';
import {View, Button, StyleSheet, ScrollView} from 'react-native';
import { Divider, Text } from 'react-native-elements';


class ViewLayoutScreen extends React.Component {
    static navigationOptions = ({ navigation }) => {
        return {
            headerTitleAlign: "center",
        };
    };

    constructor(props) {
        super(props);
    }

    render() {
        console.log('Rendered Layout!');
        return (
            <View>
                <Text>Layout!</Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    ViewStyle: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        paddingBottom: 10,
    },
    RecentHeaderStyle: {
        alignSelf: 'center',
    },
    BottomHalf: {
        justifyContent: 'flex-end'
    }
});

export default ViewLayoutScreen;
