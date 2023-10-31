import * as Book from "../controller/BooksController.js";
import express from "express";
import { check } from "express-validator";
import { checkToken } from "../middleware/Checktoken.js";

const bookRouter = express.Router();

// add book to database
bookRouter.post(
  "/",
  checkToken,
  [
    check("title", "Title is required").notEmpty(),
    check("author", "Author is required").notEmpty(),
    check("summary", "Summary is required").notEmpty(),
  ],
  Book.addBook
);

// get book by id
bookRouter.get("/:id", checkToken, Book.getBookById);

// get all books
bookRouter.get("/", checkToken, Book.getAllBooks);

// delete book by id
bookRouter.delete("/:id", checkToken, Book.deleteBook);

// update book by id
bookRouter.patch("/:id", checkToken, Book.updateBook);

// search book by title
bookRouter.get("/search/:title", checkToken, Book.filterBooks);

export default bookRouter;
