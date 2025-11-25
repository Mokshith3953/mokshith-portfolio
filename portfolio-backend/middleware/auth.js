const jwt = require('jsonwebtoken');
require('dotenv').config();

module.exports = function(req, res, next) {
  // 1. Get the token from the request header
  const token = req.header('x-auth-token');

  // 2. Check if no token is present
  if (!token) {
    return res.status(401).json({ msg: 'No token, authorization denied' });
  }

  // 3. If token exists, verify it
  try {
    // Decode the token using your JWT_SECRET
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Attach the user's ID to the request object
    // so the route can use it if needed
    req.user = decoded.user;

    // Call 'next()' to proceed to the actual route handler
    next();
  } catch (err) {
    // If token is not valid
    res.status(401).json({ msg: 'Token is not valid' });
  }
};