import mongoose from "mongoose";

const userSchema = mongoose.Schema(
  {
    id: String,
    name: String,
    email: String,
    password: String,
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("User", userSchema);
export default User;
