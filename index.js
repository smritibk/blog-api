import express from "express";
import connectDB from "./db.connect.js";
import userRoutes from "./user/user.controller.js";
import blogRoutes from "./blog/blog.controller.js";

const app = express();

//to make app understand json
app.use(express.json());

//connect database
await connectDB();

//connect routes
app.use(userRoutes);
app.use(blogRoutes);

//network port and server
const PORT = 8000;

app.listen(PORT, () => {
  console.log(`App is listening on port ${PORT}`);
});
