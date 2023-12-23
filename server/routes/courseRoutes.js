const express = require("express");
const router = express.Router();
const { Course } = require("../schemas/schema");
const client = require("ssh2-sftp-client");
const multer = require("multer");
const config = require("../config");

const schoolServer = {
  host: "info.tm.edu.ro",
  port: "54321",
  username: "toprea",
  password: config.schoolPass,
  remotePath: "/home/toprea/public_html/course_img",
  sourcePath: "/~toprea/course_img",
};

const storage = multer.memoryStorage();

const upload = multer({ storage: storage });

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

//route to upload course img
router.post("/upload/:courseId", upload.single("image"), async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: "No file uploaded" });
  }

  const courseId = req.params.courseId;
  const token = req.headers.authorization.split(" ")[1];
  const userId = getUserId(token);
  console.log(userId);
  try {
    const course = await Course.findById(courseId);
    console.log(course.author == userId);
    if (!course) {
      return res.status(404).json({ error: "Course not found" });
    }
    if (userId != course.author) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    // Update image in MongoDB
    course.img.data = req.file.buffer;
    course.img.contentType = req.file.mimetype;
    await course.save();

    res.status(200).json(course.img.data);
  } catch (error) {
    console.error("Error uploading file:", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
});

//route to get course img
router.get("/image/:courseId", async (req, res) => {
  const courseId = req.params.courseId;
  try {
    const course = await Course.findById(courseId);
    if (!course) {
      return res.status(404).json({ error: "Course not found" });
    }
    if (!course.img.data) {
      return res.status(404).json({ error: "Course doesn't have an image" });
    }
    res.setHeader("Content-Type", course.img.contentType);
    res.status(200).send(course.img.data);
  } catch (error) {
    console.error("Error retrieving file:", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
});

//route to get all id's

router.get("/getall", async (req, res) => {
  try {
    const courses = await Course.find({}, "_id");
    const courseIds = courses.map((course) => course._id);
    res.json(courseIds);
  } catch (error) {
    console.error("Error while retrieving course IDs:", error);
    res.status(500).json({ error: error.message });
  }
});

// create course
router.post("/create", async (req, res) => {
  try {
    const requestData = req.body;
    if (!requestData.title) {
      return res.status(400).json({ error: "Title is required" });
    }
    const token = req.headers.authorization.split(" ")[1];
    const userId = getUserId(token);
    if (!userId) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    const newCourse = new Course({
      requestData,
      author: userId,
    });

    const savedCourse = await newCourse.save();

    res.status(201).json({
      message: "Course created successfully",
      courseId: savedCourse._id,
    });
  } catch (error) {
    console.error("Error creating course:", error);
    if (error.code === 11000) {
      return res.status(400).json({ error: "Course name is already taken." });
    }
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// get course inforation
router.get("/:courseId", async (req, res) => {
  const courseId = req.params.courseId;
  try {
    const course = await Course.findById(courseId).populate("author");

    if (!course) {
      return res.status(404).json({ error: "Course not found" });
    }

    res.json(course);
  } catch (error) {
    console.error("Error retrieving course information:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// edit course
router.put("/:courseId", async (req, res) => {
  const courseId = req.params.courseId;
  const token = req.headers.authorization.split(" ")[1];
  const userId = getUserId(token);
  const course = await Course.findById(courseId);
  if (userId != course.author) {
    return res.status(401).json({ error: "Unauthorized" });
  }
  try {
    const updatedCourse = await Course.findByIdAndUpdate(
      courseId,
      { $set: req.body },
      { new: true }
    );
    if (!updatedCourse) {
      return res.status(404).json({ error: "Course not found" });
    }
    res.status(200).json({ message: "Course updated successfully" });
  } catch {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
