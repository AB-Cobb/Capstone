import React from 'react';
import {View, TextInput, ScrollView } from 'react-native';
import { Button } from 'react-native-elements';
import Database from '../db/db1'

const db = new Database();
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
        state[field] = text;
        this.setState(state);
    }

    onAdd() {
          let data = {
            id: this.state.id,
            name: this.state.name,
            active: this.state.active
          }
          db.add(data).then((result) => {
            console.log(result);
            this.props.navigation.state.params.onNavigateBack;
            this.props.navigation.goBack();
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
                  onChangeText={(text) => this.onUpdate(text, 'id')}
              />
            </View>
            <View>
              <TextInput
                  placeholder={'Name'}
                  value={this.state.name}
                  onChangeText={(text) => this.onUpdate(text, 'name')}
              />
            </View>
            <View>
              <TextInput
                  placeholder={'Active'}
                  value={this.state.active}
                  onChangeText={(text) => this.onUpdate(text, 'active')}
              />
            </View>
            <View>
              <Button title='Add' onPress={() => this.onAdd()} />
            </View>
          </ScrollView>
        );
      }
}
