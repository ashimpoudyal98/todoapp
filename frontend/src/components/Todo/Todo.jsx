import {
  Paper,
  Grid,
  ListItem,
  IconButton,
  ListItemAvatar,
  Avatar,
  List,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import FolderIcon from "@mui/icons-material/Folder";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";

import ListItemText from "@mui/material/ListItemText";

import React from "react";

function generate(element) {
  return [0].map((value) =>
    React.cloneElement(element, {
      key: value,
    })
  );
}

const Todo = (props) => {
  return (
    <div>
      {" "}
      <Grid
        style={{ marginTop: "3px" }}
        container
        spacing={3}
        justifyContent="center"
      >
        <Grid item xs={10} sm={10} md={6} lg={6}>
          <Paper elevation={3}>
            <List>
              {generate(
                <ListItem
                  secondaryAction={
                    <>
                      <IconButton edge="end" aria-label="edit">
                        <EditOutlinedIcon />
                      </IconButton>
                      <IconButton edge="end" aria-label="delete">
                        <DeleteIcon />
                      </IconButton>
                    </>
                  }
                >
                  <ListItemAvatar>
                    <Avatar>
                      <FolderIcon />
                    </Avatar>
                  </ListItemAvatar>
                  {<ListItemText primary={props.todo} />}
                </ListItem>
              )}
            </List>
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
};

export default Todo;
