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

const Todo = (props) => {
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [editedTodo, setEditedTodo] = useState(props.todo);

  const handleEditOpen = () => {
    setEditDialogOpen(true);
  };

  const handleEditClose = () => {
    setEditDialogOpen(false);
  };

  const handleTodoChange = (event) => {
    setEditedTodo(event.target.value);
  };

  const handleSaveEdit = () => {
    // Handle saving the edited todo
    console.log("Edited todo:", editedTodo);

    // Close the edit dialog
    setEditDialogOpen(false);
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
          <TextField
            autoFocus
            margin="dense"
            label="Edit Todo"
            type="text"
            fullWidth
            value={editedTodo}
            onChange={handleTodoChange}
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
