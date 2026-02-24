import React, { useState, useEffect } from 'react';
import * as api from './api';
import TodoItem from './components/TodoItem';
import AddTodoForm from './components/AddTodoForm';
import './index.css';

const App: React.FC = () => {
  const [todos, setTodos] = useState<api.Todo[]>([]);

  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    try {
      const response = await api.getTodos();
      setTodos(response.data);
    } catch (error) {
      console.error("Error fetching todos:", error);
    }
  };

  const handleAddTodo = async (title: string) => {
    try {
      const response = await api.createTodo({ title });
      setTodos([...todos, response.data]);
    } catch (error) {
      console.error("Error adding todo:", error);
    }
  };

  const handleToggleTodo = async (id: number, completed: boolean) => {
    try {
      const response = await api.updateTodo(id, { completed });
      setTodos(todos.map(todo => (todo.id === id ? response.data : todo)));
    } catch (error) {
      console.error("Error updating todo:", error);
    }
  };

  const handleDeleteTodo = async (id: number) => {
    try {
      await api.deleteTodo(id);
      setTodos(todos.filter(todo => todo.id !== id));
    } catch (error) {
      console.error("Error deleting todo:", error);
    }
  };

  return (
    <div className="container">
      <h1>Todo List</h1>
      <AddTodoForm onAdd={handleAddTodo} />
      <div>
        {todos.map(todo => (
          <TodoItem
            key={todo.id}
            todo={todo}
            onToggle={handleToggleTodo}
            onDelete={handleDeleteTodo}
          />
        ))}
      </div>
    </div>
  );
};

export default App;