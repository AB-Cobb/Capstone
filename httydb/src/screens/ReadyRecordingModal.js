import React from 'react';
import {View, Image} from 'react-native';
import ReadyRecording from '../components/ReadyRecording';

class ReadyRecordingModal extends React.Component {
    static navigationOptions = ({ navigation }) => {
        return {
            headerTitleAlign: "center"
        };
    };

    constructor(props) {
        super(props)
        this.state = {
            selectedLayout: props.selectedLayout
        }
    }

    render() {
        console.log("Rendered ReadyRecordingModal!")
        return (
            <View>
                <Image source={require("../assets/images/Map_Template.png")} style={{width: 410, height: 300}}/>
                <ReadyRecording currentLayout={this.state.selectedLayout} />
            </View>
        )
    }
}

export default ReadyRecordingModal;