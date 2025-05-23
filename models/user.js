const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
  {
    fullName: {
      type: String,
      required: true,
      trim: true
    },
    email: {
      type: String,
      unique:true,
      required: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: ['user','admin'],
      default: 'user'
    },
    duration: {
      type: String,
      required: true,
    },
    images: [
      {
        type: String,
        required: true,
      },
    ]
  }
);
const User = mongoose.model("User", userSchema)
module.exports = User;
