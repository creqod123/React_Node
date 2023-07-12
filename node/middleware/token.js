const { log } = require('console');
const jwt = require('jsonwebtoken');

function verifyToken(req, res, next) {
  const token = req.headers.token;
  if (!token) {
    return res.status(200).json({ message: 'Token not provided' });
  }
  jwt.verify(token, process.env.JWT_SECRET_KEY, (err, decoded) => {
    if (err) {
      return res.status(403).json({ message: 'Token verification failed' });
    }
    req.user = decoded;
    next();
  });
}
module.exports = verifyToken
