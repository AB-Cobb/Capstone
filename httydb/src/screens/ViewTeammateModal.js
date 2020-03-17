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

class ViewTeammateModal extends React.Component {

  static navigationOptions = ({navigation}) => {
    return {
      headerTitleAlign: 'center',
      headerRight: () => (
        <Button
          onPress={() => {
            navigation.navigate('EditTeammate', {teammate: navigation.getParam("teammate")});
          }}
          title="Edit"
        />
      ),
    };
  };

  constructor(props) {
    super(props);
    const teammate = this.props.navigation.getParam("teammate");
    this.state = {
        teammate
    }
  }

  // navigationOptions = ({navigation}) => {
  //   const editItem = this.props.navigation.state.params.item;

  //   return {
  //     headerTitleAlign: 'center',
  //     headerRight: () => (
  //       <Button
  //         onPress={() => {
  //           this.props.navigation.navigate('EditTeammate', {editItem});
  //         }}
  //         title="Edit"
  //       />
  //     ),
  //   };
  // };

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
    const teammember = this.props.navigation.state.params.item;
    return (
      <ScrollView>
        <Button
          onPress={() => {
            this.props.navigation.navigate('EditTeammate', {teammember});
          }}
          title="Edit"
        />
        <View style={styles.container}>
          <FlatList
            data={[
              {
                key: 'Name',
                value: teammember.name,
              },
              {
                key: 'Email',
                value: teammember.email,
              },
              {
                key: 'Phone Number',
                value: teammember.phone,
              },
              {
                key: 'Gender',
                value: teammember.gender,
              },
              {
                key: 'Weight',
                value: teammember.weight,
              },
              {
                key: 'Height',
                value: teammember.height,
              },
              {
                key: 'Padding Side Preference',
                value: teammember.side_preference,
              },
              {
                key: 'Status',
                value: teammember.active,
              },
              {
                key: 'Emergency Contact',
                value: teammember.emergency_cont,
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
