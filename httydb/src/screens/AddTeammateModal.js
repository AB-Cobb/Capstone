import React from 'react';
import {View, TextInput, ScrollView } from 'react-native';
import { Button } from 'react-native-elements';
import db from '../db/db'

// const db = new Database();
export default class AddTeammateModal extends React.Component {
    static navigationOptions = ({ navigation }) => {
        return {
            headerTitleAlign: "center",
        };
    };

    constructor() {
        super();
        this.state = {
            id: '',
            name: '',
            active: ''
        }
    }
    
    onUpdate = (text, field) => {
        const state = this.state;
        this.setState({state, field: text});
    }

    onHandledId = (event) => {
      this.setState({
        id: event
      })
    }

    onHandledName = (event) => {
      this.setState({
        name: event
      })
    }

    onHandledActive = (event) => {
      this.setState({
        active: event
      })
    }


    onAdd() {
          let data = {
            id: this.state.id,
            name: this.state.name,
            active: this.state.active
          }
          db.insertTeammember(data).then((result) => {
            console.log(result);
            // this.props.navigation.params.onNavigateBack;
            this.props.navigation.goBack();
            // this.props.navigation.go
          }).catch((err) => {
            console.log(err);
          })
    }
    render() {
        return (
          <ScrollView>
            <View>
              <TextInput
                  placeholder={'ID'}
                  value={this.state.id}
                  onChangeText={this.onHandledId}
              />
            </View>
            <View>
              <TextInput
                  placeholder={'Name'}
                  value={this.state.name}
                  onChangeText={this.onHandledName}
              />
            </View>
            <View>
              <TextInput
                  placeholder={'Active'}
                  value={this.state.active}
                  onChangeText={this.onHandledActive}
              />
            </View>
            <View>
              <Button title='Add' onPress={() => this.onAdd()} />
            </View>
          </ScrollView>
        );
      }
}
