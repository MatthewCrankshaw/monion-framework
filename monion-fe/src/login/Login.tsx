import React, { ReactElement, useEffect, useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Container,
  Box,
  IconButton,
  TextField,
  Alert,
  AlertTitle,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../auth/useAuth";

export const Login = (): ReactElement => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState<string>("");
  const { isAuthenticated, login: performLogin } = useAuth();

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/");
    }
  }, [isAuthenticated, navigate]);

  const login = async () => {
    try {
      await performLogin(username, password);
    } catch (error) {
      if (error instanceof Error) {
        setErrorMessage(error.message);
      } else {
        setErrorMessage("Failed to login");
      }
    }
  };

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
              Login
            </Typography>
            <Button color="inherit" onClick={() => navigate("/")}>
              Home
            </Button>
            <Button color="inherit" onClick={() => navigate("/register")}>
              Register
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
            label="Username"
            variant="outlined"
            error={errorMessage !== ""}
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            style={{ marginBottom: "1rem", minWidth: "20rem" }}
          />
          <TextField
            label="Password"
            variant="outlined"
            error={errorMessage !== ""}
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={{ marginBottom: "1rem", minWidth: "20rem" }}
          />
          <Button
            variant="contained"
            color="primary"
            size="large"
            style={{ minWidth: "10rem" }}
            onClick={login}
          >
            Login
          </Button>
          {errorMessage && (
            <Alert
              severity="warning"
              style={{ marginTop: "1rem", minWidth: "20rem" }}
            >
              <AlertTitle>Failed to login</AlertTitle>
              An error occurred during login. Please try again.
              <br />
              <strong>Details:</strong> {errorMessage}
            </Alert>
          )}
        </Box>
      </Box>
    </Container>
  );
};
