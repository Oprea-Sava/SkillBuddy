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

function toCamelCase(inputString) {
  const words = inputString.split(" ");
  const firstWord = words[0].toLowerCase();
  const camelCasedWords = words
    .slice(1)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1));
  const camelCasedString = [firstWord, ...camelCasedWords].join("");

  return camelCasedString;
}

//Route to sign in the user
router.post("/signIn", async (req, res) => {
  try {
    const { usernameOrEmail, password, rememberMe } = req.body;
    const user = await User.findOne({
      $or: [{ username: usernameOrEmail }, { email: usernameOrEmail }],
    });

    if (!user || user.password != password) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    let expiresIn = "1h";

    if (rememberMe) {
      expiresIn = "30d";
    }
    const token = jwt.sign({ userId: user._id }, config.secureKey, {
      expiresIn: expiresIn,
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

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: "Email already exists" });
    }

    const usernameUsed = await User.findOne({ username });
    if (usernameUsed) {
      return res.status(400).json({ error: "Username already in use" });
    }

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

    await newUser.save();

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

//Route to wishlist a course
router.put("/:token/wishlistcourse", async (req, res) => {
  const userId = getUserId(req.params.token);
  const course = req.body.course;
  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    if (user.wishlistedCourses.includes(course)) {
      user.wishlistedCourses.pull(course);
      await user.save();
      return res.json({ message: "User data updated successfully" });
    } else {
      user.wishlistedCourses.push(course);
      await user.save();
      return res.json({ message: "User data updated successfully" });
    }
  } catch {
    console.error("Error creating user:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

//Route to check if the course is wishlisted
router.put("/:token/checkwishlist", async (req, res) => {
  const userId = getUserId(req.params.token);
  const course = req.body.course;
  let isWishlisted = false;
  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    if (user.wishlistedCourses.includes(course)) {
      isWishlisted = true;
      return res.json(isWishlisted);
    }
    return res.json(isWishlisted);
  } catch {
    console.error("Error creating user:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

//Route to get all enrolled courses from a user
router.get("/:token/courses", async (req, res) => {
  const userId = getUserId(req.params.token);
  const type = toCamelCase(req.query.type);

  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    const courseIds = user[type];
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
