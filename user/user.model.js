import mongoose from "mongoose";


//set schema
const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    trim: true,
    maxlength: 55,
    unique: true,
    lowercase: true,
  },
  password: {
    type: String,
    require: true,
    trim: true,
  },
  firstName: {
    type: String,
    required: true,
    trim: true,
    maxlength: 30,
  },
  lastName: {
    type: String,
    required: true,
    trim: true,
    maxlength: 30,
  },
  gender: {
    type: String,
    required: true,
    enum: ["male", "female", "other"],
  },
  role: {
    type: String,
    required: true,
    enum: ["admin", "blogger", "guest"],
    default:"guest"
  },
});

//helps to hide or remove password while converting to json
userSchema.methods.toJSON = function () {
  let obj = this.toObject(); //or var obj = this; toObject=> to convert bson to json
  delete obj.password;
  return obj;
};

//create table/collection
const User = mongoose.model("User", userSchema);

export default User;
