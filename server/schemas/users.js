const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  firstname: { type: String, required: true },
  lastname: { type: String, required: true },
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  img: { type: String },
  registrationDate: { type: Date, default: Date.now },
  bio: { type: String },
  phone: { type: String },
  enrolledCourses: [{ type: String }],
  wishlistedCourses: [{type: String}],
});

const User = mongoose.model("User", userSchema);

module.exports = User;
