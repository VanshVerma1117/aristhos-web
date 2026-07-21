// backend/middleware/authMiddleware.js
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const protect = async (req, res, next) => {
  let token;

  // 1. Look for the JWT inside the secure HttpOnly cookie
  if (req.cookies && req.cookies.admin_token) {
    token = req.cookies.admin_token;
  }

  // If no token exists, reject the request immediately
  if (!token) {
    return res.status(401).json({ message: 'Not authorized, no token provided' });
  }

  try {
    // 2. Cryptographically verify the token against your secret key
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // 3. Fetch the admin user from the database (excluding the password) 
    // and attach it to the request object for the controller to use
    req.user = await User.findById(decoded.id).select('-password');
    
    // 4. The box passes inspection. Send it to the Controller.
    next(); 
  } catch (error) {
    res.status(401).json({ message: 'Not authorized, invalid token signature' });
  }
};

module.exports = { protect };