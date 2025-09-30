const jwt = require('jsonwebtoken');
const { JWT_SECRET, JWT_EXPIRE } = require('../config/config');

// Generate JWT Access Token
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.ACCESS_TOKEN_SECRET || JWT_SECRET, {
    expiresIn: JWT_EXPIRE
  });
};

// Generate JWT Refresh Token
const generateRefreshToken = (id) => {
  return jwt.sign({ id }, process.env.REFRESH_TOKEN_SECRET || JWT_SECRET, {
    expiresIn: '7d'
  });
};

// Verify JWT Token
const verifyToken = (token, isRefreshToken = false) => {
  const secret = isRefreshToken 
    ? process.env.REFRESH_TOKEN_SECRET || JWT_SECRET
    : process.env.ACCESS_TOKEN_SECRET || JWT_SECRET;
  
  return jwt.verify(token, secret);
};

module.exports = {
  generateToken,
  generateRefreshToken,
  verifyToken
};