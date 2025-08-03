import mongoose from "mongoose";

const commentSchema = new mongoose.Schema({
  content: { 
    type: String, 
    required: true ,
    trim: true,
    maxlength: [200, "Content cannot exceed 200 characters"],
  },
  guest: { 
    type: mongoose.ObjectId, 
    ref: "User", 
    required: true 
  },
  blog: { 
    type: mongoose.ObjectId, 
    ref: "Blog", 
    required: true 
  },
  createdAt: { 
    type: Date, 
    default: Date.now 
  },
});

// Create Comment model
const Comment = mongoose.model("Comment", commentSchema);

export default Comment;
