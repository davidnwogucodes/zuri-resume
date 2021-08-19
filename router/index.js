const express = require("express");
const router = express.Router();
const { postMessage, login, me } = require("../controller/post");

router.post("/", postMessage);

router.get("/", (req, res, next) => {
  res.render("index");
});

router.get("/login", (req, res, next) => {
  res.render("login");
});

router.post("/login", login);

// router.get("/me", (req, res, next) => {
//   res.render("me");
// });

router.get("/me", me);

module.exports = router;
