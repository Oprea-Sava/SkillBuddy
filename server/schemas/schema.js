const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  isTutor: { type: Boolean, default: false},
  firstname: { type: String, required: true },
  lastname: { type: String, required: true },
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  img: { type: String },
  registrationDate: { type: Date, default: Date.now },
  bio: { type: String },
  phone: { type: String },
  enrolledCourses: [{ type: mongoose.Schema.Types.ObjectId, ref: "Course" }],
  wishlistedCourses: [{ type: mongoose.Schema.Types.ObjectId, ref: "Course" }],
});

const courseSchema = new mongoose.Schema({
  title: { type: String, require: true, unique: true },
  description: { type: String },
  author: { type: mongoose.Schema.Types.ObjectId, ref: "User", require: true },
  price: { type: Number, default: 0 },
  image: { type: String, default: "" },
  isPublished: { type: Boolean, default: false },
  //chapters
  //category
  // memberLimit: { type: Number },
});

const Course = mongoose.model("course", courseSchema);
const User = mongoose.model("User", userSchema);

module.exports = { User, Course };
