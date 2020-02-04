import React from 'react';
import {View, Text, Picker, TouchableOpacity, ShadowPropTypesIOS, StyleSheet} from 'react-native';
import {Image} from 'react-native' ;

const styles = StyleSheet.create({
  ButtonStyleOne: {
    backgroundColor: "lightgrey", 
    marginLeft: 35,
    marginTop: 20,
    width: 350, 
    height: 50, 
    textAlign: "center",
    textAlignVertical: "center", 
    fontSize: 24,
    color: "white",
    borderWidth: 1,
    borderColor: "grey",
    borderRadius: 2
  },
  
  ButtonStyleTwo: {
    backgroundColor: "lightgrey",
    flexDirection: "row-reverse",
    width: 150,
    height: 75,
    margin: 15,
    textAlign: "center",
    textAlignVertical: "center", 
    fontSize: 24,
    color: "white",
    borderWidth: 1,
    borderColor: "grey",
    borderRadius: 2
  }
})

 class ReadyOptions extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      selectedLayout: props.selectedLayout,
      layouts: props.layouts
    }
  }

  render () {
    return (
      <View>
        <Picker
          mode="dropdown"
          selectedValue={this.state.selectedLayout}
          style={{width: 350, height: 25, marginLeft: 35, marginTop: 15}}
          onValueChange={(itemValue, itemIndex) => {
            this.setState({selectedLayout: itemValue})
            this.props.onChange(itemIndex)
          }}>
            {this.state.layouts.map((item, index) => {
              return (<Picker.Item label={item} value={item} key={index}/>) 
            })}
        </Picker>
          <TouchableOpacity>
            <Text style={styles.ButtonStyleOne} onPress={this.props.onClick}>Start Route</Text>
          </TouchableOpacity>
        </View>
    );
  }
}

class ReadyAnalytics extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      currentLayout: props.currentLayout
    }
  }

  render() {
    return (
      <View style={{flexDirection: "row", justifyContent: "space-between"}}>
        <View style={{alignItems: "flex-start"}}>
          <Text style={{margin: 15, fontSize: 16}}>Current Layout: {this.state.currentLayout}</Text>
          <Text style={{margin: 15, fontSize: 16}}>Distance: {"0.00 KM"}</Text>
          <Text style={{margin: 15, fontSize: 16}}>Current Velocity: {"0.00 m/s"}</Text>
          <Text style={{margin: 15, fontSize: 16}}>Average Velocity: {"0.00 m/s"}</Text>
        </View>

        <View style={{alignItems: "flex-end"}}>
          <Text style={{margin: 15, fontSize: 16}}>Time: {"00:00:00"}</Text>
          <TouchableOpacity>
            <Text style={styles.ButtonStyleTwo}
              >Pause
            </Text>
          </TouchableOpacity>
          <TouchableOpacity>
            <Text style={styles.ButtonStyleTwo}>Stop and Save
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

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
      this.setState({isRecording: true});
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
        {this.state.isRecording ? <ReadyAnalytics currentLayout={this.state.layouts[this.state.selectedLayout]} /> 
        : <ReadyOptions layouts={this.state.layouts} selectedLayout={this.state.selectedLayout} onClick={() => this.handleClick()} onChange={i => this.changeLayout(i)} />}
      </View>
    );
  }
}

export default ReadyScreen;
