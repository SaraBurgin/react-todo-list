import React, { useState } from 'react';
import styled from 'styled-components';

const Container = styled.div`
  background-color: #d3d3d3;

  h1 {
    text-align: center;
    color: #57595d;
    font-weight: bold;
    font-size: 50px;
    margin-top: -10px;
    margin-bottom: 10px;
    padding-top: 20px;
  }
  p {
    display: flex;
    margin-left: 400px;
    align-items: center;
    font-size: 20px;
    font-weight: bold;
    color: #57595d;
  }
  form input {
    margin-left: 550px;
    width: 250px;
    padding-left: 30px;
    padding-right: 30px;
    padding-top: 20px;
    padding-bottom: 20px;
    margin-bottom: 20px;
    text-align: center;
    font-size: 20px;
  }
  button {
    margin-left: 5px;
    padding-left: 10px;
    padding-right: 10px;
    padding-top: 10px;
    padding-bottom: 10px;
    border-radius: 10px;
    background-color: #40e0d0;
    color: #ffffff;
  }
`;

export default function App() {
  const [todos, setTodos] = useState([]);
  const [draft, setDraft] = useState({ id: null, name: '', completed: false });

  function handleChange(event) {
    const newDraft = {
      id: todos.length,
      name: event.target.value,
      completed: false,
    };
    setDraft(newDraft);
  }

  function handleSubmit(event) {
    const newTodos = [draft, ...todos];
    setTodos(newTodos);
    setDraft({ id: null, name: '', completed: false });
    event.preventDefault();
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
            return (
              <div key={todoInList.id}>
                <input
                  value={todoInList.completed}
                  type="checkbox"
                  onChange={() => {
                    setTodos(
                      todos.map(todo => {
                        const newTodo = { ...todo };
                        if (todo.id === todoInList.id) {
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
