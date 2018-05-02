const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const passport = require("passport");

//Import route files
const auth = require("./routes/api/auth");
const user = require("./routes/api/user");
const post = require("./routes/api/post");
const profile = require("./routes/api/profile");

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

// Passport Middleware
app.use(passport.initialize());
// Passport config
require("./config/passport")(passport);

// bodyParser Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Test route
app.get("/", (req, res) => res.send("dev-social"));

// Define Routes
app.use("/api/auth", auth);
app.use("/api/user", user);
app.use("/api/post", post);
app.use("/api/profile", profile);

// Start server
app.listen(port, () => console.log(`Server Started on Port ${port}`));
