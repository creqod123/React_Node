const jwt = require('jsonwebtoken');
const register = require('../models/register')

const verifyToken = async (req, res, next) => {
  const token = req.headers.token;
  if (!token) {
    return res.status(200).json({ message: 'Token not provided' });
  }
  jwt.verify(token, process.env.JWT_SECRET_KEY, async (err, decoded) => {
    if (err) {
      return res.status(403).json({ message: 'Token verification failed' });
    }

    let user = await register.findOne({ email: decoded.data })
    req.user = user;

    next();
  });
}
module.exports = verifyToken
