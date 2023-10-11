import { configureStore } from "@reduxjs/toolkit";
import postReducer from "../posts/PostSlice";
import themeReducer from "../theme/ThemeSlice";

const store = configureStore({
  reducer: {
    posts: postReducer,
    theme: themeReducer,
  },
});

export default store;
