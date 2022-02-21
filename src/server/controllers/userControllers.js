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

const registerUser = async (req, res, next) => {
  const user = req.body;
  try {
    const createdUser = await User.create(user);
    req.user = createdUser;
    req.auth = {
      id: createdUser.id,
      register: true,
    };

    next();
  } catch (error) {
    error.type = errorTypes.invalidSchema;
    next(error);
  }
};

module.exports = { checkUserAvail, registerUser };
