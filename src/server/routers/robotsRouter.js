const express = require("express");
const {
  getAllRobots,
  getRobot,
  createRobot,
  updateRobot,
} = require("../controllers/robotsControllers");
const methodChecker = require("../middlewares/methodChecker");
const { validateToken } = require("../middlewares/tokens");

const router = express.Router();

router.use("/create", methodChecker("POST"), validateToken, createRobot);
router.use("/update", methodChecker("PUT"), validateToken, updateRobot);
router.use("/:id", methodChecker("GET"), getRobot);
router.use("/", methodChecker("GET"), getAllRobots);

module.exports = router;
