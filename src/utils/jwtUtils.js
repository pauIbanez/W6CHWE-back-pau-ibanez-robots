const jwt = require("jsonwebtoken");

const generateToken = (secret) => jwt.sign("pau", secret);

module.exports = generateToken;
