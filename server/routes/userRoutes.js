const express = require("express");
const router = express.Router();
const User = require("../schemas/users");
const config = require("../config");
const jwt = require("jsonwebtoken");
router.post("/signIn", async (req, res) => {
  try {
    const { usernameOrEmail, password } = req.body;
    const user = await User.findOne({
      $or: [{ username: usernameOrEmail }, { email: usernameOrEmail }],
    });

    if (!user || user.password != password) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    // Generate JWT token
    const token = jwt.sign({ userId: user._id }, config.secureKey, {
      expiresIn: "1h", // Token expiration time
    });
    const id = user._id;
    res.status(200).json({ token, id });
  } catch (error) {
    console.error("Error logging in:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Route to create a new user
router.post("/signUp", async (req, res) => {
  try {
    const { firstname, lastname, username, email, password } = req.body;

    // Validate input (add more validation as needed)

    // Check if the email is already registered
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: "Email already exists" });
    }

    //Check if the username is already in use
    const usernameUsed = await User.findOne({ username });
    if (usernameUsed) {
      return res.status(400).json({ error: "Usernam already in use" });
    }

    // Create a new user
    const newUser = new User({
      firstname,
      lastname,
      username,
      email,
      password,
    });

    // Save the user to the database
    await newUser.save();

    // Send a success response
    res.status(201).json({ message: "User created successfully" });
  } catch (error) {
    console.error("Error creating user:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
