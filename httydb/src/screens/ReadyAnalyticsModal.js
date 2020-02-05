import React from 'react';
import {View, Image} from 'react-native';
import ReadyAnalytics from '../components/ReadyAnalytics'

class ReadyAnalyticsModal extends React.Component {
    static navigationOptions = ({ navigation }) => {
        return {
            headerTitleAlign: "center"
        };
    };

    constructor(props) {
        super(props)
        this.state = {
            selectedLayout = props.selectedLayout
        }
    }

    render() {
        console.log("Rendered ReadyAnalyticsModal!")
        return (
            <View>
                <Image source={require("../assets/images/Map_Template.png")} style={{width: 410, height: 300}}/>
                <ReadyAnalytics currentLayout={this.props.selectedLayout} />
            </View>
        )
    }
}