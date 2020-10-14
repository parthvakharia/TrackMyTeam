const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../config');

exports.generateToken = (data) => {
  return jwt.sign(data, JWT_SECRET);
};

exports.verifyToken = (token) => {
  return jwt.verify(token, JWT_SECRET);
};
