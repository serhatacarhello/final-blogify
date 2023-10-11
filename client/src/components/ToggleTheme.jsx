import { useSelector, useDispatch } from "react-redux";
import { FormGroup, FormControlLabel, Switch } from "@mui/material";

import { toggleTheme } from "../redux-toolkit/theme/ThemeSlice";

// ToggleSwitch component
const ToggleThemeBox = () => {
  // get theme from store
  const theme = useSelector((state) => state.theme);

  // initialize dispatch variable
  const dispatch = useDispatch();
  return (
    <div
      style={{
        marginLeft: "10px",
      }}
    >
      <FormGroup>
        <FormControlLabel
          control={
            <Switch
              checked={theme.darkTheme}
              onChange={() => dispatch(toggleTheme())}
            />
          }
        />
      </FormGroup>
    </div>
  );
};

export default ToggleThemeBox;
