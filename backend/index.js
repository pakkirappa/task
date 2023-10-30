import express from "express";
// import bodyParser from "body-parser";
import cors from "cors";
import mongoose from "mongoose";
import userRouter from "./routes/UserRoutes.js";
import bookRouter from "./routes/BooksRoutes.js";
import morgan from "morgan";

const app = express();

app.use(express.json());
app.use(cors());
app.use(morgan("dev"));

app.get("/", (req, res) => {
  res.send("Hello to Book Store API");
});

const CONNECTION_URL =
  process.env.MONGODB_URI || "mongodb://localhost:27017/BookStore";
const PORT = process.env.PORT || 5000;

// app.listen(PORT, () => console.log(`Server running on port: ${PORT}`));
mongoose
  .connect(CONNECTION_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() =>
    app.listen(PORT, () => console.log(`Server running on port: ${PORT}`))
  )
  .catch((error) => console.log(error.message));

// routes
app.use("/api/v1/users", userRouter);
app.use("/api/v1/books", bookRouter);
