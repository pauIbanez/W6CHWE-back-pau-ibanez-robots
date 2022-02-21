const {
  invalidId,
  badRequest,
  serverError,
  missingId,
  incorrectMethod,
  missingToken,
  invalidToken,
  invalidSchema,
  userConflict,
  userMissing,
  invalidPassword,
  activationFailed,
  userInactive,
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

    case errorTypes.incorrectMethod:
      incorrectMethod(null, res);
      break;

    case errorTypes.invalidToken:
      invalidToken(null, res);
      break;

    case errorTypes.missingToken:
      missingToken(null, res);
      break;

    case errorTypes.invalidSchema:
      invalidSchema(null, res, err.message);
      break;

    case errorTypes.userConflict:
      userConflict(null, res, err.conflict);
      break;

    case errorTypes.userMissing:
      userMissing(null, res);
      break;

    case errorTypes.invalidPassword:
      invalidPassword(null, res);
      break;

    case errorTypes.activationFailed:
      activationFailed(null, res);
      break;

    case errorTypes.userInactive:
      userInactive(null, res);
      break;

    default:
      serverError(null, res);
      break;
  }
};

module.exports = errorHandler;
