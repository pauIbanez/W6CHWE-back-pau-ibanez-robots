const jwt = require("jsonwebtoken");
const errorTypes = require("./errorHandlers/errorTypes");

const secret = process.env.TOKEN_SECRET;

const generateToken = (req) => {
  const sessonToken = `${req.auth.id}${Date.now()}`;
  const token = jwt.sign(sessonToken, secret);
  return token;
};

const sendToken = (req, res) => {
  const token = generateToken(req);
  req.token = token;
  res.json({ token });
};

const validateToken = async (req, res, next) => {
  const { token } = req.body;

  if (!token) {
    const error = new Error("Token not provided");
    error.type = errorTypes.missingToken;
    next(error);
    return;
  }

  await jwt.verify(token, secret, (error) => {
    if (error) {
      const newError = new Error("Invalid token");
      newError.type = errorTypes.invalidToken;
      next(newError);
      return;
    }

    next();
  });
};

module.exports = { validateToken, sendToken };
