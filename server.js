const express = require("express");
const mongoose = require("mongoose");

require("dotenv").config();
const app = express();

mongoose
  .connect(process.env.mongoURI)
  .then(() => console.log("Connected to DB"))
  .catch(err => console.log(err));

const port = process.env.PORT || 2000;

app.get("/", (req, res) => res.send("dev-social"));

app.listen(port, () => console.log(`Server Started on Port ${port}`));
