const Robot = require("../../database/models/Robot");
const errorTypes = require("../middlewares/errorHandlers/errorTypes");

const getAllRobots = async (req, res, next) => {
  try {
    const robots = await Robot.find();
    res.json({ robots });
  } catch (error) {
    next(error);
  }
};

const getRobot = async (req, res, next) => {
  const { id } = req.params;

  try {
    const robot = await Robot.findById(id);

    if (robot) {
      res.json(robot);
      return;
    }

    const error = new Error("Robot not found");
    error.type = errorTypes.missingId;
    next(error);
  } catch (error) {
    error.type = errorTypes.invalidId;
    next(error);
  }
};

const createRobot = async (req, res, next) => {
  const robot = req.body;
  delete robot.id;

  try {
    const createdRobot = await Robot.create(robot);
    res.json(createdRobot);
  } catch (error) {
    error.type = errorTypes.invalidSchema;
    next(error);
  }
};

module.exports = { getAllRobots, getRobot, createRobot };
