import { AppBar, Button, Toolbar, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import CreateIcon from "@mui/icons-material/Create";

import ToggleThemeBox from "../ToggleTheme";
export default function Header({ handleOpen }) {
  return (
    <AppBar position="static" color="inherit" elevation={1}>
      <Toolbar>
        {/* <IconButton
      size="large"
      edge="start"
      color="inherit"
      aria-label="menu"
      sx={{ mr: 2 }}
    >
      <MenuIcon />
    </IconButton> */}
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          <Link to={"/"}>Blogify</Link>
        </Typography>
        <Button
          onClick={handleOpen}
          color="primary"
          variant="outlined"
          startIcon={<CreateIcon />}
        >
          YENİ YAZI
        </Button>
        <ToggleThemeBox />
      </Toolbar>
    </AppBar>
  );
}
