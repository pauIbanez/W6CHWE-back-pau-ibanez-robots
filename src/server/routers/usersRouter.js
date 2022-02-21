const express = require("express");
const {
  registerUser,
  checkUserAvail,
  checkUserCredentials,
  activateUser,
} = require("../controllers/userControllers");
const methodChecker = require("../middlewares/methodChecker");
const { sendToken } = require("../middlewares/tokens");

const router = express.Router();

router.use("/register", methodChecker("POST"), checkUserAvail, registerUser);

router.use("/activate/:token", methodChecker("GET"), activateUser);

router.use("/login", methodChecker("POST"), checkUserCredentials, sendToken);

module.exports = router;
