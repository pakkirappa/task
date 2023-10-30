import mongoose from "mongoose";

const bookSchema = mongoose.Schema(
  {
    id: String,
    title: String,
    author: String,
    summary: String,
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  {
    timestamps: true,
  }
);

const Book = mongoose.model("Book", bookSchema);

export default Book;
