import Post from "../models/post.js";

export default async function getPosts(req, res) {
  try {
    //get all posts in db
    const posts = await Post.find();
    res.status(200).json(posts);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
}
export async function getSinglePost(req, res) {
  const { id: _id } = req.params;
  // id as _id  in db because of that assign id to _id
  try {
    //find post with postIn in posts and put it in res.body
    const post = await Post.findById(_id);
    res.status(200).json(post);
  } catch (error) {
    res.status(404).json({
      message: error.message,
    });
  }
}

export async function createPost(req, res) {
  // get post from req body it means send post req with data on req.body
  const post = req.body;
  // create a newPost obj. with Post model
  const newPost = new Post(post);
  console.log("🚀 ~ createPost ~ post:", post);
  try {
    // save newPost to db
    await newPost.save();
    // return newPost as response
    res.status(201).json(newPost);
  } catch (error) {
    res.status(409).json({
      message: error.message,
    });
  }
}

export const deletePost = async (req, res) => {
  const { id: _id } = req.params;

  try {
    const deletedPost = await Post.findByIdAndRemove(_id);
    res.status(201).json(deletedPost);
  } catch (error) {
    res.status(409).json({
      message: error.message,
    });
  }
};

export const updatePost = async (req, res) => {
  const { id: _id } = req.params;
  const post = req.body;
  try {
    const updatedPost = await Post.findByIdAndUpdate(_id, post, { new: true });
    res.status(201).json(updatePost);
  } catch (error) {
    res.status(404).json({
      message: error.message,
    });
  }
};
