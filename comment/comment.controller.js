import express from "express";
import {
  isAdmin,
  isGuest,
  isUser,
} from "../middleware/authentication.middleware.js";
import validateReqBody from "../middleware/validate.req.body.js";
import { addCommentValidationSchema } from "./comment.validation.js";
import validateMongoIdFromParams from "../middleware/validate.mongoid.js";
import Comment from "./comment.model.js";

const router = express.Router();

//add comment to a blog by the guest
router.post(
  "/comment/add/:id",
  isGuest,
  validateMongoIdFromParams,
  validateReqBody(addCommentValidationSchema),
  async (req, res) => {
    try {
      const newComment = req.body;
      newComment.guest = req.loggedInUserId;
      newComment.blog = req.params.id;
      const createdComment = await Comment.create(newComment);
      return res.status(201).send({
        message: "Comment added successfully",
        comment: createdComment,
      });
    } catch (error) {
      return res
        .status(500)
        .send({ message: "Failed to post comment", error: error.message });
    }
  }
);

// View all comments for a blog given by id(accessible to all users)
router.get(
  "/comment/view/:id",
  validateMongoIdFromParams,
  isUser,
  async (req, res) => {
    try {
      const blogId = req.params.id;
      const comments = await Comment.find({ blog: blogId })
        .populate("guest", "name email")
        .sort({ createdAt: -1 });
      if (comments.length === 0) {
        return res
          .status(404)
          .send({ message: "No comments found for this blog" });
      }
      return res.status(200).send({
        message: "Comments fetched successfully",
        comments,
      });
    } catch (error) {
      return res.status(500).send({
        message: "Failed to fetch comments",
        error: error.message,
      });
    }
  }
);

// Delete a comment by id (accessible to the user who posted the comment and the admin)
router.delete(
  "/comment/delete/:id",
  validateMongoIdFromParams,
  isUser,
  async (req, res) => {
    try {
      const commentId = req.params.id;
      const comment = await Comment.findById(commentId);

      if (!comment) {
        return res.status(404).send({ message: "Comment not found" });
      }

      // Check if the user is the author of the comment or an admin
    if (String(comment.guest) !== String(req.loggedInUserId) && !req.isAdmin) {
  return res
    .status(403)
    .send({ message: "You are unauthorized to delete this comment" });
}

      await Comment.findByIdAndDelete(commentId);
      return res.status(200).send({ message: "Comment deleted successfully" });
    } catch (error) {
      return res.status(500).send({
        message: "Failed to delete comment",
        error: error.message,
      });
    }
  }
);

// Edit a comment by id (accessible to the user who posted the comment and the admin)
router.put(
  "/comment/edit/:id",
  isGuest,
  validateMongoIdFromParams,
  validateReqBody(addCommentValidationSchema),
  async (req, res) => {
    const commentId = req.params.id;
    // Find comment by id
    const comment = await Comment.findById(commentId);
    if (!comment) {
      return res.status(404).send({ message: "Comment does not exist." });
    }

    // Check if logged in user is the author
    if (String(comment.guest) !== String(req.loggedInUserId)) {
      return res
        .status(403)
        .send({ message: "You are unauthorized to edit this comment" });
    }

    // Extract updated values from req body
    const updatedValues = req.body;

    // Update comment
    await Comment.findByIdAndUpdate(commentId, {
      ...updatedValues,
      updatedAt: Date.now(),
    });

    // Send response
    return res.status(200).send({
      message: "Comment is edited successfully",
    });
  }
);

export default router;
