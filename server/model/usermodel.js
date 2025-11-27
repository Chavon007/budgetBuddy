import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  currency: {
    type: String,
    required: false,
  },
  forgetPassword: {
    type: String,
    required: false,
  },
  resetToken: {
    type: String,
    required: false,
  },
  resetExpires: {
    type: Number,
    required: false,
  },
});

export default mongoose.model("user", userSchema);
