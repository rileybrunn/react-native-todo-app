import { StatusBar } from 'expo-status-bar';
import { StyleSheet, SafeAreaView, Button, FlatList } from 'react-native';
import { CheckBox, Text, Input } from '@rneui/themed';
import { useState } from 'react';
import * as Font from 'expo-font';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import React from 'react';

async function cacheFonts(fonts) {
  return fonts.map(async (font) => await Font.loadAsync(font));
}

let startTasks = [
  {description: 'Task 1', completed: true, key: 1},
  {description: 'Task 2', completed: true, key: 2}
]

export default function App() {
  cacheFonts([FontAwesome.font]);
  let [tasks, setTasks] = useState(startTasks);
  let [input, setInput] = useState('');
  let updateTask = (task) => {
    task.completed = !task.completed;
    setTasks([...tasks]);
  }
  let addTask = () => {
    let maxKey = 0;
    tasks.forEach(task => {
      if(task.key > maxKey) {
        maxKey = task.key;
      }
    });
    setTasks([...tasks, {
      description: input,
      completed: false,
      key: maxKey+1
    }]);
    console.log(tasks);
    setInput('');
  }
  let renderItem = ({ item }) => {
    return <CheckBox
    textStyle={ item.completed ? {
      textDecorationLine: 'line-through', textDecorationStyle: 'solid'
    } : undefined}
    title={item.description}
    checked={item.completed}
    onPress={() => updateTask(item)} />
  }

  return (
    <SafeAreaView style={[styles.container]}>
      <StatusBar style='auto' />
      <FlatList data={tasks} renderItem={renderItem} />
      <Input 
      onChangeText={setInput}
      value={input}
      placeholder='New task...'
      ></Input><Button title='Add' onPress={addTask}/>
    </SafeAreaView>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

