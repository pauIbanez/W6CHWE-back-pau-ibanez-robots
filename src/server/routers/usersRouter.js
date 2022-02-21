const express = require("express");
const {
  registerUser,
  checkUserAvail,
} = require("../controllers/userControllers");
const methodChecker = require("../middlewares/methodChecker");

const router = express.Router();

router.use("/register", methodChecker("POST"), checkUserAvail, registerUser);

module.exports = router;
