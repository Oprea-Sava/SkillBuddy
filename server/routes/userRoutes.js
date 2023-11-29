const express = require("express");
const router = express.Router();
const User = require("../schemas/users");
const config = require("../config");
const jwt = require("jsonwebtoken");

function getUserId(token) {
  try {
    const decodedToken = JSON.parse(atob(token.split(".")[1]));
    const userId = decodedToken.userId;
    return userId;
  } catch (error) {
    console.error("Error decoding token:", error);
    return null;
  }
}

//Route to sign in the user
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
    res.status(200).json({ token });
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
      return res.status(400).json({ error: "Username already in use" });
    }

    // Create a new user
    const newUser = new User({
      firstname,
      lastname,
      username,
      email,
      password,
      img: "",
      bio: "",
      phone: "",
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
//Route to add course to user
router.put("/:token/addcourse", async (req, res) => {
  const userId = getUserId(req.params.token);
  const course = req.body.course;
  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    if (user.enrolledCourses.includes(course)) {
      return res
        .status(403)
        .json({ error: "User is already enrolled in the course" });
    }
    user.enrolledCourses.push(course);
    await user.save();
    return res.json({ message: "User data updated successfully" });
  } catch (error) {
    console.error("Error creating user:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});
//Route to get all enrolled courses from a user
router.get("/:token/courses", async (req, res) => {
  const userId = getUserId(req.params.token);
  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    const courseIds = user.enrolledCourses;
    res.json(courseIds);
  } catch (error) {
    console.error("Error retrieving enrolled course IDs:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});
//Route to get user information
router.get("/:token", async (req, res) => {
  const userId = getUserId(req.params.token);

  try {
    const user = await User.findById(userId).select("-password");

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    res.json(user);
  } catch (error) {
    console.error("Error retrieving user:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

//Route to update user information
router.put("/:token", async (req, res) => {
  const userId = getUserId(req.params.token);
  const updatedData = req.body;

  //Validate and sanitize data here

  try {
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { $set: updatedData },
      { new: true }
    ).select("-password");
    if (!updatedUser) {
      return res.status(404).json({ error: "User not found" });
    }

    res.json(updatedUser);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
