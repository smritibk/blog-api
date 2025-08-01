import Yup from "yup";

export const userValidationSchema = Yup.object({
  email: Yup.string().email().required().trim().lowercase().max(55),
  password: Yup.string().required(),
  firstName: Yup.string().max(30).required().trim(),
  lastName: Yup.string().max(30).required().trim(),
  gender: Yup.string().trim().required().oneOf(["male", "female", "others"]),

  role: Yup.string().trim().required().oneOf(["admin", "blogger", "reader"]),
});

export const loginUserValidationSchema = Yup.object({
  email: Yup.string().email().required().trim().lowercase(),
  password: Yup.string().required(),
});
