import { createSlice } from "@reduxjs/toolkit";

const savedTheme = JSON.parse(localStorage.getItem("theme"));

export const themeSlice = createSlice({
  name: "theme",
  initialState: {
    darkTheme: savedTheme !== null ? savedTheme : false,
  },
  reducers: {
    toggleTheme: (state) => {
      state.darkTheme = !state.darkTheme;
      localStorage.setItem("theme", JSON.stringify(state.darkTheme));
    },
  },
});

export const { toggleTheme } = themeSlice.actions;

export default themeSlice.reducer;
