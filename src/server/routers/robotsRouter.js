const express = require("express");
const {
  getAllRobots,
  getRobot,
  createRobot,
} = require("../controllers/robotsControllers");
const methodChecker = require("../middlewares/methodChecker");
const { validateToken } = require("../middlewares/tokens");

const router = express.Router();

router.use("/create", methodChecker("POST"), validateToken, createRobot);
router.use("/:id", methodChecker("GET"), getRobot);
router.use("/", methodChecker("GET"), getAllRobots);

module.exports = router;
