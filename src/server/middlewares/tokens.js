const jwt = require("jsonwebtoken");
const errorTypes = require("./errorHandlers/errorTypes");

const secret = process.env.TOKEN_SECRET;

const generateToken = () => jwt.sign("socUnToken", secret);

const getToken = (req, res) => {
  const token = generateToken();
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.json({ token });
};

const validateToken = async (req, res, next) => {
  const { token } = req.query;

  if (!token) {
    const error = new Error("Token not provided");
    error.type = errorTypes.missingToken;
    next(error);
    return;
  }

  await jwt.verify(token, secret, (error) => {
    if (error) {
      const newError = new Error("asdasdasdasdas");
      newError.type = errorTypes.invalidToken;
      next(newError);
      return;
    }

    next();
  });
};

module.exports = { validateToken, getToken };
