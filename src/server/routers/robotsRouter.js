const express = require("express");
const { getAllRobots, getRobot } = require("../controllers/robotsControllers");
const methodChecker = require("../middlewares/methodChecker");
const validateToken = require("../middlewares/tokens");

const router = express.Router();

router.use("/:id", methodChecker("GET"), getRobot);
router.use("/", methodChecker("GET"), getAllRobots);

router.use("/create", methodChecker("POST"), validateToken);
module.exports = router;
