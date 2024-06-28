import Todo from "../Todo/Todo";
import { Button, Grid } from "@mui/material";
import { TextField } from "@mui/material";
import styled from "styled-components";
import { useState } from "react";
const GridTop = styled(Grid)`
  margin-top: 30px !important;
  margin-bottom: 30px !important;
`;

const Btn = styled(Button)`
  margin-left: 12px !important;
`;

const Home = () => {
  const [input, setInput] = useState("");
  const [todoList, setTodoList] = useState([]);
  const handleButtonClick = (e) => {
    e.preventDefault();

    setTodoList([...todoList, input]);
    setInput("");
  };

  return (
    <div>
      <h1>Todo App</h1>

      <GridTop container spacing={2} justifyContent="center">
        <Grid item xs={8} sm={8} md={4} lg={4}>
          <TextField
            label="Create Todo"
            id="outlined-size-small"
            variant="outlined"
            size="small"
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          <Btn onClick={handleButtonClick} variant="contained">
            Contained
          </Btn>
        </Grid>
      </GridTop>
      {todoList.map((todo, index) =>
        todo ? <Todo key={index} todo={todo} /> : null
      )}
    </div>
  );
};

export default Home;
