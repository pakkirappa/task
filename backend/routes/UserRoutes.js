import * as userController from "../controller/UserController.js";
import express from "express";
import { check } from "express-validator";



const userRouter = express.Router();

// add user to database
userRouter.post(
  "/register",
  [
    check("name", "Name is required").notEmpty(),
    check("email", "Please include a valid email").isEmail(),
    check("password", "Please enter a password with 6 or more characters")
      .isLength({ min: 6 })
      .notEmpty(),
  ],
  userController.addUser
);

// login user
userRouter.post(
  "/login",
 
  userController.loginUser
);

// get user by id
userRouter.get("/:id", userController.getUserById);

// get all users
userRouter.get("/", userController.getAllUsers);

// delete user by id
userRouter.delete("/:id", userController.deleteUser);

// update user by id
userRouter.patch("/:id", userController.updateUser);


export default userRouter;
