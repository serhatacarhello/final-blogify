# To watch server changes

install a library
`npm i -g nodemon`

and change script

`"start": "node index.js"`

to

` "start": "nodemon index.js"`

and again

` npm run start`

# to use .env properties

`npm i --save dotenv`

# be carefull for .js when import process

1-create a router for req ìn routes/posts.js

`router.delete("/:id", deletePost);`

2-create a controller in controllers/post.js

````
export const deletePost = async (req, res) => {
  const { id: _id } = req.params;
  console.log(_id, "dleletepost");

  try {
    const deletedPost = await Post.findByIdAndRemove(_id);
  } catch (error) {
    res.status(409).json({
      message: error.message,
    });
  }
};```
3-and import controller func in routes

```import { createPost, getSinglePost, deletePost } from "../controllers/posts.js";```
````
