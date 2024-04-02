import React, { ReactElement } from "react";
import { Typography, Container, Box, Button } from "@mui/material";
import { TopToolbar } from "../toolbar/TopToolbar";
import { useAuth } from "../auth/useAuth";

export const Home = (): ReactElement => {
  const { logout: performLogout } = useAuth();

  return (
    <Container maxWidth="lg">
      <Box sx={{ flexGrow: 1 }}>
        <TopToolbar heading="Home">
          <Button color="inherit" onClick={async () => await performLogout()}>
            Logout
          </Button>
        </TopToolbar>
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          height="80vh"
        >
          <Typography variant="h4">Home</Typography>
        </Box>
      </Box>
    </Container>
  );
};
