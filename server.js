const express = require("express");
const mongoose = require("mongoose");

//Import route files
const auth = require("./routes/api/auth");
const user = require("./routes/api/user");
const post = require("./routes/api/post");

// Import environment variables
require("dotenv").config();
// Set Default Port
const port = process.env.PORT || 2000;

// Initialize app
const app = express();

// DB connection
mongoose
  .connect(process.env.mongoURI)
  .then(() => console.log("Connected to DB"))
  .catch(err => console.log(err));

// Test route
app.get("/", (req, res) => res.send("dev-social"));

// Define Routes
app.use("/api/auth", auth);
app.use("/api/user", user);
app.use("/api/post", post);

// Start server
app.listen(port, () => console.log(`Server Started on Port ${port}`));
