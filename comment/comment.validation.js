import Yup from "yup";

export const addCommentValidationSchema = Yup.object({
  content: Yup.string()
    .required("Content is required")
    .trim()
    .max(200, "Content cannot exceed 200 characters")
});