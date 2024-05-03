import { Schema, model } from "mongoose";

const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      lowercase: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
    },
    age: {
      type: Number,
      min: 18,
      max: 80,
    },
    gender: {
      type: String,
      enum: ["male", "femal"],
      default: "male",
    },
    phone: String,
    isDeleted: {
      type: Boolean,
      default: false,
    },
    profilePic: String,
    profilePicCloud: { secure_url: String, public_id: String },
  },
  { timestamps: true }
);

const User = model("User", userSchema);

export default User;
