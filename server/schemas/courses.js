const mongoose = require("mongoose");

const courseCardSchema = new mongoose.Schema({
    courseName: { type: String, require: true, unique: true },
    description: { type: String, require: true },
    author: { type: String, require: true },
    price: { type: Numbe, default: 0 },
    image: { type: String, default: "" },
    // memberLimit: { type: Number },
});

const CourseCard = mongoose.model("CourseCard", courseCardSchema);

module.export = CourseCard;