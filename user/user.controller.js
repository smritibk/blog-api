import express from "express";
import {
  loginUserValidationSchema,
  userValidationSchema,
} from "./user.validation.js";
import User from "./user.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import validateReqBody from "../middleware/validate.req.body.js";

const router = express.Router();

//register user
router.post(
  "/user/register",
  // async (req, res, next) => {
  //   //extract data from req body
  //   const data = req.body;

  //   //try validating the body
  //   try {
  //     const validatedData = await userValidationSchema.validate(data);
  //     req.body = validatedData;
  //   } catch (error) {
  //     return res.status(400).send({ message: error.message });
  //   }

  //   //call next function
  //   next();
  // },
  //validating the body from request
  validateReqBody(userValidationSchema),

  async (req, res) => {
    //extracting the data from req body
    const newUser = req.body;

    //checking if the user already exists
    const user = await User.findOne({ email: newUser.email });
    if (user) {
      return res.status(409).send({ message: "User already exists." });
    }

    //hashing the password
    const plainPassword = newUser.password;
    const saltRound = 10;
    const hashedPassword = await bcrypt.hash(plainPassword, saltRound);

    newUser.password = hashedPassword;

    //new user is inserted to the database if all clears
    await User.create(newUser);

    //send response
    return res.status(201).send({
      message: "User is registered successfully",
      user: newUser,
    });
  }
);

//login user
router.post(
  "/user/login",
  validateReqBody(loginUserValidationSchema),
  async (req, res) => {
    //extract login credentials from req body
    const loginCredentials = req.body;

    //find user using email
    const user = await User.findOne({ email: loginCredentials.email });

    //if not user, throw error
    if (!user) {
      return res.status(404).send({
        message: "Invalid credentials",
      });
    }

    //compare password with hashed password using bcrypt
    const plainPassword = loginCredentials.password;
    const hashedPassword = user.password;
    const isPasswordMatch = await bcrypt.compare(plainPassword, hashedPassword);

    //if not password, throw error
    if (!isPasswordMatch) {
      return res.status(404).send({
        message: "Invalid credentials",
      });
    }

    //if password matches, generate token using jwt
    const payload = { email: user.email };
    const secretKey = "thisisasecretkey";
    const token = jwt.sign(payload, secretKey);

    //send response
    return res.status(200).send({
      message: "User is logged in successfully",
      userDetails: user,
      accessToken: token,
    });
  }
);

export default router;
