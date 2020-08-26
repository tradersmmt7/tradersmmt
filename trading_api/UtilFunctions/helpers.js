const jwt = require("jsonwebtoken");
const SECRET_KEY = require("../properties").tokenKey;
const generateJWTToken = (userData) => {
  return jwt.sign(userData, SECRET_KEY, { expiresIn: "10h" });
};

const ceiling = (number, significance) => {
  return Math.ceil(number / significance) * significance;
};

const difference = (a, b) => {
  return Math.abs(a - b);
};

module.exports = {
  generateJWTToken,
  ceiling,
  difference,
};
