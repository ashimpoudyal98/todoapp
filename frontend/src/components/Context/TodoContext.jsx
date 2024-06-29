import React, { createContext, useState, useContext } from "react";

const TodoContext = createContext();

export const TodoProvider = ({ children }) => {
  const [input, setInput] = useState("");
  const [descInput, setDescInput] = useState("");
  const [todos, setTodos] = useState([]);

  const addTodo = (todo, desc) => {
    setTodos([...todos, { todo, desc }]);
  };

  return (
    <TodoContext.Provider
      value={{
        input,
        setInput,
        descInput,
        setDescInput,
        todos,
        addTodo,
      }}
    >
      {children}
    </TodoContext.Provider>
  );
};

export const useTodoContext = () => {
  return useContext(TodoContext);
};
