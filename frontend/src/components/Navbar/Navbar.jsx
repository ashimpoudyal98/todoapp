import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import { useTodoContext } from "../Context/TodoContext";
import AshimImg from "../../assets/ashim.jpg";
import Person2OutlinedIcon from "@mui/icons-material/Person2Outlined";
import { useTheme } from "@emotion/react";
import styled from "styled-components";

const settings = ["Profile", "Logout"];

function ResponsiveAppBar() {
  const theme = useTheme();
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const { todos } = useTodoContext();

  const numTodos = todos.length;

  console.log(numTodos);

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  // const WelcomeText = styled.p`
  //   @media (min-width: 1000px) {
  //     display: none;
  //     margin-right: 0; /* Remove default margin */
  //     align-items: center;
  //     padding: 0; /* Remove default padding */
  //     font-size: 1rem; /* Adjust font size as needed */
  //   }
  // `;

  return (
    <AppBar position="static">
      <Container
        maxWidth="xl"
        sx={{
          [theme.breakpoints.down("sm")]: {
            display: "flex",
            justifyContent: "space-between",
          },
        }}
      >
        <Toolbar disableGutters>
          {/* Logo (centered) */}
          {/* Logo (centered) */}
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="#app-bar-with-responsive-menu"
            sx={{
              flexGrow: 1,
              textAlign: "center",
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              [theme.breakpoints.down("sm")]: {
                display: "flex", // Hide logo on small screens
                fontSize: "20px",
              },
              textDecoration: "none",
              display: "flex",
            }}
          >
            TODO
          </Typography>

          <Typography
            variant="h6"
            noWrap
            sx={{
              flexGrow: 1,
              textAlign: "center",
              fontFamily: "monospace",
              marginLeft: "160px",
              fontWeight: 700,
              letterSpacing: ".3rem",

              [theme.breakpoints.down("sm")]: {
                fontSize: "15px",
              },

              color: "inherit",
              display: { xs: "flex", md: "flex" },
            }}
          >
            You have {numTodos} todos
          </Typography>

          {/* Profile icon (right-aligned) */}
          <Box
            sx={{
              [theme.breakpoints.down("sm")]: {
                display: "none", // Hide logo on small screens
              },
            }}
          >
            <p>Welcome! Ashim Poudyal </p>
          </Box>
          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton
                onClick={handleOpenUserMenu}
                sx={{ paddingLeft: "10px" }}
              >
                <Avatar alt="Remy Sharp" src={AshimImg} />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: "45px" }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {settings.map((setting) => (
                <MenuItem key={setting} onClick={handleCloseUserMenu}>
                  <Typography textAlign="center">{setting}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default ResponsiveAppBar;
