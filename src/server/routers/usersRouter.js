const express = require("express");
const {
  registerUser,
  checkUserAvail,
  checkUserCredentials,
} = require("../controllers/userControllers");
const methodChecker = require("../middlewares/methodChecker");
const { sendToken } = require("../middlewares/tokens");

const router = express.Router();

router.use(
  "/register",
  methodChecker("POST"),
  checkUserAvail,
  registerUser,
  sendToken
);
router.use("/login", methodChecker("POST"), checkUserCredentials, sendToken);

module.exports = router;
