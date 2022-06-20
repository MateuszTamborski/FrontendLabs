import React from 'react';

function FilterAndForm({ inputText, setInputText, postTodo, filter, setFilter }) {
  const inputTextHandler = (e) => {
    setInputText(e.target.value);
  };

  const addTodo = (e) => {
    e.preventDefault();
    postTodo();
    setInputText("");
  }

  return (
    <div>
      <div className="filters">
        <button className={filter === 'all' ? 'active' : ''} onClick={() => { setFilter('all') }}>All</button>
        <button className={filter === 'completed' ? 'active' : ''} onClick={() => { setFilter('completed') }}>Completed</button>
        <button className={filter === 'incomplete' ? 'active' : ''} onClick={() => { setFilter('incomplete') }}>Incomplete</button>
      </div>

      <div className="form">
        <input
          value={inputText}
          onChange={inputTextHandler}
          type="text"
          placeholder="To do"
        />
        <button onClick={addTodo} disabled={inputText.length === 0}>Add</button>
      </div>
    </div>
  );
}

export default FilterAndForm;