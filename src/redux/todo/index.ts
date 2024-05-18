import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';
import api from '../../api';

const initialState = {
  loading: false,
  error: '',
  todo_data: [],
};

export const getTodoData = createAsyncThunk(
  'todos/getTodoData',
  async (_, {rejectWithValue}) => {
    try {
      const res = await api.get('/todos');
      const data = res.data;
      await AsyncStorage.setItem('@tasks', JSON.stringify(data)); // Save to AsyncStorage
      return data;
    } catch (err) {
      return rejectWithValue('Todo data invalid');
    }
  },
);

const todoSlice = createSlice({
  name: 'todo',
  initialState,
  reducers: {
    setTodos: (state, action) => {
      state.todo_data = action.payload;
    },
    editTodo: (state, action) => {
      const updatedTodo = action.payload;
      state.todo_data = state.todo_data.map(todo =>
        todo.id === updatedTodo.id ? updatedTodo : todo,
      );
    },
    deleteTodo: (state, action) => {
      const id = action.payload;
      state.todo_data = state.todo_data.filter(todo => todo.id !== id);
    },
    addTodo: (state, action) => {
      state.todo_data.push(action.payload);
    },
    toggleTodo: (state, action) => {
      const id = action.payload;
      state.todo_data = state.todo_data.map(todo =>
        todo.id === id ? {...todo, checked: !todo.checked} : todo,
      );
    },
  },
  extraReducers: builder => {
    builder
      .addCase(getTodoData.pending, state => {
        state.loading = true;
      })
      .addCase(getTodoData.fulfilled, (state, action) => {
        state.loading = false;
        state.todo_data = action.payload;
      })
      .addCase(getTodoData.rejected, (state, action) => {
        state.loading = false;
        state.todo_data = [];
        state.error = action.payload;
      });
  },
});

export const {setTodos, editTodo, deleteTodo, addTodo, toggleTodo} =
  todoSlice.actions;
export default todoSlice.reducer;
