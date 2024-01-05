const express = require("express");
const router = express.Router();
const { Course, Chapter } = require("../schemas/schema");
const client = require("ssh2-sftp-client");
const multer = require("multer");
const config = require("../config");

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

//route to create a chapter
router.post("/createChapter/:courseId", async (req, res) => {
  try {
    const { title, videoUrl } = req.body;
    const courseId = req.params.courseId;
    const token = req.headers.authorization.split(" ")[1];
    const userId = getUserId(token);
    // Validate if courseId exists
    const course = await Course.findById(courseId);
    if (!course) {
      return res.status(404).json({ error: "Course not found" });
    }
    if (userId != course.author) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    // Determine the position for the new chapter
    const newPosition = course.chapters.length + 1;

    // Create a new chapter
    const newChapter = new Chapter({
      title,
      videoUrl,
      courseId,
      position: newPosition,
    });

    // Save the chapter
    const savedChapter = await newChapter.save();

    // Link the chapter to the course
    course.chapters.push(savedChapter._id);
    await course.save();

    res.status(201).json({ message: "Chapter created successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// get chapter information
router.get("/chapters/:chapterId", async (req, res) => {
  const chapterId = req.params.chapterId;
  try {
    const chapter = await Chapter.findById(chapterId);

    if (!chapter) {
      return res.status(404).json({ error: "Chapter not found" });
    }

    res.json(chapter);
  } catch (error) {
    console.error("Error retrieving chapter information:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

//route to update chapter information
router.put("/chapters/:chapterId", async (req, res) => {
  const chapterId = req.params.chapterId;
  const token = req.headers.authorization.split(" ")[1];
  const userId = getUserId(token);
  const chapter = await Chapter.findById(chapterId).populate("courseId");
  if (userId != chapter.courseId.author) {
    return res.status(401).json({ error: "Unauthorized" });
  }
  try {
    const updatedChapter = await Chapter.updateOne(
      { _id: chapterId },
      { $set: req.body }
    );
    if (updatedChapter.nModified === 0) {
      return res.status(404).json({ error: "Chapter not found" });
    }
    res.status(200).json({ message: "Chapter updated successfully" });
  } catch {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

//route to delete a chapter
router.delete("/chapters/:chapterId", async (req, res) => {
  const chapterId = req.params.chapterId;
  const token = req.headers.authorization.split(" ")[1];
  const userId = getUserId(token);
  const chapter = await Chapter.findById(chapterId).populate("courseId");
  if (!chapter) {
    return res.status(404).json({ error: "Chapter not found" });
  }
  if (userId != chapter.courseId.author) {
    return res.status(401).json({ error: "Unauthorized" });
  }
  try {
    const result = await Chapter.deleteOne({ _id: chapterId });
    if (result.deletedCount > 0) {
      await Course.updateOne(
        { _id: chapter.courseId },
        { $pull: { chapters: chapterId } }
      );

      res.status(200).json({ message: "Chapter deleted successfully" });
    } else {
      res.status(404).json({ error: "Chapter not found" });
    }
  } catch {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// route to get all chapters from a course
router.get("/:courseId/chapters", async (req, res) => {
  try {
    const courseId = req.params.courseId;

    // Validate if courseId exists
    const course = await Course.findById(courseId);
    if (!course) {
      return res.status(404).json({ error: "Course not found" });
    }

    const populatedCourse = await Course.findById(courseId).populate({
      path: "chapters",
      options: { sort: { position: 1 } }, // Sort chapters by position in ascending order
    });

    res.status(200).json(populatedCourse.chapters);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

//route to update chapter order
router.post("/chapters/updateOrder", async (req, res) => {
  try {
    const updatedChapters = req.body.updatedChapters;

    if (!Array.isArray(updatedChapters)) {
      return res.status(400).json({ error: "Invalid data format" });
    }
    await Promise.all(
      updatedChapters.map(async (chapterData, index) => {
        const chapterId = chapterData._id;
        await Chapter.findByIdAndUpdate(chapterId, { position: index + 1 });
      })
    );

    res.status(200).json({ message: "Chapter positions updated successfully" });
  } catch (error) {
    console.error("Error updating chapter positions:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

//route to upload course img
router.post("/upload/:courseId", upload.single("image"), async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: "No file uploaded" });
  }

  const courseId = req.params.courseId;
  const token = req.headers.authorization.split(" ")[1];
  const userId = getUserId(token);
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

// get course information
router.get("/:courseId", async (req, res) => {
  const courseId = req.params.courseId;
  try {
    const course = await Course.findById(courseId)
      .populate("author")
      .populate("chapters");

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
    const updatedCourse = await Course.updateOne(
      { _id: courseId },
      { $set: req.body }
    );
    if (updatedCourse.nModified === 0) {
      return res.status(404).json({ error: "Course not found" });
    }
    res.status(200).json({ message: "Course updated successfully" });
  } catch {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.delete("/:courseId", async (req, res) => {
  try {
    const courseId = req.params.courseId;
    const token = req.headers.authorization.split(" ")[1];
    const userId = getUserId(token);
    const course = await Course.findById(courseId);
    if (userId != course.author) {
      return res.status(401).json({ error: "Unauthorized" });
    }
    const deletedCourse = await Course.findByIdAndDelete(courseId);
    if (!deletedCourse) {
      return res.status(404).json({ message: "Course not found" });
    }
    await Chapter.deleteMany({ courseId });
    return res
      .status(200)
      .json({ message: "Course and associated chapters deleted successfully" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
});

module.exports = router;
