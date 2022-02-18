const jwt = require("jsonwebtoken");
const errorTypes = require("./errorHandlers/errorTypes");

const secret = process.env.TOKEN_SECRET;

const generateToken = (user) => jwt.sign(user, secret);

const getToken = (req, res, next) => {
  const user = req.body.clientUser;
  if (typeof user !== "string") {
    const error = new Error("nem malament");
    error.type = errorTypes.badRequest;
    next(error);
    return;
  }
  const token = generateToken(user);
  res.json({ token });
};

const validateToken = (req, res, next) => {
  const { token } = req.query;

  if (!token) {
    const error = new Error("Token not provided");
    error.type = errorTypes.missingToken;
    next(error);
    return;
  }

  jwt.verify(token, req.locals.secret, (error) => {
    if (error) {
      const newError = { ...error };
      newError.type = errorTypes.invalidToken;
      next(error);
      return;
    }
    next();
  });
};

module.exports = { validateToken, getToken };
