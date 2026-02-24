import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'http://127.0.0.1:8000',
  headers: {
    'Content-Type': 'application/json',
  },
});

export const getTodos = () => apiClient.get('/todos/');
export const addTodo = (todo) => apiClient.post('/todos/', todo);
export const updateTodo = (id, todo) => apiClient.put(`/todos/${id}`, todo);
export const deleteTodo = (id) => apiClient.delete(`/todos/${id}`);