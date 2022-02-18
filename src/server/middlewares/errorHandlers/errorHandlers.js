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
    .json(generateJSON(code, "Method not implemented for this route"));
};

const invalidId = (req, res) => {
  const code = 501;
  res
    .status(code)
    .json(generateJSON(code, "Method not implemented for this route"));
};

const badRequest = (req, res) => {
  const code = 400;
  res.status(code).json(generateJSON(code, "Bad request"));
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
};
