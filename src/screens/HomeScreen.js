import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, FlatList, TouchableOpacity, KeyboardAvoidingView, Modal, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { getTodoData, toggleTodo, addTodo, deleteTodo, editTodo, setTodos } from '../redux/todo';

const HomeScreen = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [newTodo, setNewTodo] = useState('');
  const [editingTodo, setEditingTodo] = useState(null);
  const [editedTodoText, setEditedTodoText] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const { todo_data } = useSelector(state => state.todo);

  useEffect(() => {
    const loadTasks = async () => {
      try {
        const jsonValue = await AsyncStorage.getItem('@tasks');
        if (jsonValue !== null) {
          dispatch(setTodos(JSON.parse(jsonValue)));
        } else {
          dispatch(getTodoData());
        }
      } catch (error) {
        console.error('Error loading tasks from AsyncStorage:', error);
      }
    };
    loadTasks();
  }, [dispatch]);


  const saveTasks = async (tasks) => {
    try {
      const jsonValue = JSON.stringify(tasks);
      await AsyncStorage.setItem('@tasks', jsonValue);
      console.log('Data saved successfully!');
    } catch (error) {
      console.log('Error saving data:', error);
    }
  };

  const handleAddTodo = () => {
    if (newTodo.trim() !== '') {
      const newTask = { id: todo_data.length + 1, title: newTodo, checked: false };
      dispatch(addTodo(newTask));
      saveTasks([...todo_data, newTask]);
      setNewTodo('');
    }
  };

  const handleToggleTodo = (id) => {
    dispatch(toggleTodo(id));
    const updatedTasks = todo_data.map(task => {
      if (task.id === id) {
        return { ...task, checked: !task.checked };
      } else {
        return task;
      }
    });
    saveTasks(updatedTasks);
  };

  const handleDeleteTodo = (id) => {
    dispatch(deleteTodo(id));
    const updatedTasks = todo_data.filter(task => task.id !== id);
    saveTasks(updatedTasks);
  };

  const handleEditTodo = (item) => {
    setEditingTodo(item);
    setEditedTodoText(item.title);
    setModalVisible(true);
  };

  const handleSaveEditedTodo = () => {
    const updatedTodo = { ...editingTodo, title: editedTodoText };
    dispatch(editTodo(updatedTodo));
    const updatedTasks = todo_data.map(task => {
      if (task.id === editingTodo.id) {
        return updatedTodo;
      } else {
        return task;
      }
    });
    saveTasks(updatedTasks);
    setModalVisible(false);
  };

  const renderTodoItem = ({ item }) => {
    return (
      <TouchableOpacity style={styles.todoItem} onPress={() => handleToggleTodo(item.id)}>
        <TouchableOpacity style={[styles.checkbox, item.checked ? styles.checked : null]} onPress={() => handleToggleTodo(item.id)} />
        <View style={styles.todoContent}>
          <Text style={[styles.todoTitle, item.checked ? styles.checkedText : null]}>{item.title}</Text>
        </View>
        <TouchableOpacity style={styles.editButton} onPress={() => handleEditTodo(item)}>
          <Text style={styles.actionButtonText}>Edit</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.deleteButton} onPress={() => handleDeleteTodo(item.id)}>
          <Text style={styles.actionButtonText}>Delete</Text>
        </TouchableOpacity>
      </TouchableOpacity>
    );
  };

  return (
    <KeyboardAvoidingView style={styles.container} behavior="padding">
      <Text style={styles.title}>Todo List</Text>
      <FlatList
        data={todo_data}
        keyExtractor={item => item.id.toString()}
        renderItem={renderTodoItem}
        contentContainerStyle={styles.todoList}
      />
      <TextInput
        style={styles.input}
        value={newTodo}
        onChangeText={setNewTodo}
        placeholder="Add new todo"
      />
       <Button onPress={handleAddTodo} title="Add" />
      <Button onPress={() => navigation.navigate('Login')} title="Logout" />

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <TextInput
            style={styles.modalInput}
            value={editedTodoText}
            onChangeText={setEditedTodoText}
            placeholder="Edit todo"
          />
          <TouchableOpacity style={styles.modalButton} onPress={handleSaveEditedTodo}>
            <Text style={styles.actionButtonText}>Save</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.modalButton} onPress={() => setModalVisible(false)}>
            <Text style={styles.actionButtonText}>Cancel</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  todoList: {
    flexGrow: 1,
    width: '100%',
  },
  todoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  todoContent: {
    flex: 1,
  },
  todoTitle: {
    fontSize: 18,
  },
  checkedText: {
    textDecorationLine: 'line-through',
    color: '#ccc',
  },
  checkbox: {
    width: 20,
    height: 20,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#ccc',
    marginRight: 10,
  },
  checked: {
    backgroundColor: 'blue',
    borderColor: 'blue',
  },
  editButton: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    backgroundColor: 'blue',
    borderRadius: 5,
    marginRight: 5,
  },
  deleteButton: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    backgroundColor: 'red',
    borderRadius: 5,
    marginRight: 5,
  },
  actionButtonText: {
    color: '#fff',
  },
  input: {
    marginBottom: 20,
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalInput: {
    width: '80%',
    marginBottom: 20,
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    backgroundColor: '#fff',
  },
  modalButton: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    backgroundColor: 'black',
    borderRadius: 5,
    marginRight: 5,
  },
});

export default HomeScreen;

