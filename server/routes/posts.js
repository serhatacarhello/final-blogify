import express from "express";
import getPosts from "../controllers/posts.js";
import {
  createPost,
  getSinglePost,
  deletePost,
  updatePost,
} from "../controllers/posts.js";

const router = express.Router();
// welcomes req in here and routes it to controller
//http://localhost:5000/posts

router.get("/", getPosts);
router.get("/:id", getSinglePost);
// when post req send create a post // actions
router.post("/", createPost);

router.delete("/:id", deletePost);
router.patch("/:id", updatePost);

export default router;
