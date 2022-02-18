const Robot = require("../../database/models/Robot");

const getAllRobots = async (req, res, next) => {
  try {
    const robots = await Robot.find();
    res.json({ robots });
  } catch (error) {
    next(error);
  }
};

module.exports = { getAllRobots };
