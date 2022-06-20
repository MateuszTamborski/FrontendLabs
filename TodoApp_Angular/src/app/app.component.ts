import { Component, OnInit } from '@angular/core';
import { Todo } from './models/Todo';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  
  todos!:Todo[];
  inputText:string = "";
  filter:string = "all";

  constructor() { }

  ngOnInit(): void {
    this.getTodo();
  }

  async getTodo() {
    const res = await fetch('http://localhost:4000/api/todos');
    this.todos = await res.json();
  }

  async postTodo(todoText: string) {
    const res = await fetch(`http://localhost:4000/api/todos/`, {
      headers: { 'Content-Type': 'application/json' },
      method: 'POST',
      body: JSON.stringify({
				text: todoText,
				done: false 
			})
		});
		this.todos = await res.json();
    this.inputText = "";
  }

  async putTodo(todo: Todo) {
    const res =	await fetch(`http://localhost:4000/api/todos/${todo._id}`,
    {
			headers: { 'Content-Type': 'application/json' },
      method: 'PUT',
      body: JSON.stringify({
				text: todo.text,
				done: !todo.done
			})
    });
		this.todos = await res.json();
	}

  async deleteTodo(id: string) {
    const res = await fetch(`http://localhost:4000/api/todos/${id}`, 
    { 
      method: 'DELETE' 
    });
  this.todos = await res.json();
  }

  filterTodos(todos: Todo[], filter: string) {
    switch(filter) {
      case 'completed':
        return todos.filter((todo) => todo.done);
      case 'incomplete':
        return todos.filter((todo) => !todo.done);
      default: 
        return todos;
    }
  }

}
