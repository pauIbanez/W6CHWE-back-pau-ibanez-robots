const bcrypt = require("bcryptjs");
const User = require("../../database/models/User");
const errorTypes = require("../middlewares/errorHandlers/errorTypes");

const checkUserAvailavility = async (req, res, next) => {
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

const checkUserCredentials = async (req, res, next) => {
  const user = req.body;
  const userExists = await User.findOne({ username: user.username });

  if (!userExists) {
    const error = new Error("username missing");
    error.type = errorTypes.userMissing;
    next(error);
    return;
  }

  const validPassword = await bcrypt.compare(
    user.password,
    userExists.password
  );

  if (!validPassword) {
    const error = new Error("Invalid password");
    error.type = errorTypes.invalidPassword;
    next(error);
    return;
  }

  req.user = userExists;
  req.auth = {
    id: userExists.id,
    register: false,
  };
};

const registerUser = async (req, res, next) => {
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(req.body.password, salt);

  try {
    const user = {
      name: req.body.name,
      email: req.body.email,
      username: req.body.username,
      password: hashedPassword,
    };

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

module.exports = { checkUserAvail: checkUserAvailavility, registerUser };
