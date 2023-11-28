const express = require("express");
const router = express.Router();
const Course = require("../schemas/courses");

// create course
router.put("/create", async (req, res) => {
  try {
    const { title, description, author, price } = req.body;
    const course = await Course.findOne({ title: title });
    if (course) {
      return res.status(400).json({ error: "Course name is already taken." });
    }

    const newCourse = new Course({
      title,
      description,
      author,
      price,
    });

    await newCourse.save();

    res.status(201).json({ message: "Course created successfully" });
  } catch {
    res.status(500).json({ error: "internal Server Error" });
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
  } catch {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// edit course
router.put("/:courseId", async (req, res) => {
  const courseId = req.params.courseId;

  try {
    const updatedCourse = await Course.findByIdAndUpdate(
      courseId,
      { $set: updatedCourse },
      { new: true }
    );
    if (!updatedCourse) {
      return res.status(404).json({ error: "Course not found" });
    }
  } catch {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

//route to get all id's

router.get("/getall", async (req, res) => {
  try {
    const courses = await Course.find({}, "_id");
    const courseIds = courses.map((courses) => courses._id);
    res.json({ courseIds });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
