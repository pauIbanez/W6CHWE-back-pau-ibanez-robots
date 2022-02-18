const express = require("express");
const { getAllRobots, getRobot } = require("../controllers/robotsControllers");
const methodChecker = require("../middlewares/methodChecker");

const router = express.Router();

router.use("/:id", methodChecker("GET"), getRobot);
router.use("/", methodChecker("GET"), getAllRobots);

module.exports = router;
