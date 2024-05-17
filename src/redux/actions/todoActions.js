// src/redux/actions/todoActions.js
import api from "../../api";
// Action types
export const ADD_TODO = 'ADD_TODO';
export const DELETE_TODO = 'DELETE_TODO';

// Action creators
export const addTodo = (todo) => ({
  type: ADD_TODO,
  payload: todo,
});

export const deleteTodo = (todoId) => ({
  type: DELETE_TODO,
  payload: todoId,
});

// Async action to fetch todos from an API
export const fetchTodos = () => {
    return async (dispatch) => {
        try {
        const response = await api.get('/todos');
        console.log(response.data);
        // const todos = await response.json();
        // dispatch(addTodo(todos)); // Dispatch action to update state with fetched todos
        } catch (error) {
        console.error('Error fetching todos:', error);
        }
    };
};