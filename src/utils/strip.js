/* eslint-disable no-underscore-dangle */
/* eslint-disable no-param-reassign */

const stripRobots = (robots) => {
  const newRobots = robots.map((robot) => {
    robot.id = robot._id;
    delete robot._id;
    delete robot.__v;
    return robot;
  });

  return newRobots;
};

module.exports = stripRobots;
