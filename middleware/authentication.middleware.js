import User from "../user/user.model.js";

//check the validity of the user
export const isUser = async (req, res, next) => {
  //extract token from req header
  // console.log(req.headers.authorization);
  const authorization = req.headers.authorization;
  const splittedArray = authorization.split(" ");
  const token = splittedArray[1];
  // console.log(token);

  //if not token, throw error
  if (!token) {
    return res.status(401).send({ message: "Unauthorized user" });
  }

  let payload;
  //decrypt token
  try {
    const secretKey = "thisisasecretkey";
    payload = jwt.verify(token, secretKey);
    // console.log(payload);
  } catch (error) {
    return res.status(401).send({ message: "Unauthorized user" });
  }

  //find user using id from payload
  const user = await User.findOne({ email: payload.email });

  //if user not found, throw error
  if (!user) {
    return res.status(401).send({ message: "Unauthorized user" });
  }

  req.loggedInUserId = user._id;

  //call next() function
  next();
};

//is user the admin?
export const isAdmin = async (req, res, next) => {
  try {
    //extract token from req.headers
    // console.log(req.headers);
    const { authorization } = req.headers;

    const splitArray = authorization?.split(" "); //optional chaining
    // console.log(splitArray);
    const token = splitArray?.length === 2 ? splitArray[1] : null;
    // console.log(token);

    //is not token, throw error
    if (!token) {
      throw new Error();
    }

    const secretKey = "thisisasecretkey";

    //verify token
    const payload = jwt.verify(token, secretKey);

    //find user using email from payload
    const user = await User.findOne({
      email: payload.email,
    });

    //if not user found, throw error
    if (!user) {
      throw new Error();
    }

    //check if user role is "admin"
    //if user role is not "admin", throw error
    if (user.role !== "admin") {
      throw new Error();
    }

    //attach admin._id to req
    req.loggedInUserId = user._id;

    //call next function
    next();
  } catch (error) {
    return res.status(401).send({ message: "Unauthorized" });
  }
};

//is user the blogger?
export const isBlogger = async (req, res, next) => {
  try {
    //extract token from req.headers
    // console.log(req.headers);
    const { authorization } = req.headers;

    const splitArray = authorization?.split(" "); //optional chaining
    // console.log(splitArray);
    const token = splitArray?.length === 2 ? splitArray[1] : null;
    // console.log(token);

    //is not token, throw error
    if (!token) {
      throw new Error();
    }

    const secretKey = "thisisasecretkey";

    //verify token
    const payload = jwt.verify(token, secretKey);

    //find user using email from payload
    const user = await User.findOne({
      email: payload.email,
    });

    //if not user found, throw error
    if (!user) {
      throw new Error();
    }

    //check if user role is "blogger"
    //if user role is not "blogger", throw error
    if (user.role !== "blogger") {
      throw new Error();
    }

    //attach admin._id to req
    req.loggedInUserId = user._id;

    //call next function
    next();
  } catch (error) {
    return res.status(401).send({ message: "Unauthorized" });
  }
};

//is user the guest
export const isGuest = async (req, res, next) => {
  try {
    //extract token from req.headers
    // console.log(req.headers);
    const { authorization } = req.headers;

    const splitArray = authorization?.split(" "); //optional chaining
    // console.log(splitArray);
    const token = splitArray?.length === 2 ? splitArray[1] : null;
    // console.log(token);

    //is not token, throw error
    if (!token) {
      throw new Error();
    }

    const secretKey = "thisisasecretkey";

    //verify token
    const payload = jwt.verify(token, secretKey);

    //find user using email from payload
    const user = await User.findOne({
      email: payload.email,
    });

    //if not user found, throw error
    if (!user) {
      throw new Error();
    }

    //check if user role is "guest"
    //if user role is not "guest", throw error
    if (user.role !== "guest") {
      throw new Error();
    }

    //attach admin._id to req
    req.loggedInUserId = user._id;

    //call next function
    next();
  } catch (error) {
    return res.status(401).send({ message: "Unauthorized" });
  }
};
