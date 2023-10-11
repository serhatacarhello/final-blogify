import { configureStore } from "@reduxjs/toolkit";
import postReducer from "../reducers/PostSlice";

const store = configureStore({
  reducer: {
    posts: postReducer,
  },
});

export default store;
