import express from "express";
import connectDB from "./db.connect.js";
import userRoutes from "./user/user.controller.js";

const app = express();

//to make app understand json
app.use(express.json());

//connect database
await connectDB();

//connect routes
app.use(userRoutes);

//network port and server
const PORT = 8000;

app.listen(PORT, () => {
  console.log(`App is listening on port ${PORT}`);
});
