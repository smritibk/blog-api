import mongoose from "mongoose";
import { blogCategories } from "../constants/general.constants.js";

//set schema
const blogSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "Title is required"],
    trim: true,
    maxlength: [100, "Title cannot exceed 100 characters"],
  },
  category: {
    type: String,
    required: [true, "Category is required"],
    enum: blogCategories,
  },
  description: {
    type: String,
    required: [true, "Description is required"],
  },
  content: {
    type: String,
    required: [true, "Content is required"],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
  author: {
    type: mongoose.ObjectId,
    ref: "User",
    required: true,
  },
});

//create schema
const Blog = mongoose.model("Blog", blogSchema);

export default Blog;
