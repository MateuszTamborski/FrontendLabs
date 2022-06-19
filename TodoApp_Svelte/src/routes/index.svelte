<script>
	import { onMount } from 'svelte'

  let todos = []
  let task = "";
	let filter='all';

	onMount(async () => {
		const response = await fetch('http://localhost:4000/api/todos')
		todos = await response.json()
	})

	async function postTodo() {
		const res = await fetch(`http://localhost:4000/api/todos/`, {
			headers: { 'Content-Type': 'application/json' },
      method: 'POST',
      body: JSON.stringify({
				text: task,
				done: false 
			})
		})
		await res.json()
	}

	async function putTodo(id, i) {
	const res =	await fetch(`http://localhost:4000/api/todos/${id}`,
    {
			headers: { 'Content-Type': 'application/json' },
      method: 'PUT',
      body: JSON.stringify({
				text: todos[i].task,
				done: !todos[i].done
			})
    })
		await res.json()
	}

	async function deleteTodo(id) {
		const res = await fetch(`http://localhost:4000/api/todos/${id}`, 
			{ 
				method: 'DELETE' 
			})
		await res.json()
	}

	function addTask() {
		postTodo()
		
		todos = [{
			text: task,
			done: false
		}, ...todos];

		task = "";
	}

	function markComplete(id, i){
		putTodo(id, i)
		todos[i].done = !todos[i].done
		todos = [...todos];
	}

	function removeTask(id, i){
		deleteTodo(id)
		todos.splice(i,1);
		todos = [...todos];
	}

</script>
  
<style>
	:global(body) {
		 margin: 0; 
		 padding: 0; 
		 box-sizing: border-box;
	}

	.container {
		height: 100vh;
		width: 100vw;
		background-color: rgb(192, 192, 192);
		font-family: 'Fira Code', monospace;
	}

	header {
		text-align: center;
		padding: 30px 20px;
		font-size: xx-large;
	}

	.todo {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}

	button {
		font-family: 'Fira Code', monospace;
	}

	.filters {
		width: 335px;
		display: flex;
		flex-direction: row;
		justify-content: space-evenly;
	}

	.filters button {
		border: 0;
		border-radius: 5px;
		padding: 10px;
		background-color: #3dc2ff;
		box-shadow: 0 0 15px 4px rgba(0,0,0,0.06);
		font-weight: bold;
	}

	.filters button:hover {
		background-color: #297ea8;
	}

	.form {
		margin: 20px 5px;
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		width: 335px;
	}

	.form input {
  	padding: 10px;
		border: 0;
		box-shadow: 0 0 15px 4px rgba(0,0,0,0.06);
		border-radius: 5px;
		font-family: 'Fira Code', monospace;
		width: 250px;
	}

	.form button {
		border: 0;
		border-radius: 5px;
		padding: 10px;
		background-color: #3dc2ff;
		box-shadow: 0 0 15px 4px rgba(0,0,0,0.06);
		font-weight: bold;
	}

	.form button:hover {
		background-color: #297ea8;
	}

	.tasks > .task {
		margin: 10px 0px;
		padding: 5px;
		display: flex;
		justify-content: space-between;
		align-items: center;
		box-shadow: 0 0 15px 4px rgba(0,0,0,0.06);
		width: 325px;
		border: 0;
		border-radius: 5px;
		background-color: #fff;
	}

	.tasks > .task > .desc {
		max-width: 300px;
	}

	.tasks > .task > .buttons {
		display: flex;
		flex-direction: row;
	}

	.tasks > .task > div > button {
		display: flex;
		align-items: center;
		justify-content: center;
		width:25px;
		height:25px;
		border: 0;
		background-color:#ffffff;
		margin:0px 5px;
		cursor:pointer;
	}

	.tasks > .task > div > button.active {
		border-radius: 50%;
		background:#16da16;
	}

</style>

<div class="container">
	<header>TODO'er</header>
	<div class="todo">

		<div class="filters">
			<button class="{filter == 'all' ? 'active' : ''}" on:click={() => {filter = 'all'}}>All</button>
			<button class="{filter == 'completed' ? 'active' : ''}" on:click={() => {filter = 'completed'}}>Completed</button>
			<button class="{filter == 'incomplete' ? 'active' : ''}" on:click={() => {filter = 'incomplete'}}>Incomplete</button>
		</div>

		<div class="form">
			<input type="text" placeholder="To do" bind:value = {task}/>
			<button on:click={addTask} disabled={task.length === 0}>Add</button>
		</div>

		<div class="tasks">
			{#each todos as todo, i}
				{#if filter=='all'}
					<div class="task">
						<div class="desc">{todo.text}</div>
						<div class="buttons">
							<button class="{todo.done == true ? 'active' : ''}" on:click={ () => { markComplete(todo._id, i) }}>
								<img src="/check-circle.svg" alt="ok"/>
							</button>
							<button on:click={() => { removeTask(todo._id, i)}}>
								<img src="/trash3-fill.svg" alt="x"/>
							</button>
						</div>
					</div>
				{:else if filter == 'completed'}
					{#if todo.done == true}
						<div class="task">
							<div class="desc">{todo.text}</div>
							<div class="buttons">
								<button on:click={() => {removeTask(todo._id, i)}}>
									<img src="/trash3-fill.svg" alt="x"/>
								</button>
							</div>
						</div>
					{/if}
				{:else}
					{#if todo.status == false}
						<div class="task">
							<div class="desc">{todo.text}</div>
							<div class="buttons">
								<button class="{todo.done == true ? 'active' : ''}" on:click={ () => { markComplete(todo._id, i) }}>
									<img src="/check-circle-fill.svg" alt="ok"/>
								</button>
							</div>
						</div>
					{/if}
				{/if}
			{/each}
		</div>

	</div>
</div>