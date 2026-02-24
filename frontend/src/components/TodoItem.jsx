import React from 'react';

function TodoItem({ todo, onToggle, onDelete }) {
  return (
    <li className={todo.completed ? 'completed' : ''}>
      <span onClick={() => onToggle(todo.id, todo.completed)} style={{ cursor: 'pointer' }}>
        {todo.title}
      </span>
      <div className="todo-actions">
        <button onClick={() => onDelete(todo.id)} className="delete-btn">🗑️</button>
      </div>
    </li>
  );
}

export default TodoItem;