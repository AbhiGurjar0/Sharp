const express = require("express");
const User = require("../models/User");
const bcrypt = require("bcryptjs");
const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");

exports.registerUser = async (req, res) => {
  try {
    let { userName, email, password } = req.body;

    if (!userName || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    email = email.toLowerCase();

    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ message: "User already exists" });
    }

    let hashedPassword = await bcrypt.hash(password, 10);

    let newUser = await User.create({
      userName,
      email,
      password: hashedPassword,
    });

    // return res.status(201).json({ message: 'User registered successfully', user: newUser });
    res.redirect("/login");
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

exports.loginUser = async (req, res) => {
  try {
    let { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    email = email.toLowerCase();
    let user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    let isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    let token = jwt.sign(
      { id: user.id, email: user.email },
      "1234",
      { expiresIn: "7d" }
    );
  

    res.cookie("token", token, { httpOnly: true });
    return res.redirect("/");
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

exports.logoutUser = async (req, res) => {
  res.clearCookie("token");
  // res.status(200).json({ message: 'Logout successful' });
  res.redirect("/login");
};
