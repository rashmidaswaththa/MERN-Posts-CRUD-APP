import express from "express";
import { createPost, deletePost, getPosts, getUsersPosts, updatePost } from "../controllers/postController.js";
import auth from "../middlewears/auth.js";

const router = express.Router();

//Api for get all posts
router.get('/display', getPosts)

//Api for get all posts for user
router.get('/displayAll/user', auth, getUsersPosts)

//Api for create a new post
router.post("/create", auth,  createPost);

//Api for delete a post
router.delete("/delete/:id", auth, deletePost);

//Api for update a post
router.put("/update/:id",auth, updatePost);

export { router as postsRoutes };
