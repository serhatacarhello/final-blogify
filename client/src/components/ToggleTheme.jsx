import { useSelector, useDispatch } from "react-redux";
import { toggleTheme } from "../redux-toolkit/theme/ThemeSlice";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import React, { useCallback } from "react";
import { IconButton } from "@mui/material";

const ToggleThemeBox = () => {
  const isDarkTheme = useSelector((state) => state.theme.darkTheme);
  const dispatch = useDispatch();

  // useCallback hook is used to memoize the changeTheme function
  const changeTheme = useCallback(() => {
    dispatch(toggleTheme());
  }, [dispatch]);

  return (
    <>
      <div style={{ marginLeft: "10px" }}>
        <IconButton sx={{ ml: 1 }} onClick={changeTheme} color="inherit">
          {isDarkTheme === true ? <Brightness7Icon /> : <Brightness4Icon />}
        </IconButton>
      </div>
    </>
  );
};

export default ToggleThemeBox;
