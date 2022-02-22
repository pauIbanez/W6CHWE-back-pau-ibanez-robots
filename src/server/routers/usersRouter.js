const express = require("express");
const {
  registerUser,
  checkUserAvail,
  checkUserCredentials,
  activateUser,
  getUserData,
} = require("../controllers/userControllers");
const methodChecker = require("../middlewares/methodChecker");
const { sendToken, validateToken } = require("../middlewares/tokens");

const router = express.Router();

router.use("/register", methodChecker("POST"), checkUserAvail, registerUser);
router.use("/user", methodChecker("POST"), validateToken, getUserData);
router.use("/activate/:token", methodChecker("GET"), activateUser);

router.use("/login", methodChecker("POST"), checkUserCredentials, sendToken);

module.exports = router;
