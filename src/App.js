import React, { useReducer, useRef } from 'react';
import './style.css';
import * as todos from './todos';
console.log(todos.TODOS);
const initialState = [...todos.TODOS];

const reducer = (state, action) => {
  //add
  //delete
  //complete
  //clear
  if (action.type == 'add') {
    let name = action.value;
    let latestId = 1;
    if (state.length > 0) {
      latestId = Math.max(...state.map((todo) => todo.id)) + 1;
    }

    let s = [...state];
    s.push({
      id: latestId,
      name: name,
      complete: false,
    });

    return s;
  } else if (action.type == 'delete') {
    console.log('delete');
    let id = action.value;
    return [...state].filter((item) => item.id != id);
  } else if (action.type == 'complete') {
    console.log('complete');
    //get the selected item
    //update the state for that specific item
    let id = action.value;
    return [...state].map((item) => {
      if (item.id == id) {
        item.complete = !item.complete;
      }
      return item;
    });
    console.log(action.value);
  } else if (action.type == 'clear') {
    console.log('clear');
    return [];
  }
  return state;
};

export default function App() {
  const [todos, dispatch] = useReducer(reducer, initialState);
  let inputRef = useRef();

  function addTodo(e) {
    e.preventDefault();
    console.log(inputRef.current.value);
    dispatch({
      type: 'add',
      value: inputRef.current.value,
    });
    inputRef.current.value = '';
  }
  const clear = () => {
    dispatch({ type: 'clear' });
  };

  function completeTodo(id) {
    dispatch({
      type: 'complete',
      value: id,
    });
  }

  function deleteTodo(id) {
    dispatch({
      type: 'delete',
      value: id,
    });
  }

  return (
    <div>
      <div className="todo-input">
        <form onSubmit={addTodo}>
          <input
            type="search"
            id="add-todo"
            placeholder="Add Todo..."
            ref={inputRef}
          />
        </form>
      </div>
      <div className="column-container">
        {todos.map((todo) => (
          <div className={`column-item ${todo.complete ? 'completed' : null}`}>
            <div className="flex-container">
              <div className="todo-name" onClick={() => completeTodo(todo.id)}>
                {todo.name}
              </div>
              <div className="todo-delete" onClick={() => deleteTodo(todo.id)}>
                ×
              </div>
            </div>
          </div>
        ))}
      </div>
      <button onClick={clear}>CLEAR TODOS</button>
    </div>
  );
}
