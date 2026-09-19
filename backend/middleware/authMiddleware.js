const jwt = require('jsonwebtoken');
const User = require('../models/User');

const protect = async (req, res, next) => {
  let token;

  // Extract token from secure HttpOnly cookie
  if (req.cookies && req.cookies.admin_token) {
    token = req.cookies.admin_token;
  }

  if (!token) {
    return res.status(401).json({ message: 'Not authorized, no token provided' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    // Attach user profile to request, excluding password
    req.user = await User.findById(decoded.id).select('-password');
    
    next(); 
  } catch (error) {
    res.status(401).json({ message: 'Not authorized, invalid token signature' });
  }
};

module.exports = { protect };