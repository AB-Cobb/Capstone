import React from "react";
import {View, Picker, TouchableOpacity, Text, StyleSheet} from 'react-native';

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
                return (<Picker.Item label={item.name} value={item.id} key={index}/>) 
              })}
          </Picker>
            <TouchableOpacity>
              <Text style={styles.ButtonStyleOne} onPress={this.props.onClick}>Start Route</Text>
            </TouchableOpacity>
          </View>
      );
    }
}

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
    }
});

export default ReadyOptions