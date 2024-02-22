import mongoose from "mongoose";
import Post from "../models/PostsModel.js";
import User from '../models/UserModel.js';

//Api for get all posts
const getPosts = async (req, res) => {
  try {
    const posts = await Post.find().sort({createdAt : "desc"});
    res.status(200).json({ posts });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

//Api for get all posts
const getUsersPosts = async (req, res) => {

  //check user owns the post
  const user = await User.findById(req.user._id)

  try {
    const userPosts = await Post.find({user: user._id}).sort({createdAt : "desc"});;
    res.status(200).json({ userPosts , email: user.email} );
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

//Api for create a new post
const createPost = async (req, res) => {
  //grab data from the request body 
  const { title, body } = req.body;

  //check if all the fields are not empty
  if (!title || !body) {
    return res.status(400).json({ error: "Please fill all the fields.." });
  }

  //grab the authenticate user from the req body
  const user = await User.findById(req.user._id);

  try {
    const post = await Post.create({user: user._id, title, body });
    res.status(200).json({ success: "Post Created Successfully", post });
  } catch (error) {
    res.status(500).json({ error: "Something went wrong" });
  }
};

//Api for delete a post
const deletePost = async (req, res) => {
  //check if the entered id is valid
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    return res.status(400).json({ error: "Incorrect ID" });
  }

  //check if the post is exist
  const post = await Post.findById(req.params.id);
  if (!post) {
    return res.status(400).json({ error: "Post does not found" });
  }

  //check user owns the post
  const user = await User.findById(req.user._id);
  if (!post.user.equals(user._id)) {
    return res.status(401).json({ error: "You do not own the post" });
  }

  try {
    await post.deleteOne();
    res.status(200).json({ success: "Post was deleted" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updatePost = async (req, res) => {
   //grab data from the request body 
  const { title, body } = req.body;

   //check if all the fields are not empty
   if (!title || !body) {
    return res.status(400).json({ error: "Please fill all the fields.." });
  }

  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    return res.status(400).json({ error: "Incorrect ID" });
  }

  //check if the post is exist
  const post = await Post.findById(req.params.id);
  if (!post) {
    return res.status(400).json({ error: "Post does not found" });
  }

  //check user owns the post
  const user = await User.findById(req.user.id);
  if (!post.user.equals(user._id)) {
    return res.status(401).json({ error: "You do not own the post" });
  }

  try {
    await post.updateOne({ title, body });
    res.status(200).json({ success: "Post was updated" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export { getPosts, createPost, deletePost, updatePost , getUsersPosts };
