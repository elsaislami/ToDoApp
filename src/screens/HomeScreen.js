import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, Button, FlatList, TouchableOpacity, KeyboardAvoidingView, Modal } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { getTodoData, toggleTodo, addTodo, deleteTodo, editTodo, setTodos } from '../redux/todo';
import { styles } from '../styles/HomeScreenStyles'; // Importing styles from the separate file

const HomeScreen = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [newTodo, setNewTodo] = useState('');
  const [editingTodo, setEditingTodo] = useState(null);
  const [editedTodoText, setEditedTodoText] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [todosPerPage] = useState(10);
  const { todo_data } = useSelector(state => state.todo);

  useEffect(() => {
    const loadTasks = async () => {
      try {
        dispatch(getTodoData());
        if (todo_data === null) {
          const jsonValue = await AsyncStorage.getItem('@tasks');
          dispatch(setTodos(JSON.parse(jsonValue)));
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

  const sortedTodoData = [...todo_data].reverse();
  const indexOfLastTodo = currentPage * todosPerPage;
  const indexOfFirstTodo = indexOfLastTodo - todosPerPage;
  const currentTodos = sortedTodoData.slice(indexOfFirstTodo, indexOfLastTodo);

  const renderFooter = () => (
    <View style={styles.paginationContainer}>
      <TouchableOpacity disabled={currentPage === 1} onPress={() => setCurrentPage(currentPage - 1)} style={styles.nextButton}>
        <Text style={styles.actionButtonText}>{"<"}</Text>
      </TouchableOpacity>
      <Text style={styles.pageNumber}>..{currentPage}..</Text>
      <TouchableOpacity onPress={() => setCurrentPage(currentPage + 1)} style={styles.nextButton}>
        <Text style={styles.actionButtonText}>{">"}</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <KeyboardAvoidingView style={styles.container} behavior="padding">
      <View style={{ display: "flex", flexDirection: "row", justifyContent: "space-between" }}>
        <Text style={styles.title}>Todo List</Text>
        <Button onPress={() => navigation.navigate('Login')} title="Logout" color="#8D6DE5" />
      </View>

      <TextInput
        style={styles.input}
        value={newTodo}
        onChangeText={setNewTodo}
        placeholder="Add new todo"
        placeholderTextColor="#888"
      />
      <Button onPress={handleAddTodo} title="Add" color="#8D6DE5" />
      <FlatList
        data={currentTodos}
        keyExtractor={item => item.id.toString()}
        renderItem={renderTodoItem}
        contentContainerStyle={styles.todoList}
        ListFooterComponent={renderFooter}
      />
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
            placeholderTextColor="#888"
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

export default HomeScreen;

