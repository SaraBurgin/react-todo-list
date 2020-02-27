import React, { useState } from 'react';
import styled from 'styled-components';

const Container = styled.div`
  background-color: #d3d3d3;
  text-align: center;
  display: flex;
  flex-direction: column;

  h1 {
    display: block;
    text-align: center;
    color: #57595d;
    font-weight: bold;
    font-size: 50px;
    margin-top: -10px;
    margin-bottom: 10px;
    padding-top: 20px;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen,
      Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  }

  form input {
    display: inline-block;
    width: 250px;
    padding-left: 30px;
    padding-right: 30px;
    padding-top: 20px;
    padding-bottom: 20px;
    margin-left: 50px;
    text-align: center;
    font-size: 20px;
    border: 4px solid #40e0d0;
  }
  form > button {
    display: inline-block;
    margin-left: 10px;
    padding-left: 10px;
    padding-right: 10px;
    padding-top: 10px;
    padding-bottom: 10px;
    border-radius: 10px;
    background-color: #40e0d0;
    color: #ffffff;
  }
  p {
    display: block;
    text-decoration: underline;
    margin-left: -400px;
    align-items: center;
    font-size: 30px;
    font-weight: bold;
    color: #57595d;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen,
      Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  }
  div > input[type='checkbox'] {
    display: inline-block;
    position: relative;
    width: 20px;
  }

  div {
    display: flex;
    position: relative;
    width: 500px;
    color: #ffffff;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen,
      Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
    font-weight: bold;
    font-size: 25px;
  }

  div > button {
    display: inline-block;
    position: relative;
    border-radius: 10px;
    padding-left: 10px;
    padding-right: 10px;
    padding-top: 10px;
    padding-bottom: 10px;
    background-color: #40e0d0;
    color: #ffffff;
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
    const newTodos = [draft, ...todos]; //Making a copy//...=it will take everything//
    setDraft({ id: null, name: '', completed: false });
    setTodos(newTodos);
    event.preventDefault();
  }

  function deleteTodo(id) {
    const newTodos = todos.filter(todo => todo.id !== id);
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
          <p>List of todos:</p>
          {todos.map(todoInList => {
            //map gives you the possibility of changing the object from string to object for example.
            return (
              <div key={todoInList.id}>
                <button className="x" onClick={() => deleteTodo(todoInList.id)}>
                  x
                </button>
                <input
                  value={todoInList.completed}
                  type="checkbox"
                  onChange={() => {
                    setTodos(
                      todos.map(todo => {
                        const newTodo = { ...todo };
                        if (todo.id === todoInList.id) {
                          //=== : mean equal // !== : the opposite
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
                {todoInList.name}
              </div>
            );
          })}
        </form>
      </Container>
    </>
  );
}
