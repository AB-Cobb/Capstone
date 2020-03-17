import React from 'react';
import {
  FlatList,
  View,
  Button,
  StyleSheet,
  ScrollView,
  Text,
} from 'react-native';
import {Divider} from 'react-native-elements';
import {Table, Row, Rows} from 'react-native-table-component';

class ViewTeammateModal extends React.Component {
  static navigationOptions = ({navigation}) => {
    return {
      headerTitleAlign: 'center',
      headerRight: () => (
        <Button
          onPress={() => {
            navigation.navigate('EditTeammate');
          }}
          title="Edit"
        />
      ),
    };
  };

  constructor(props) {
    super(props);
    // const item = this.props.navigation.getParam('item');
    // this.state = {
    //   teammember: item,
    // };
  }

  render() {
    const styles = StyleSheet.create({
      container: {
        flex: 1,
        paddingTop: 10,
        paddingLeft: 15,
      },
      item: {
        padding: 5,
        fontSize: 14,
        height: 30,
        color: '#5C607C',
      },
      text: {margin: 2, fontSize: 20, color: '#243A43'},
    });
    return (
      <ScrollView>
        <View style={styles.container}>
          <FlatList
            data={[
              {
                key: 'Name',
                value: this.props.navigation.state.params.item.name,
              },
              {
                key: 'Email',
                value: this.props.navigation.state.params.item.email,
              },
              {
                key: 'Phone Number',
                value: this.props.navigation.state.params.item.phone,
              },
              {
                key: 'Gender',
                value: this.props.navigation.state.params.item.gender,
              },
              {
                key: 'Weight',
                value: this.props.navigation.state.params.item.weight,
              },
              {
                key: 'Height',
                value: this.props.navigation.state.params.item.height,
              },
              {
                key: 'Padding Side Preference',
                value: this.props.navigation.state.params.item.side_preference,
              },
              {
                key: 'Status',
                value: this.props.navigation.state.params.item.active,
              },
              {
                key: 'Emergency Contact',
                value: this.props.navigation.state.params.item.emergency_cont,
              },
            ]}
            renderItem={({item}) => (
              <View style={styles.container}>
                <Text style={styles.item}> {item.key} </Text>
                <Text style={styles.text}> {item.value} </Text>
              </View>
            )}
          />
        </View>
      </ScrollView>
    );
  }
}

export default ViewTeammateModal;
// <Text style={styles.item}>{item.key}</Text>
