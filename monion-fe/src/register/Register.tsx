import React, { ReactElement, useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Container,
  Box,
  IconButton,
  TextField,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { useNavigate } from "react-router-dom";

export const Register = (): ReactElement => {
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");

  return (
    <Container maxWidth="lg">
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 2 }}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              Register
            </Typography>
            <Button color="inherit" onClick={() => navigate("/")}>
              Home
            </Button>
          </Toolbar>
        </AppBar>
        <Box
          display="flex"
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
          height="80vh"
        >
          <TextField
            label="Email"
            variant="outlined"
            style={{ marginBottom: "1rem", minWidth: "20rem" }}
            value={email}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setEmail(e.target.value)
            }
          />
          <TextField
            label="Password"
            variant="outlined"
            type="password"
            style={{ marginBottom: "1rem", minWidth: "20rem" }}
            value={password}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setPassword(e.target.value)
            }
          />
          <Button
            variant="contained"
            color="primary"
            style={{ minWidth: "10rem" }}
            onClick={() => {
              fetch("http://localhost:3000/user/register", {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({
                  username: email,
                  password: password,
                }),
              })
                .then((response) => response.json())
                .then((data) => {
                  navigate("/login");
                })
                .catch((error) => {
                  console.log("Error:", error.message);
                });
            }}
          >
            Register
          </Button>
        </Box>
      </Box>
    </Container>
  );
};
