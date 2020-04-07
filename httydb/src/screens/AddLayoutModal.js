import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  Button,
  FlatList,
} from 'react-native';
import {Divider} from 'react-native-elements';
import {ScrollView} from 'react-native-gesture-handler';
import Card from '../components/Card';
import {Boat_Layout} from '../models/boat_layout';
import {db} from '../db/db';

class AddLayoutModal extends React.Component {
  static navigationOptions = ({navigation}) => {
    return {
      headerTitleAlign: 'center',
    };
  };

  constructor(props) {
    super(props);
    this.state = {
      name: '',
      date: new Date(),
      active: 'active',
      id: null,
      num_paddlers: 0,
      layoutTemplates: [8, 10, 12, 14, 16],
      recentLayouts: [],
    };
  }
  onAddLayout() {
    if (!this.isEvenNumber(this.state.num_paddlers)) {
      alert('Please enter an odd number for number of Rows');
    } else {
      numRows = this.state.num_paddlers * 2;
      let data = new Boat_Layout(
        numRows,
        this.state.name,
        this.state.date,
        this.state.active,
        this.state.id,
      );
      console.log('Before Insert Layout');
      this.props.navigation.navigate('ViewLayout', {data});
    }
  }

  isEvenNumber(num) {
    if (num % 2 === 0) return true;
    return false;
  }

  listLayouts() {
    let layouts = [];
    db.getallBoatLayouts()
      .then((data) => {
        layouts = data;
        this.setState({
          recentLayouts: layouts,
        });
      })
      .catch((err) => {
        console.log(err);
        this.setState({
          isLoading: false,
        });
      });
  }

  onHandleName = (event) => {
    this.setState({
      name: event,
    });
  };

  render() {
    console.log('Rendered AddLayoutModal!');
    let templates = this.state.layoutTemplates;
    let recent = this.state.recentLayouts;

    let layoutTemplateList = null;
    let recentLayoutList = null;

    if (templates) {
      layoutTemplateList = templates.map((layout, index) => {
        return (
          <TouchableOpacity
            onPress={(layout) => this.setState({num_paddlers: layout})}>
            <Card key={index}>
              <Text>{layout} Rows</Text>
            </Card>
          </TouchableOpacity>
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
          style={styles.TextBoxStyle}
          onChangeText={this.onHandleName}
        />
        <Text style={styles.TextStyle}>Number Of Rows:</Text>
        <TextInput
          placeholder="eg. for 20 seats, enter 10 rows"
          style={styles.TextBoxStyle}
          onChangeText={(num_paddlers) => this.setState({num_paddlers})}
        />
        <View style={styles.ButtonStyle}>
          <Button title="Create Layout" onPress={() => this.onAddLayout()} />
        </View>
        <Divider style={{backgroundColor: 'blue'}} />
        <Text style={styles.Headers}>Layout Templates</Text>
        <ScrollView style={styles.ViewStyle} horizontal={true} data={templates}>
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
