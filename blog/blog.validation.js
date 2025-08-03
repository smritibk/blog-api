import * as Yup from "yup";
import { blogCategories, DEFAULT_LIMIT, DEFAULT_PAGE } from "../constants/general.constants.js";

export const addBlogValidationSchema = Yup.object({
  title: Yup.string()
    .required("Title is required")
    .trim()
    .max(100, "Title cannot exceed 100 characters"),
  category: Yup.string()
    .required("Category is required")
    .trim().oneOf(blogCategories, "Invalid category"),
  description: Yup.string().required("Description is required").trim(),
  content: Yup.string().required("Content is required").trim(),
});

export const paginationDataValidationSchema = Yup.object({
  page: Yup.number().default(DEFAULT_PAGE).min(1).integer(),
  limit: Yup.number().default(DEFAULT_LIMIT).min(1).integer(),
  searchText: Yup.string().trim().notRequired(),
});

