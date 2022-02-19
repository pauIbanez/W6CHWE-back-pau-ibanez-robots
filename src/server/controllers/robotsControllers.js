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
  delete robot.popular;

  try {
    const createdRobot = await Robot.create(robot);
    res.json(createdRobot);
  } catch (error) {
    error.type = errorTypes.invalidSchema;
    next(error);
  }
};

const updateRobot = async (req, res, next) => {
  const robot = req.body;
  try {
    const response = await Robot.replaceOne({ _id: robot.id }, robot, {
      runValidators: true,
    });
    if (response.modifiedCount === 0) {
      const error = new Error("caca");
      error.type = errorTypes.missingId;
      next(error);
      return;
    }
    res.json(robot);
  } catch (error) {
    if (error.errors) {
      error.type =
        error.errors.name.kind === "required"
          ? errorTypes.invalidSchema
          : errorTypes.invalidId;
    } else {
      error.type = errorTypes.invalidId;
    }

    next(error);
  }
};

const deleteRobot = async (req, res, next) => {
  const { id } = req.params;

  try {
    const robot = await Robot.findByIdAndDelete(id);

    if (robot) {
      res.json(id);
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

module.exports = {
  getAllRobots,
  getRobot,
  createRobot,
  updateRobot,
  deleteRobot,
};
