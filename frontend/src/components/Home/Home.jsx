import { useEffect, useState } from "react";
import { Grid } from "@mui/material";
import { TextField } from "@mui/material";
import Navbar from "../Navbar/Navbar";
import Todo from "../Todo/Todo";
import axios from "axios"; // Import Axios for HTTP requests
import { useTodoContext } from "../Context/TodoContext";
import { Btn, GridTop, Heading1 } from "./HomeStyled";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { addTodoFn, fetchTodoFn } from "../Api/api";

const Home = () => {
  const { input, setInput, descInput, setDescInput, addTodo } =
    useTodoContext();
  const queryClient = useQueryClient();

  const { mutate, isLoading } = useMutation({
    mutationFn: addTodoFn,
    onSuccess: () => {
      queryClient.invalidateQueries("todos");
      console.log("todo saved successfully");
    },
  });

  const {
    data: todos,
    isLoading: load,
    isError,
  } = useQuery({ queryKey: ["todos"], queryFn: fetchTodoFn });

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (isError) {
    return <p>Error fetching data.</p>;
  }

  const handleButtonClick = async (e) => {
    e.preventDefault();

    setInput("");
    setDescInput("");

    mutate({ title: input, description: descInput });
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

      {todos &&
        todos.map((item, index) => (
          <Todo key={index} todo={item.title} desc={item.description} />
        ))}
    </div>
  );
};

export default Home;
