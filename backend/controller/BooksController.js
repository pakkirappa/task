import Book from "../models/Books.js";
import { validationResult } from "express-validator";
import jwt from "jsonwebtoken";

// add book to database
export const addBook = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).send({ errors: errors.array() });
  } else {
    const { title, author, summary } = req.body;
    try {
      let book = await Book.findOne({ title });
      if (book) {
        return res
          .status(400)
          .send({ errors: [{ msg: "Book already exists" }] });
      }
      book = new Book({
        title,
        author,
        summary,
      });
      await book.save();
      res.status(200).send("Book added");
    } catch (e) {
      console.error(e.message);
      res.status(500).send("Server error");
    }
  }
};

// get book by id
export const getBookById = async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    if (!book) {
      return res.status(404).send("Book not found");
    }
    res.status(200).send(book);
  } catch (e) {
    console.error(e.message);
    res.status(500).send("Server error");
  }
};

// get all books
export const getAllBooks = async (req, res) => {
  try {
    const books = await Book.find();
    res.status(200).send(books);
  } catch (e) {
    console.error(e.message);
    res.status(500).send("Server error");
  }
};

// delete book by id
export const deleteBook = async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    if (!book) {
      return res.status(404).send("Book not found");
    }
    await book.remove();
    res.status(200).send("Book deleted");
  } catch (e) {
    console.error(e.message);
    res.status(500).send("Server error");
  }
};

// update book by id
export const updateBook = async (req, res) => {
  const { title, author, summary } = req.body;
  try {
    const book = await Book.findById(req.params.id);
    if (!book) {
      return res.status(404).send("Book not found");
    }
    book.title = title;
    book.author = author;
    book.summary = summary;
    await book.save();
    res.status(200).send("Book updated");
  } catch (e) {
    console.error(e.message);
    res.status(500).send("Server error");
  }
};


