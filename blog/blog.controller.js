import express from "express";
import {
  isUser,
  isBlogger,
  isGuest,
} from "../middleware/authentication.middleware.js";
import validateReqBody from "../middleware/validate.req.body.js";
import {
  addBlogValidationSchema,
  paginationDataValidationSchema,
} from "./blog.validation.js";
import Blog from "./blog.model.js";
import mongoose from "mongoose";
import validateMongoIdFromParams from "../middleware/validate.mongoid.js";

const router = express.Router();

// List all blogs by pagination (accessible to all users), where the pagination data is provided in the request body
router.post(
  "/blog/read",
  isUser,
  validateReqBody(paginationDataValidationSchema),
  async (req, res) => {
    //extract pagination data from req body
    const { page, limit, searchText } = req.body;

    //calculate skip value
    const skip = (page - 1) * limit;

    //search by searchText if provided
    let match = {};
    if (searchText) {
      match.title = { $regex: searchText, $options: "i" };
    }

    const blogs = await Blog.aggregate([
      {
        $match: match,
      },
      {
        $skip: skip,
      },
      {
        $limit: limit,
      },
      {
        $project: {
          title: 1,
          description: { $substr: ["$description", 0, 50] },
          content: 1,
          author: 1,
          createdAt: 1,
          updatedAt: 1,
        },
      },
    ]);

    return res.status(200).send({
      message: "Here is the list of blogs for you",
      blogList: blogs,
    });
  }
);

// Add blog (for bloggers only)
router.post(
  "/blog/add",
  isBlogger,
  validateReqBody(addBlogValidationSchema),
  async (req, res) => {
    try {
      const newBlog = req.body;
      newBlog.author = req.loggedInUserId;
      await Blog.create(newBlog);
      return res.status(201).send({ message: "Blog posted successfully" });
    } catch (error) {
      return res
        .status(500)
        .send({ message: "Failed to post blog", error: error.message });
    }
  }
);

// Delete blog by id (only by the blogger who posted it)
router.delete(
  "/blog/delete/:id",
  isUser,

  validateMongoIdFromParams,
  async (req, res) => {
    const blogId = req.params.id;
    // Validate blogId as a valid MongoId
    //   if (!mongoose.Types.ObjectId.isValid(blogId)) {
    //     return res.status(400).send({ message: "Invalid blog id" });
    //   }

    // Find blog by id
    const blog = await Blog.findById(blogId);

    if (!blog) {
      return res.status(404).send({ message: "Blog not found" });
    }
    console.log(req.isAdmin);
    // Check if logged in blogger is the author
    if (String(blog.author) !== String(req.loggedInUserId) && !req.isAdmin) {
      return res
        .status(403)
        .send({ message: "You are unauthorized to delete this blog" });
    }

    // Delete blog
    await Blog.findByIdAndDelete(blogId);
    return res.status(200).send({ message: "Blog deleted successfully" });
  }
);

// Edit blog by id (only by the blogger who posted it)
router.put(
  "/blog/edit/:id",
  isBlogger,
  validateMongoIdFromParams,
  validateReqBody(addBlogValidationSchema),
  async (req, res) => {
    const blogId = req.params.id;
    // Find blog by id
    const blog = await Blog.findById(blogId);
    if (!blog) {
      return res.status(404).send({ message: "Blog does not exist." });
    }

    // Check if logged in blogger is the author
    if (String(blog.author) !== String(req.loggedInUserId)) {
      return res
        .status(403)
        .send({ message: "You are unauthorized to edit this blog" });
    }

    // Extract updated values from req body
    const updatedValues = req.body;

    // Update blog
    await Blog.findByIdAndUpdate(blogId, {
      ...updatedValues,
      updatedAt: Date.now(),
    });

    // Send response
    return res.status(200).send({
      message: "Blog is edited successfully",
    });
  }
);

// View blogs by category (guest provides category in URL params)
router.get("/blog/view-by-category/:category", isGuest, async (req, res) => {
  const { category } = req.params;
  if (!category) {
    return res.status(400).send({ message: "Category is required" });
  }
  try {
    const blogs = await Blog.find({ category })
      .populate("author", "name email")
      .sort({ createdAt: -1 });
    return res.status(200).send({ message: "success", blogList: blogs });
  } catch (error) {
    return res
      .status(500)
      .send({ message: "Failed to fetch blogs", error: error.message });
  }
});

// View blogs by blogger (only accessible to the blogger who posted them)
router.post(
  "/blog/blogger/list",
  isBlogger,
  validateReqBody(paginationDataValidationSchema),
  async (req, res) => {
    const { page, limit, searchText } = req.body;
    const skip = (page - 1) * limit;

    // Only fetch blogs by the logged-in blogger
    let match = { author: req.loggedInUserId };
    if (searchText) {
      match.title = { $regex: searchText, $options: "i" };
    }

    const blogList = await Blog.aggregate([
      { $match: match },
      { $skip: skip },
      { $limit: limit },
      {
        $project: {
          title: 1,
          description: { $substr: ["$description", 0, 50] },
          content: 1,
          category: 1,
          createdAt: 1,
          updatedAt: 1,
        },
      },
    ]);

    return res.status(200).send({
      message: "Here is the list of your blogs",
      blogList,
    });
  }
);

export default router;
