import axios from 'axios';

const apiClient = axios.create({
  baseURL: process.env.REACT_APP_API_URL || 'http://127.0.0.1:8000/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

export interface Todo {
  id: number;
  title: string;
  completed: boolean;
}

export interface TodoCreate {
  title: string;
}

export interface TodoUpdate {
  title?: string;
  completed?: boolean;
}

export const getTodos = () => apiClient.get<Todo[]>('/todos/');
export const createTodo = (todo: TodoCreate) => apiClient.post<Todo>('/todos/', todo);
export const updateTodo = (id: number, todo: TodoUpdate) => apiClient.put<Todo>(`/todos/${id}`, todo);
export const deleteTodo = (id: number) => apiClient.delete(`/todos/${id}`);