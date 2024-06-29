import { useState } from "react";
import { Grid } from "@mui/material";
import { TextField } from "@mui/material";
import Navbar from "../Navbar/Navbar";
import Todo from "../Todo/Todo";
import axios from "axios"; // Import Axios for HTTP requests
import { useTodoContext } from "../Context/TodoContext";
import { Btn, GridTop, Heading1 } from "./HomeStyled";

const Home = () => {
  const { input, setInput, descInput, setDescInput, addTodo, todos } =
    useTodoContext();

  const handleButtonClick = async (e) => {
    e.preventDefault();

    // Add todo locally first
    addTodo(input, descInput);
    setInput("");
    setDescInput("");

    try {
      // Send POST request to save todo to the backend
      await axios.post("http://localhost:8000/api/todos/", {
        todo: input,
        desc: descInput,
      });
      console.log("Todo saved successfully!");
    } catch (error) {
      console.error("Error saving todo:", error);
    }
  };

  return (
    <div>
      <Navbar />
      <Heading1>Todo App</Heading1>

      <GridTop container spacing={2} justifyContent="center">
        <Grid
          item
          xs={8}
          sm={8}
          md={4}
          lg={4}
          style={{ display: "flex", flexDirection: "row", gap: "10px" }}
        >
          <TextField
            label="Create Todo"
            id="outlined-size-small"
            variant="outlined"
            size="small"
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          <TextField
            label="Description"
            id="outlined-size-small"
            variant="outlined"
            size="small"
            value={descInput}
            onChange={(e) => setDescInput(e.target.value)}
          />
          <Btn
            onClick={handleButtonClick}
            variant="contained"
            style={{
              whiteSpace: "nowrap",
              height: "39px",
              padding: "0px 30px",
            }}
          >
            Add Todo
          </Btn>
        </Grid>
      </GridTop>

      {/* Map through combined todos array */}
      {todos.map((item, index) => (
        <Todo key={index} todo={item.todo} desc={item.desc} />
      ))}
    </div>
  );
};

export default Home;
