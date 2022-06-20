import React from 'react';
import Todo from './Todo';

function filterTodos(todos, filter) {
  switch (filter) {
    case "completed":
      return todos.filter((todo) => todo.done);
    case "incomplete":
      return todos.filter((todo) => !todo.done);
    default:
      return todos;
  }
}

function Todos({ todos, deleteTodo, putTodo, filter }) {
  return (
    <div className="tasks">
      {filterTodos(todos, filter).map((todo) => (
        <Todo
          key={todo._id}
          todo={todo}
          deleteTodo={deleteTodo}
          putTodo={putTodo}
        />
      ))}
    </div>
  );
}

export default Todos;