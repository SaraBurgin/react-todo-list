import React, { useState } from 'react';
import styled from 'styled-components';

const Container = styled.div`
  background-color: #d3d3d3;
  display: grid;
  grid-template-columns: 100vw;
  grid-template-rows: 1fr 2fr 1fr 5fr;
  justify-items: center;
  height: 100vh;

  h1 {
    text-align: center;
    color: #57595d;
    font-weight: bold;
    font-size: 50px;
    font-family: sans-serif;
  }

  form input {
    width: 300px;
    padding: 20px;
    text-align: center;
    align-self: start;
    font-size: 20px;
    border: 4px solid #40e0d0;
    border-radius: 5px;
  }

  form > button {
    padding: 10px;
    border-radius: 10px;
    background-color: #40e0d0;
    margin-left: 10px;
    border: 2px solid #57595d;
    color: #ffffff;
  }

  .todos-list-txt {
    margin-bottom: 20px;
    text-decoration: underline;
    font-size: 30px;
    font-weight: bold;
    color: #57595d;
    font-family: sans-serif;
  }
  
  .individualTodo-container {
    display: grid;
    grid-template-columns: 1fr 1fr 5fr 5fr 2fr;
    grid-template-rows: 1fr;
    justify-items: center;
    margin-bottom: 5px;
    width: 350px;
    height: 60px;
    border: 3px solid #40e0d0;
    border-radius: 7px;
    background-color: #ffffff;

    .todo-checkbox {
      grid-column: 1 / span 2;
      justify-self: center;
      align-self: center;
    }
    .written-todo {
      grid-column: 3 / span 2;
      align-self: center;
      justify-self: center;
      font-size: 20px;
      color: #57595d;
      margin-right: 10px;
      font-weight: bold;
      font-family: sans-serif;
    }  
    .delete-btn {
      grid-column: 5 / span 1;
      align-self: center;
      justify-self: end;
      margin-right: 5px;
      border-radius: 5px;
      font-size: bold;
      text-decoration: none;
      width: 30px;
      height: 30px;
      padding: 7px;
      background-color: #40e0d0;
      border: 2px solid #57595d;
      color: #ffffff;
    }
  }
`;

export default function App() {
  const [todos, setTodos] = useState([]);
  const [draft, setDraft] = useState({ id: null, name: '', completed: false }); //draft is to be able to have control over the information that the user will type before submitting.

  function handleChange(event) {
    const newDraft = {
      id: todos.length,
      name: event.target.value,
      completed: false,
    };
    setDraft(newDraft);
  }

  function handleSubmit(event) {
    const newTodos = [draft, ...todos]; //Making a copy//...= will take everything within the todos object//
    setDraft({ id: null, name: '', completed: false });
    setTodos(newTodos);
    event.preventDefault();
  }

  /* With this function we delete a todo from the list by its id */
  function deleteTodo(id) {
    const newTodos = todos.filter((todo) => todo.id !== id);
    setTodos(newTodos);
  }

  return (
    <>
      <Container>
        <h1>TODOS</h1>
        <form onSubmit={handleSubmit}>
          <input
            placeholder="What needs to be done?"
            type="text"
            onChange={handleChange}
            value={draft.name}
          />
          <button> Add item </button>
          <br></br>
          <p className="todos-list-txt">Todos list:</p>
          <div className="todo-list">
            {todos.map((individualTodo) => {
              //map gives you the possibility of changing the object from string to object for example.
              return (
                <div className="individualTodo-container" key={individualTodo.id}>
                      <input
                      className="todo-checkbox"
                      value={individualTodo.completed}
                      type="checkbox"
                      onChange={() => {
                        setTodos(
                          todos.map((todo) => {
                            const newTodo = { ...todo };
                            if (todo.id === individualTodo.id) {
                              //===  means equal // !== means the opposite
                              if (todo.completed === true) {
                                newTodo.completed = false;
                              } else {
                                newTodo.completed = true;
                              }
                            }
                            return newTodo;
                          }),
                        );
                      }}
                    />
                    <p className="written-todo">{individualTodo.name}</p>
                  <button
                      className="delete-btn"
                      onClick={() => deleteTodo(individualTodo.id)}
                    >
                      x
                  </button>  
                </div>
              );
            })}
          </div>
        </form>
      </Container>
    </>
  );
}
