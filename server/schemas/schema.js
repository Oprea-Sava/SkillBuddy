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
  videoUrl: { type: String },
  position: { type: Number },
  isPublished: { type: Boolean, default: false },
  courseId: { type: String, ref: "Course", required: true },
  //userProgress: [{ type: mongoose.Schema.Types.ObjectId, ref: 'UserProgress' }],
});

const courseSchema = new mongoose.Schema({
  title: { type: String, require: true, unique: true },
  description: { type: String },
  author: { type: mongoose.Schema.Types.ObjectId, ref: "User", require: true },
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

chapterSchema.pre(
  "remove",
  { document: true, query: false },
  async function (next) {
    try {
      const courseId = this.courseId;
      await mongoose
        .model("Course")
        .updateOne({ _id: courseId }, { $pull: { chapters: this._id } });
      next();
    } catch (error) {
      next(error);
    }
  }
);

const Course = mongoose.model("course", courseSchema);
const User = mongoose.model("User", userSchema);
const Chapter = mongoose.model("Chapter", chapterSchema);
module.exports = { User, Course, Chapter };
