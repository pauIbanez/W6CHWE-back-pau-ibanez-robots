const User = require("../../database/models/User");
const errorTypes = require("../middlewares/errorHandlers/errorTypes");

const checkUserAvail = async (req, res, next) => {
  const user = req.body;
  const userExists = await User.findOne({
    $or: [{ username: user.username }, { email: user.email }],
  });

  if (userExists) {
    let conflict = "email";

    if (userExists.username === req.username) {
      conflict = "username";
    }
    const error = new Error("user exists");
    error.type = errorTypes.userConflict;
    error.conflict = conflict;

    next(error);
    return;
  }
  next();
};

const registerUser = (req, res, next) => {};

module.exports = { checkUserAvail, registerUser };
