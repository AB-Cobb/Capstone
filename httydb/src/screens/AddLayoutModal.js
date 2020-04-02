import React from 'react';
import {View, Text, TextInput, StyleSheet} from 'react-native';
import {Divider} from 'react-native-elements';
import {TouchableOpacity, ScrollView} from 'react-native-gesture-handler';
import Card from '../components/Card';

class AddLayoutModal extends React.Component {
  static navigationOptions = ({navigation}) => {
    return {
      headerTitleAlign: 'center',
    };
  };

  constructor(props) {
    super(props);
    this.state = {
      layoutTemplates: ['8 Rows', '10 Rows', '11 Rows', '12 Rows', '16 Rows'],
      recentLayouts: ['A Team', 'B Team', 'Mixed Team'],
    };
  }

  render() {
    console.log('Rendered AddLayoutModal!');

    let layouts = this.state.layoutTemplates;
    let recent = this.state.recentLayouts;

    let layoutTemplateList = null;
    let recentLayoutList = null;

    if (layouts) {
      layoutTemplateList = layouts.map((layout, index) => {
        return (
          <Card key={index}>
            <Text>{layout}</Text>
          </Card>
        );
      });
    }

    if (recent) {
      recentLayoutList = recent.map((rec, index) => {
        return (
          <Card key={index}>
            <Text>{rec}</Text>
          </Card>
        );
      });
    }

    return (
      <View>
        <Text style={styles.TextStyle}>Layout Name:</Text>
        <TextInput
          placeholder="eg. MyLayout"
          style={styles.TextBoxStyle}></TextInput>
        <Text style={styles.TextStyle}>Number Of Rows:</Text>
        <TextInput
          placeholder="eg. for 20 seats, enter 10 rows"
          style={styles.TextBoxStyle}></TextInput>
        <TouchableOpacity>
          <Text style={styles.ButtonStyle}>Create Layout!</Text>
        </TouchableOpacity>
        <Divider style={{backgroundColor: 'blue'}} />
        <Text style={styles.Headers}>Layout Templates</Text>
        <ScrollView style={styles.ViewStyle} horizontal={true}>
          {layoutTemplateList}
        </ScrollView>
        <Divider style={{backgroundColor: 'blue'}} />
        <Text style={styles.Headers}>Recent Layouts</Text>
        <ScrollView style={styles.ViewStyle} horizontal={true}>
          {recentLayoutList}
        </ScrollView>
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
  TextStyle: {
    fontSize: 16,
    textAlign: 'center',
    textAlignVertical: 'center',
    marginTop: 5,
  },
  Headers: {
    fontSize: 30,
    textAlign: 'center',
    textAlignVertical: 'center',
  },
  TextBoxStyle: {
    borderColor: 'black',
    borderWidth: 1,
    borderRadius: 3,
    backgroundColor: 'white',
    height: 35,
    width: 250,
    marginLeft: 75,
  },
  ButtonStyle: {
    backgroundColor: 'lightgrey',
    marginLeft: 100,
    marginTop: 20,
    width: 200,
    height: 40,
    textAlign: 'center',
    textAlignVertical: 'center',
    fontSize: 24,
    color: 'white',
    borderWidth: 1,
    borderColor: 'grey',
    borderRadius: 2,
  },
});

export default AddLayoutModal;
