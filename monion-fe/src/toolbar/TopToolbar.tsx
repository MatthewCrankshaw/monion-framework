import { AppBar, Toolbar, Typography } from "@mui/material";
import { TopToolbarProps } from "./TopToolbarProps";

export const TopToolbar = ({ heading, children }: TopToolbarProps) => {
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          {heading}
        </Typography>
        {children}
      </Toolbar>
    </AppBar>
  );
};
