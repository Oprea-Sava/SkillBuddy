const express = require("express");
const router = express.Router();
const Course = require("../schemas/courses");

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
    const { title, description, author } = req.body;
    const course = await Course.findOne({ title: title });
    if (course) {
      return res.status(400).json({ error: "Course name is already taken." });
    }

    const newCourse = new Course({
      title,
      description,
      author,
    });

    await newCourse.save();

    res.status(201).json({ message: "Course created successfully" });
  } catch (error) {
    console.error("Error creating course:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// get course inforation
router.get("/:courseId", async (req, res) => {
  const courseId = req.params.courseId;

  try {
    const course = await Course.findById(courseId);

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

  try {
    const updatedCourse = await Course.findByIdAndUpdate(
      courseId,
      { $set: req.body },
      { new: true }
    );
    if (!updatedCourse) {
      return res.status(404).json({ error: "Course not found" });
    }
  } catch {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
