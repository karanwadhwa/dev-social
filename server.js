const express = require("express");

const app = express();

const port = 2000;

app.get("/", (req, res) => res.send("dev-social"));

app.listen(port, () => console.log(`Server Started on Port ${port}`));
