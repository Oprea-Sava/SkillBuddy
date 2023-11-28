const mongoose = require("mongoose");

const courseCardSchema = new mongoose.Schema({
  title: { type: String, require: true, unique: true },
  description: { type: String, require: true },
  author: { type: String, require: true },
  price: { type: Number, default: 0 },
  image: { type: String, default: "" },
  // memberLimit: { type: Number },
});

const CourseCard = mongoose.model("CourseCard", courseCardSchema);

module.export = CourseCard;
