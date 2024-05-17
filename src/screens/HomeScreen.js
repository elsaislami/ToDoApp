import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import { fetchTodos } from '../redux/actions/todoActions';
import { useDispatch } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
// import auth from '@react-native-firebase/auth';

const HomeScreen = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [todos, setTodos] = useState([]);
  
  useEffect(()=>{
    dispatch(fetchTodos())    
  },[])

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Todo List</Text>
      <Button onPress={() => navigation.navigate('Login')} title='ckemi' />
    </View>
  );
};

export default HomeScreen;
