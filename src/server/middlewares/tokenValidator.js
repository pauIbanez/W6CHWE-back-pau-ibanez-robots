const jwt = require("jsonwebtoken");
const errorTypes = require("./errorHandlers/errorTypes");

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

module.exports = validateToken;
