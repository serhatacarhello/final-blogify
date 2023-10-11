import React from "react";
import { useSelector } from "react-redux";
import { ThemeProvider } from "@mui/material/styles";
import MainLayout from "./MainLayout";
import { darkTheme, lightTheme } from "./redux-toolkit/theme/theme";

export default function App() {
  // get theme from store
  const theme = useSelector((state) => state.theme);
  console.log("🚀 ~ file: App.js:10 ~ App ~ theme:", theme);

  return (
    <ThemeProvider theme={theme.darkTheme ? darkTheme : lightTheme}>
      <MainLayout />
    </ThemeProvider>
  );
}
