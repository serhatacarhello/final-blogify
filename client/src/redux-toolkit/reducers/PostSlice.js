import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const apiEndpoint = "http://localhost:5000/posts/";

// async thunk
export const fetchPostsAsync = createAsyncThunk(
  "posts/fetchPosts",
  async () => {
    const response = await axios.get(apiEndpoint);
    return response.data;
  }
);

export const createPostAsync = createAsyncThunk(
  "posts/createPost",
  async (post) => {
    const { data } = await axios.post(apiEndpoint, post);
    return data;
  }
);

export const fetchSinglePostAsync = createAsyncThunk(
  "posts/fetchSinglePost",
  async (id) => {
    const { data } = await axios.get(`${apiEndpoint}${id}`);
    return data;
  }
);

export const updatePostAsync = createAsyncThunk(
  "posts/updatePost",
  async (updatedPost) => {
    const { data } = await axios.patch(
      `${apiEndpoint}${updatedPost._id}`,
      updatedPost
    );
    return data;
  }
);

export const deletePostAsync = createAsyncThunk(
  "posts/deletePost",
  async (id) => {
    const { data } = await axios.delete(`${apiEndpoint}${id}`);
    return data._id;
  }
);

const initialState = {
  posts: [],
  status: "idle",
  error: null,
  currentPost: null,
};

export const postSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPostsAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchPostsAsync.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.posts = action.payload;
      })
      .addCase(fetchPostsAsync.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      //ADD POST
      .addCase(createPostAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(createPostAsync.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.posts.push(action.payload);
      })
      .addCase(createPostAsync.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      //FETCH SINGLE POST
      .addCase(fetchSinglePostAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchSinglePostAsync.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.currentPost = action.payload;
      })
      .addCase(fetchSinglePostAsync.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(updatePostAsync.fulfilled, (state, action) => {
        state.status = "succeeded";
        const updatedPost = action.payload;
        console.log(
          "🚀 ~ file: PostSlice.js:91 ~ .addCase ~ updatedPost:",
          updatedPost
        );
        const index = state.posts.findIndex((post) => {
          console.log("🚀 ~ file: PostSlice.js:95 ~ .addCase ~ post:", post);
          return post.id === updatedPost._id;
        });
        if (index !== -1) {
          state.posts[index] = updatedPost;
        }
        state.currentPost = updatedPost;
      })
      .addCase(deletePostAsync.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.posts = state.posts.filter((post) => post._id !== action.payload);
      });
  },
});

export default postSlice.reducer;
