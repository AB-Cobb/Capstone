import React from 'react';
import {View, Text, Button, Alert, StyleSheet, TouchableOpacity, FlatList} from 'react-native';
import Card from "../components/Card";

class LayoutScreen extends React.Component {
  static navigationOptions = ({ navigation }) => {
    return {
      headerTitleAlign: "center",
      headerRight: () => <Button
              onPress={() => {
                navigation.navigate('AddLayout');
              }}
              title="+"
          />,
    };
  };

  constructor(props) {
    super(props);
    this.state = {
        layouts: null
    }
  }

    componentDidMount() {
        this.setState({
            layouts: ["Mens Team", "Womens Team", "A Team", "B Team","Mixed Team","C Team","Practice Team A","Practice Team B","Test Team","Team Team 2"],
        });
    }

  render() {
    console.log('Rendered LayoutScreen!');
    const {layouts} = this.state;

    return (
        <View>
            <View>
                <FlatList
                    data={layouts}
                    renderItem={({item}) =>
                        <TouchableOpacity onPress={() => this.props.navigation.navigate('ViewLayout', {layout: item})}>
                        <Card><Text>{item}</Text></Card>
                        </TouchableOpacity>}
                    keyExtractor={item => item.length}
                    numColumns={3}
                    columnWrapperStyle={styles.ListStyle}
                />
            </View>
        </View>
    );
  }
}

const styles = StyleSheet.create({
    ListStyle: {
        flex: 1,
        justifyContent: 'space-between',
    }
});

export default LayoutScreen;
