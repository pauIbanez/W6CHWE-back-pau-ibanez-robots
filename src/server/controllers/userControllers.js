const bcrypt = require("bcryptjs");
const chalk = require("chalk");
const crypto = require("crypto");
const debug = require("debug")("app:userUtils");

const User = require("../../database/models/User");
const getActivationEmail = require("../../utils/activationEmail");
const sendEmail = require("../../utils/mailer");
const errorTypes = require("../middlewares/errorHandlers/errorTypes");

const checkUserAvailavility = async (req, res, next) => {
  const user = req.body;
  const userExists = await User.findOne({
    $or: [{ username: user.username }, { email: user.email }],
  });

  if (userExists) {
    let conflict = "";

    if (userExists.username === user.username) {
      conflict += "username ";
    }
    if (userExists.email === user.email) {
      conflict += "email ";
    }

    const error = new Error("user exists");
    error.type = errorTypes.userConflict;
    error.conflict = conflict;

    next(error);
    return;
  }

  req.user = user;

  next();
};

const checkUserCredentials = async (req, res, next) => {
  const authData = req.headers.authorization.split(" ");

  if (!authData[0] || authData[0] !== "Basic") {
    const error = new Error("username missing");
    error.type = errorTypes.userMissing;
    next(error);
    return;
  }

  const userData = Buffer.from(authData[1], "base64")
    .toString("ascii")
    .split(":");

  const user = {
    username: userData[0],
    password: userData[1],
  };

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

  if (!userExists.active) {
    const error = new Error("user not active");
    error.type = errorTypes.userInactive;
    next(error);
    return;
  }

  req.user = userExists;
  req.auth = {
    id: userExists.id,
    register: false,
  };

  next();
};

const registerUser = async (req, res, next) => {
  if (!req.user.password) {
    const error = new Error("password not provided");
    error.type = errorTypes.invalidPassword;
    next(error);
    return;
  }

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(req.body.password, salt);

  const activeToken = await new Promise((resolve) => {
    crypto.randomBytes(30, (error, buf) => {
      resolve(buf.toString("hex"));
    });
  });

  const activationExpiration = Date.now() + 24 * 3600 * 1000;

  try {
    const user = {
      name: req.user.name,
      lastName: req.user.lastName,
      email: req.user.email,
      username: req.user.username,
      avatar: req.user.avatar,
      password: hashedPassword,
      activeToken,
      activationExpiration,
    };

    const createdUser = await User.create(user);

    req.user = createdUser;
    req.auth = {
      id: createdUser.id,
      register: true,
    };

    sendEmail({
      html: getActivationEmail(user.name, user.username, user.activeToken),
      to: user.email,
    });

    res.status(201).json({});
  } catch (error) {
    error.type = errorTypes.invalidSchema;
    next(error);
  }
};

const activateUser = async (req, res, next) => {
  const userActivationToken = req.params.token;
  debug(chalk.whiteBright("Activation request recieved"));

  try {
    const userToActivate = await User.findOne({
      activeToken: userActivationToken,
    });

    if (!userToActivate) {
      const error = new Error("Activation failed");
      error.type = errorTypes.activationFailed;
      next(error);
      debug(chalk.redBright("Activation failed, user not found in the DB"));
      return;
    }

    if (!userToActivate.activationExpiration > Date.now()) {
      await User.findByIdAndDelete(userToActivate.id);
      const error = new Error("Activation failed");
      error.type = errorTypes.activationFailed;
      debug(chalk.redBright("Activation failed, activation code expired"));
      next(error);
      return;
    }

    if (userToActivate.active) {
      const error = new Error("Activation failed");
      error.type = errorTypes.activationFailed;
      debug(chalk.redBright("Activation failed, user already active"));
      next(error);
      return;
    }

    userToActivate.active = true;
    userToActivate.activeToken = undefined;
    userToActivate.activationExpiration = undefined;

    userToActivate.save();

    res.status(200).json({});
    debug(
      chalk.whiteBright(`Activation for user ${userToActivate.username} `) +
        chalk.greenBright("SUCESSFULL")
    );
  } catch (error) {
    const newError = new Error("Activation failed");
    debug(chalk.redBright(`Activation failed \n ${error}`));
    newError.type = errorTypes.activationFailed;
    newError.error = error;
    next(newError);
  }
};

module.exports = {
  checkUserAvail: checkUserAvailavility,
  registerUser,
  checkUserCredentials,
  activateUser,
};
