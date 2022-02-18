const errorTypes = require("./errorHandlers/errorTypes");

const methodChecker = (method) => (req, res, next) => {
  if (!method.includes(req.method)) {
    const error = new Error("This method is not implemented for this endpoint");
    error.type = errorTypes.incorrectMethod;
    next(error);
    return;
  }
  next();
};

module.exports = methodChecker;
