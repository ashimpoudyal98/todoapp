// Todo.js

import React, { useState } from "react";
import {
  Paper,
  Grid,
  ListItem,
  IconButton,
  ListItemAvatar,
  Avatar,
  List,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import FormatListBulletedOutlinedIcon from "@mui/icons-material/FormatListBulletedOutlined";
import ListItemText from "@mui/material/ListItemText";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteTodoFn, editTodoFn } from "../Api/api";

const Todo = (props) => {
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [editedTitle, setEditedTitle] = useState("");
  const [editedDescription, setEditedDescription] = useState("");

  const queryClient = useQueryClient();

  const { mutate: deleteTodo, isLoading: deleteLoading } = useMutation({
    mutationFn: deleteTodoFn,
    onSuccess: () => {
      queryClient.invalidateQueries("todos");
      console.log("Todo deleted successfully");
    },
  });

  const { mutate: editTodo, isLoading: editLoading } = useMutation({
    mutationFn: ({ id, updatedTodo }) => editTodoFn(id, updatedTodo),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["todos"] });
      console.log("Todo deleted successfully");
    },
  });

  //  const editTodoFn = async (id, updatedTodo) => {
  //   console.log(id, updatedTodo);

  //   const token = localStorage.getItem("token");
  //   try {
  //     const response = await axios.put(
  //       `http://localhost:8000/api/todos/${id}/`,
  //       updatedTodo, // Directly pass updatedTodo as the payload
  //       {
  //         headers: {
  //           Authorization: `Token ${token}`,
  //         },
  //       }
  //     );
  //     return response.data;
  //   } catch (error) {
  //     console.log(error);
  //     throw new Error("Failed to update todo");
  //   }
  // };

  const handleEditOpen = () => {
    setEditedTitle(props.todo);
    setEditedDescription(props.desc);
    setEditDialogOpen(true);
  };

  const handleEditClose = () => {
    setEditDialogOpen(false);
  };

  const handleSaveEdit = async () => {
    editTodo({
      updatedTodo: { title: editedTitle, description: editedDescription },
      id: props.id,
    });
    setEditDialogOpen(false);
  };

  const handleDelete = () => {
    deleteTodo(props.id);
  };

  return (
    <div>
      <Grid
        style={{ marginTop: "3px" }}
        container
        spacing={3}
        justifyContent="center"
      >
        <Grid item xs={10} sm={10} md={6} lg={6}>
          <Paper elevation={3}>
            <List>
              <ListItem
                secondaryAction={
                  <>
                    <IconButton
                      edge="end"
                      aria-label="edit"
                      onClick={handleEditOpen}
                      sx={{ "&:hover": { backgroundColor: "#4caf50" } }}
                    >
                      <EditOutlinedIcon />
                    </IconButton>
                    <IconButton
                      onClick={handleDelete}
                      edge="end"
                      aria-label="delete"
                      sx={{ "&:hover": { backgroundColor: "#f44336" } }}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </>
                }
              >
                <ListItemAvatar>
                  <Avatar>
                    <FormatListBulletedOutlinedIcon />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText primary={props.todo} secondary={props.desc} />
              </ListItem>
            </List>
          </Paper>
        </Grid>
      </Grid>

      {/* Edit Todo Dialog */}
      <Dialog open={editDialogOpen} onClose={handleEditClose}>
        <DialogTitle>Edit Todo</DialogTitle>
        <DialogContent>
          {/* <TextField
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
          /> */}

          <TextField
            autoFocus
            margin="dense"
            label="Edit Title"
            type="text"
            fullWidth
            name="title"
            value={editedTitle}
            onChange={(e) => setEditedTitle(e.target.value)}
          />
          <TextField
            autoFocus
            margin="dense"
            label="Edit Description"
            type="text"
            fullWidth
            name="description"
            value={editedDescription}
            onChange={(e) => setEditedDescription(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleEditClose}>Cancel</Button>
          <Button onClick={handleSaveEdit} variant="contained" color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default Todo;
