const express = require("express");
const todos = require("./todos");

const router = express.Router();

router.get("/", (req, res) => {
  res.send("Hello World");
});

router.get("/todos", function (req, res) {
  res.json(todos);
});

module.exports = router;
