import React from 'react';

function Todo( {todo, deleteTodo, putTodo} ) {
  return (
    <div className="task">
        <div className="desc">{todo.text}</div>
        <div className="buttons">
          <button className={todo.done === true ? 'active' : ''} onClick={ () => { putTodo(todo) }}>
            <img src="/check-circle.svg" alt="ok"/>
          </button>
          <button className="todoTrashBtn" onClick={ () => { deleteTodo(todo._id) }}>
            <img src="/trash3-fill.svg" alt="x"/>
          </button>
        </div>
    </div>
  );
}

export default Todo;