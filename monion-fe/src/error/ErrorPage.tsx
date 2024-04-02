import React, { ReactElement } from "react";
import { Typography, Container, Box } from "@mui/material";
import { TopToolbar } from "../toolbar/TopToolbar";

export const ErrorPage = (): ReactElement => {
  return (
    <Container maxWidth="lg">
      <Box sx={{ flexGrow: 1 }}>
        <TopToolbar heading="Oops" />
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          height="80vh"
        >
          <Typography variant="h4">Oops! Something went wrong</Typography>
        </Box>
      </Box>
    </Container>
  );
};
