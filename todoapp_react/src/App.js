import React, { useState, useEffect } from 'react';
import './App.css';
import FilterAndForm from './components/FilterAndForm';
import Todos from './components/Todos';

//Start app -> npm start

function App() {
  const [inputText, setInputText] = useState("");
  const [todos, setTodos] = useState([]);
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    async function getTodo() {
      const res = await fetch('http://localhost:4000/api/todos');
      setTodos(await res.json());
    }
    getTodo();
	}, [])

	async function postTodo() {
		const res = await fetch(`http://localhost:4000/api/todos/`, {
			headers: { 'Content-Type': 'application/json' },
      method: 'POST',
      body: JSON.stringify({
				text: inputText,
				done: false 
			})
		})
		setTodos(await res.json());
	}

	async function putTodo(todo) {
	const res =	await fetch(`http://localhost:4000/api/todos/${todo._id}`,
    {
			headers: { 'Content-Type': 'application/json' },
      method: 'PUT',
      body: JSON.stringify({
				text: todo.text,
				done: !todo.done
			})
    })
		setTodos(await res.json());
	}

	async function deleteTodo(id) {
		const res = await fetch(`http://localhost:4000/api/todos/${id}`, 
			{ 
				method: 'DELETE' 
			})
      setTodos(await res.json());
	}

  return (
    <div className="container">
      <header>TODO'er</header>
      <div className="todo">
        <FilterAndForm 
          todos={todos} 
          setTodos={setTodos} 
          inputText={inputText} 
          setInputText={setInputText}
          postTodo={postTodo}
          filter={filter}
          setFilter={setFilter}
        />
        <Todos 
          todos={todos} 
          setTodos={setTodos}
          deleteTodo={deleteTodo}
          putTodo={putTodo}
          filter={filter}
        />
      </div>
  </div>
  );
}

export default App;
