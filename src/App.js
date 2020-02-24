import React, { useState } from 'react';
import styled from 'styled-components';

const Container = styled.div`
  background-color: #d3d3d3;

  h1 {
    text-align: center;
    color: #ffb6c1;
    font-weight: bold;
    font-size: 50px;
    margin-top: 10px;
    margin-bottom: 10px;
  }
  input {
    margin-left: 545px;
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
    background-color: #ffb6c1;
    color: #ffffff;
  }
`;

export default function App() {
  const [draft, setDraft] = useState('');
  const [todos, setTodos] = useState([]);

  function handleChange(event) {
    setDraft(event.target.value);
  }

  function handleSubmit(event) {
    const newTodos = [draft, ...todos];
    setTodos(newTodos);
    setDraft('');
    event.preventDefault();
  }

  return (
    <>
      <Container>
        <h1>TODOS</h1>
        <form onSubmit={handleSubmit}>
          <input
            onChange={handleChange}
            value={draft}
            placeholder="What needs to be done?"
          />
          <button> Add item </button>
          <br></br>
          Things todo:
          {todos.map((todos, index) => {
            return <div key={index}>{todos}</div>;
          })}
        </form>
      </Container>
    </>
  );
}
