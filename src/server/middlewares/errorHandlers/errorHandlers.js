const generateJSON = (code, message) => ({
  error: true,
  code,
  message,
});

const resourceNotFound = (req, res) => {
  const code = 404;
  res.status(code).json(generateJSON(code, "Resource not found"));
};

const incorrectMethod = (req, res) => {
  const code = 501;
  res
    .status(code)
    .json(generateJSON(code, "Method not implemented for this endpoint"));
};

const invalidId = (req, res) => {
  const code = 400;
  res.status(code).json(generateJSON(code, "The id provided is not valid"));
};

const missingId = (req, res) => {
  const code = 404;
  res
    .status(code)
    .json(generateJSON(code, "The id was not present in the database"));
};

const badRequest = (req, res) => {
  const code = 400;
  res.status(code).json(generateJSON(code, "Bad request"));
};

const invalidToken = (req, res) => {
  const code = 403;
  res.status(code).json(generateJSON(code, "Forbidden: Token invalid"));
};

const missingToken = (req, res) => {
  const code = 403;
  res.status(code).json(generateJSON(code, "Forbidden: Token missing"));
};

const invalidSchema = (req, res, message) => {
  const code = 400;
  res.status(code).json(generateJSON(code, message));
};

const userConflict = (req, res, conflict) => {
  const code = 409;
  res.status(code).json(generateJSON(code, conflict));
};

const userMissing = (req, res) => {
  const code = 401;
  res
    .status(code)
    .json(generateJSON(code, "Username was not present in the database"));
};

const invalidPassword = (req, res) => {
  const code = 401;
  res.status(code).json(generateJSON(code, "Invalid password"));
};

const activationFailed = (req, res) => {
  const code = 400;
  res.status(code).json(generateJSON(code, "The user activation failed"));
};

const userInactive = (req, res) => {
  const code = 403;
  res.status(code).json(generateJSON(code, "The requested user is not active"));
};

const serverError = (req, res) => {
  const code = 500;
  res.status(code).json(generateJSON(code, "Internal server error"));
};

module.exports = {
  resourceNotFound,
  incorrectMethod,
  invalidId,
  badRequest,
  serverError,
  missingId,
  invalidToken,
  missingToken,
  invalidSchema,
  userConflict,
  userMissing,
  invalidPassword,
  activationFailed,
  userInactive,
};
