import User from "../user/user.model.js";
import jwt from "jsonwebtoken";

//is user?
export const isUser = async (req, res, next) => {
  try {
    // Extract token from Authorization header
    const { authorization } = req.headers;
    const splittedArray = authorization?.split(" ");
    const token = splittedArray?.length === 2 ? splittedArray[1] : null;

    // If no token, unauthorized
    if (!token) {
      return res.status(401).send({ message: "Unauthorized user" });
    }

    // Use secret key from environment or fallback for development
    const secretKey = "thisisasecretkey";

    // Verify token
    let payload;
    try {
      payload = jwt.verify(token, secretKey);
    } catch (error) {
      return res.status(401).send({ message: "Invalid or expired token" });
    }

    // Find user by email from token payload
    const user = await User.findOne({ email: payload.email });
    if (!user) {
      return res.status(401).send({ message: "User not found" });
    }

    // Attach user._id to request
    req.loggedInUserId = user._id;
    next();
  } catch (error) {
    return res.status(401).send({ message: "Unauthorized user" });
  }
};

//is blogger?
export const isBlogger = async (req, res, next) => {
  try {
    // Extract token from Authorization header
    const { authorization } = req.headers;
    const splittedArray = authorization?.split(" ");
    const token = splittedArray?.length === 2 ? splittedArray[1] : null;

    // If no token, unauthorized
    if (!token) {
      return res.status(401).send({ message: "Unauthorized user" });
    }

    // Use secret key from environment or fallback for development
    const secretKey = "thisisasecretkey";

    // Verify token
    let payload;
    try {
      payload = jwt.verify(token, secretKey);
    } catch (error) {
      return res.status(401).send({ message: "Invalid or expired token" });
    }

    // Find user by email from token payload
    const user = await User.findOne({ email: payload.email });
    if (!user) {
      return res.status(401).send({ message: "User not found" });
    }

    // Check if user role is 'blogger'
    if (user.role !== "blogger") {
      return res.status(403).send({ message: "Forbidden: Not a blogger" });
    }

    // Attach user._id to request
    req.loggedInUserId = user._id;
    next();
  } catch (error) {
    return res.status(401).send({ message: "Unauthorized user" });
  }
};

//is admin?
export const isAdmin = async (req, res, next) => {
  try {
    // Extract token from Authorization header
    const { authorization } = req.headers;
    const splittedArray = authorization?.split(" ");
    const token = splittedArray?.length === 2 ? splittedArray[1] : null;

    // If no token, unauthorized
    if (!token) {
      return res.status(401).send({ message: "Unauthorized user" });
    }

    // Use secret key from environment or fallback for development
    const secretKey = "thisisasecretkey";

    // Verify token
    let payload;
    try {
      payload = jwt.verify(token, secretKey);
    } catch (error) {
      return res.status(401).send({ message: "Invalid or expired token" });
    }

    // Find user by email from token payload
    const user = await User.findOne({ email: payload.email });
    if (!user) {
      return res.status(401).send({ message: "User not found" });
    }

    // Check if user role is 'admin'
    if (user.role !== "admin") {
      return res.status(403).send({ message: "Forbidden: Not an admin" });
    }

    // Attach user._id to request
    req.loggedInUserId = user._id;
    next();
  } catch (error) {
    return res.status(401).send({ message: "Unauthorized user" });
  }
};

//is guest?
export const isGuest = async (req, res, next) => {
  try {
    // Extract token from Authorization header
    const { authorization } = req.headers;
    const splittedArray = authorization?.split(" ");
    const token = splittedArray?.length === 2 ? splittedArray[1] : null;

    // If no token, unauthorized
    if (!token) {
      return res.status(401).send({ message: "Unauthorized user" });
    }

    // Use secret key from environment or fallback for development
    const secretKey = "thisisasecretkey";

    // Verify token
    let payload;
    try {
      payload = jwt.verify(token, secretKey);
    } catch (error) {
      return res.status(401).send({ message: "Invalid or expired token" });
    }

    // Find user by email from token payload
    const user = await User.findOne({ email: payload.email });
    if (!user) {
      return res.status(401).send({ message: "User not found" });
    }

    // Check if user role is 'guest'
    if (user.role !== "guest") {
      return res.status(403).send({ message: "Forbidden: Not a guest" });
    }

    // Attach user._id to request
    req.loggedInUserId = user._id;
    next();
  } catch (error) {
    return res.status(401).send({ message: "Unauthorized user" });
  }
};

// //is user the blogger?
// export const isBlogger = async (req, res, next) => {
//   try {
//     //extract token from req.headers
//     // console.log(req.headers);
//     const { authorization } = req.headers;

//     const splitArray = authorization?.split(" "); //optional chaining
//     // console.log(splitArray);
//     const token = splitArray?.length === 2 ? splitArray[1] : null;
//     // console.log(token);

//     //is not token, throw error
//     if (!token) {
//       throw new Error();
//     }

//     const secretKey = "thisisasecretkey";

//     //verify token
//     const payload = jwt.verify(token, secretKey);

//     //find user using email from payload
//     const user = await User.findOne({
//       email: payload.email,
//     });

//     //if not user found, throw error
//     if (!user) {
//       throw new Error();
//     }

//     //check if user role is "blogger"
//     //if user role is not "blogger", throw error
//     if (user.role !== "blogger") {
//       throw new Error();
//     }

//     //attach admin._id to req
//     req.loggedInUserId = user._id;

//     //call next function
//     next();
//   } catch (error) {
//     return res.status(401).send({ message: "Unauthorized" });
//   }
// };

// //is user the guest
// export const isGuest = async (req, res, next) => {
//   try {
//     //extract token from req.headers
//     // console.log(req.headers);
//     const { authorization } = req.headers;

//     const splitArray = authorization?.split(" "); //optional chaining
//     // console.log(splitArray);
//     const token = splitArray?.length === 2 ? splitArray[1] : null;
//     // console.log(token);

//     //is not token, throw error
//     if (!token) {
//       throw new Error();
//     }

//     const secretKey = "thisisasecretkey";

//     //verify token
//     const payload = jwt.verify(token, secretKey);

//     //find user using email from payload
//     const user = await User.findOne({
//       email: payload.email,
//     });

//     //if not user found, throw error
//     if (!user) {
//       throw new Error();
//     }

//     //check if user role is "guest"
//     //if user role is not "guest", throw error
//     if (user.role !== "guest") {
//       throw new Error();
//     }

//     //attach admin._id to req
//     req.loggedInUserId = user._id;

//     //call next function
//     next();
//   } catch (error) {
//     return res.status(401).send({ message: "Unauthorized" });
//   }
// };
