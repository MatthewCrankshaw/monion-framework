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
  Alert,
  AlertTitle,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { useNavigate } from "react-router-dom";
import { handleRegister } from "../utilities/register/registerHandler";

export const Register = (): ReactElement => {
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [errorMessage, setErrorMessage] = useState<string>("");

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
            <Button color="inherit" onClick={() => navigate("/login")}>
              Login
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
            error={errorMessage !== ""}
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
            error={errorMessage !== ""}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setPassword(e.target.value)
            }
          />
          <Button
            variant="contained"
            color="primary"
            style={{ minWidth: "10rem" }}
            onClick={async () => {
              try {
                await handleRegister(email, password);
                navigate("/login");
              } catch (error: Error | unknown) {
                if (error instanceof Error) {
                  setErrorMessage(error.message);
                } else {
                  setErrorMessage("Failed to register user");
                }
              }
            }}
          >
            Register
          </Button>
          {errorMessage && (
            <Alert
              severity="warning"
              style={{ marginTop: "1rem", minWidth: "20rem" }}
            >
              <AlertTitle>
                The email or password you entered is not valid.
              </AlertTitle>
              <Typography>
                Please enter a valid email address and a password that is at
                least 8 characters long and includes at least one number and one
                special character.
              </Typography>
              <br />
              <strong>Details:</strong> {errorMessage}
            </Alert>
          )}
        </Box>
      </Box>
    </Container>
  );
};
