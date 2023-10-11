import React from "react";
import { useSelector } from "react-redux";
import { ThemeProvider } from "@mui/material/styles";
import MainLayout from "./MainLayout";
import { darkTheme, lightTheme } from "./redux-toolkit/theme/theme";

export default function App() {
  // get theme from store
  const isDarkTheme = useSelector((state) => state.theme.darkTheme);
  console.log("🚀 ~ file: App.js:10 ~ App ~ theme:", isDarkTheme);

  return (
    <ThemeProvider theme={isDarkTheme ? darkTheme : lightTheme}>
      <MainLayout />
    </ThemeProvider>
  );
}
