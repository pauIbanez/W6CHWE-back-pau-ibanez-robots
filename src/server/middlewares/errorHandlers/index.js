const {
  invalidId,
  badRequest,
  serverError,
  missingId,
} = require("./errorHandlers");
const errorTypes = require("./errorTypes");

// eslint-disable-next-line no-unused-vars
const errorHandler = (err, req, res, next) => {
  switch (err.type) {
    case errorTypes.invalidId:
      invalidId(null, res);
      break;
    case errorTypes.badRequest:
      badRequest(null, res);
      break;
    case errorTypes.missingId:
      missingId(null, res);
      break;
    default:
      serverError(null, res);
      break;
  }
};

module.exports = errorHandler;
