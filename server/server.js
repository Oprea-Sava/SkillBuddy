const express = require("express");
const path = require("path");
const app = express();
const port = process.env.PORT || 5000;
const cors = require("cors");

app.use(cors());

// Serve static files from the React app
app.use(express.static(path.join(__dirname, "../client/dist")));

// Handle API requests here
app.get("/api/test", (req, res) => {
  res.json({ message: "API test successful!" });
});

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../client/dist/index.html"));
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
