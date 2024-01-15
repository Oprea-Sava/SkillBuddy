const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  isTutor: { type: Boolean, default: false },
  firstname: { type: String, required: true },
  lastname: { type: String, required: true },
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  img: {
    data: Buffer,
    contentType: String,
  },
  registrationDate: { type: Date, default: Date.now },
  bio: { type: String },
  phone: { type: String },
  enrolledCourses: [{ type: mongoose.Schema.Types.ObjectId, ref: "Course" }],
  wishlistedCourses: [{ type: mongoose.Schema.Types.ObjectId, ref: "Course" }],
});

const chapterSchema = new mongoose.Schema({
  title: { type: String },
  description: { type: String },
  videoUrl: { type: String, default: "" },
  position: { type: Number },
  isPublished: { type: Boolean, default: false },
  courseId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Course",
    required: true,
  },
  //userProgress: [{ type: mongoose.Schema.Types.ObjectId, ref: 'UserProgress' }],
});

const courseSchema = new mongoose.Schema({
  title: { type: String, required: true, unique: true },
  description: { type: String },
  author: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  price: { type: Number, default: 0 },
  img: {
    data: Buffer,
    contentType: String,
  },
  isPublished: { type: Boolean, default: false },
  chapters: [{ type: mongoose.Schema.Types.ObjectId, ref: "Chapter" }],
  //category
  // memberLimit: { type: Number },
});

const courseProgressionSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  chapter: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Chapter",
    required: true,
  },
  isCompleted: { type: Boolean, default: false },
});

chapterSchema.pre("updateOne", function (next) {
  const update = this.getUpdate();
  if (
    update.$set &&
    (update.$set.title === "" ||
      update.$set.description === "" ||
      update.$set.videoUrl === "")
  ) {
    this.updateOne({}, { $set: { isPublished: false } });
  }
  next();
});

courseSchema.pre("updateOne", function (next) {
  const update = this.getUpdate();
  if (
    update.$set &&
    (update.$set.title === "" ||
      update.$set.description === "" ||
      update.$set.img === null ||
      update.$set.price === "")
  ) {
    this.updateOne({}, { $set: { isPublished: false } });
  }
  next();
});

chapterSchema.post(["updateOne", "deleteOne"], async function (doc) {
  const filter = this._conditions;
  const chapterId = filter._id;
  const chapter = await mongoose.model("Chapter").findOne({ _id: chapterId });
  if (chapter) {
    const courseId = chapter.courseId;
    const course = await mongoose
      .model("Course")
      .findOne({ _id: courseId })
      .populate("chapters");
    if (course) {
      const hasPublishedChapter = course.chapters.some(
        (chapter) => chapter.isPublished
      );
      if (!hasPublishedChapter) {
        await mongoose
          .model("Course")
          .updateOne({ _id: courseId }, { $set: { isPublished: false } });
      }
    }
  }
});

const Course = mongoose.model("Course", courseSchema);
const User = mongoose.model("User", userSchema);
const Chapter = mongoose.model("Chapter", chapterSchema);
const CourseProgression = mongoose.model(
  "CourseProgression",
  courseProgressionSchema
);
module.exports = { User, Course, Chapter, CourseProgression };
