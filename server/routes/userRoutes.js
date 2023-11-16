// routes/userRoutes.js
const express = require("express");
const router = express.Router();
const User = require("../schemas/users");

// Route to create a new user
router.post("/create", async (req, res) => {
  try {
    const { firstname, lastname, username, email, password } = req.body;

    // Validate input (add more validation as needed)

    // Check if the email is already registered
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: "Email already exists" });
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
