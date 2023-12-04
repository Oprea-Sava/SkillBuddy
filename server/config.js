const dotenv = require("dotenv");

dotenv.config();

module.exports = {
  mongoURI: process.env.MONGODB_URI,
  secureKey: process.env.JWT_SECRET,
  cloudName: process.env.CLOUD_NAME,
  schoolPass: process.env.SCHOOL_PASSWORD,
};
