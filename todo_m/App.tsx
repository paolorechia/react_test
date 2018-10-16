/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React from 'react';
import {Component} from 'react';
import {Platform, StyleSheet, Text, View, TextInput}
from 'react-native';

const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
  android:
    'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});

interface TodoItem {
  id: number,
  name: string,
  finished: boolean,
}

interface ItemList extends Array<TodoItem> {
}

type Props = {};
type State = {todo_list: ItemList};

export default class App extends Component<Props, State> {
  private todo_list: ItemList;
  private currentId: number;
  constructor(props: any){

    super(props);
    this.currentId = 0;
    this.todo_list = [];
    this.state = {
      todo_list: this.todo_list,
    }
  }
  public addItem(new_item: TodoItem){
    this.setState((state, props) => {
      this.todo_list.push(new_item);
      return {todo_list: this.state.todo_list};
    });
  }
  public removeItem(item_id: number){
    this.setState((state, props) => {
      console.log(this.state.todo_list);
      let list = this.state.todo_list;
      for (let i = 0; i < list.length; i++){
        if (list[i].id == item_id){
          this.state.todo_list.splice(i, 1);
        }
      }
      return {todo_list: this.state.todo_list};
    });
  }
  public finishItem(item_id: number){
    this.setState((state, props) => {
      let list = this.state.todo_list;
      for (let i = 0; i < list.length; i++){
        if (list[i].id == item_id)
          this.state.todo_list[i].finished = true;
      }
      return {todo_list: this.state.todo_list};
    });
  }
  public undoItem(item_id: number){
    this.setState((state, props) => {
      let list = this.state.todo_list;
      for (let i = 0; i < list.length; i++){
        if (list[i].id == item_id)
        this.state.todo_list[i].finished = false;
      }
      return {todo_list: this.state.todo_list};
    });
  }
  public textInputHandler(text: string){

    return null;
  }
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>Task Manager!</Text>
        <TextInput style={styles.input}
                   placeholder="Type task here"
                   onSubmitEditing={(text) => this.inputTextHandler(text)}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
  input: {
    textAlign: 'center',
  },
});
