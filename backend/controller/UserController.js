import User from "../models/Users.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { validationResult } from "express-validator";

// add user to database
export const addUser = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) { 
        console.log(errors);
      return res.status(400).send({ errors: errors.array() });
    } else {
      const { name, email, password } = req.body;
      try {
        let user = await User.findOne({ email });
        if (user) {
          return res
            .status(400)
            .send({ errors: [{ msg: "User already exists" }] });
        }
        user = new User({
          name,
          email,
          password,
        });
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(password, salt);
        await user.save();
        res.status(200).send("User registered");
      } catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error");
      }
    }
    
  };

// login user
export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email }).select("+password");
    if (!user) {
      return res.status(400).send({
        errors: [
          {
            msg: `
        User doesn't exist ${email} plaese register first 
      `,
          },
        ],
      });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).send({ errors: [{ msg: "Invalid credentials" }] });
    }
    const payload = {
      user: {
        id: user.id,
      },
    };
    jwt.sign(
      payload,
      process.env.SECRET_KEY || "secret",
      { expiresIn: 360000 },
      (err, token) => {
        if (err) throw err;
        res.status(200).send({ token });
      }
    );
  } catch (error) {
    res.status(500).send("Server error");
  }
};

// get user by id
export const getUserById = async (req, res) => {
  try {
    const user = await User.findById({
        _id: toString(req.params.id),
    });
    if (!user) {
      res.status(404).send("User not found");
    }
    res.status(200).send(user);
  } catch (error) {
    console.log(error);
    res.status(500).send({
      msg:error.message || "Server error"
    });
  }
};

// get all users
export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).send(users);
  } catch (error) {
    res.status(500).send("Server error");
  }
};

// delete user by id
export const deleteUser = async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) {
      res.status(404).send("User not found");
    }
    res.status(200).send("User deleted");
  } catch (error) {
    res.status(500).send("Server error");
  }
};

// update user by id
export const updateUser = async (req, res) => {
  try {
    const { name, email } = req.body;
    const user = await User.findByIdAndUpdate(req.params.id, {
      name,
      email,
    });
    if (!user) {
      res.status(404).send("User not found");
    }
    res.status(200).send("User updated");
  } catch (error) {
    res.status(500).send("Server error");
  }
};
