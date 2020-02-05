import React from 'react';
import {View, Image, Text, Picker, TouchableOpacity, ShadowPropTypesIOS, StyleSheet} from 'react-native';
import ReadyOptions from '../components/ReadyOptions';


class ReadyScreen extends React.Component {
  static navigationOptions = ({ navigation }) => {
    return {
      headerTitleAlign: "center",
    };
  };

  constructor(props) {
    super(props);
    this.state = {
      layouts: ["-- Select A Layout --", "Layout One", "Layout Two", "Layout Three"],
      selectedLayout: 0,
      isRecording: false
    }
  }

  handleClick() {
    if (this.state.selectedLayout != 0){
      
    }
  }

  changeLayout(layoutIndex) {
    this.setState({selectedLayout: layoutIndex});
  }

  render() {
    console.log('Rendered ReadyScreen!');
    return (
      <View>
        <Image source={require("../assets/images/Map_Template.png")} style={{width: 410, height: 300}}/>
        <ReadyOptions layouts={this.state.layouts} selectedLayout={this.state.selectedLayout} onClick={() => this.handleClick()} onChange={i => this.changeLayout(i)} />
      </View>
    );
  }
}

export default ReadyScreen;
