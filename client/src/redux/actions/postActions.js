// import * as api from "../../api/index";
// import * as types from "./types";

// // action creator

// // export const fetchPosts = () => {
// //   return {
// //     type: types.FETCH_POSTS,
// //     payload: [],
// //   };
// // };

// // export const createPost = () => {
// //   return {
// //     type: types.CREATE_POST,
// //     payload: post,
// //   };
// // };

// // add dispatch

// export const fetchPosts = () => async (dispatch) => {
//   try {
//     const { data } = await api.fetchPosts();
//     dispatch({
//       type: types.FETCH_POSTS,
//       payload: data,
//     });
//   } catch (error) {
//     console.log(error);
//   }
// };

// export const createPost = (post) => async (dispatch) => {
//   try {
//     const { data } = await api.createPost(post);
//     console.log("🚀 ~ file: postActions.js:37 ~ createPost ~ data:", data);

//     dispatch({
//       type: types.CREATE_POST,
//       payload: data,
//     });
//   } catch (error) {
//     console.log("error", error);
//   }
// };

// export const fetchSinglePost = (id) => async (dispatch) => {
//   try {
//     const { data } = await api.fetchSinglePost(id);
//     console.log("🚀 ~ file: postActions.js:52 ~ fetchSinglePost ~ data:", data);

//     dispatch({
//       type: types.FETCH_SINGLE_POST,
//       payload: data,
//     });
//   } catch (error) {
//     console.log("fetchSinglePost func error.message", error.message);
//   }
// };

// export const deletePost = (id) => async (dispatch) => {
//   try {
//     const { data } = await api.deletePost(id);

//     dispatch({
//       type: types.DELETE_POST,
//       payload: data._id,
//     });
//   } catch (error) {
//     console.log("🚀 ~ file: postActions.js:67 ~ deletePost ~ error:", error);
//   }
// };

// export const updatePost = (id, updatedPost) => async (dispatch) => {
//   // console.log("🚀 ~ file: postActions.js:76 ~ updatePost ~ id:", id)
//   // console.log("🚀 ~ file: postActions.js:76 ~ updatePost ~ updatedPost:", updatedPost)
//   try {
//     const { data } = await api.updatePost(id, updatedPost);
//     dispatch({
//       type: types.UPDATE_POST,
//       payload: data,
//     });
//   } catch (error) {
//     console.log("🚀 ~ file: postActions.js:67 ~ deletePost ~ error:", error);
//   }
// };
