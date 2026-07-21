// backend/controllers/authController.js
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs'); // Assumes bcryptjs or bcrypt is installed via package.json
const User = require('../models/User');

/**
 * @desc    Authenticate admin & get token cookie
 * @route   POST /api/auth/login
 * @access  Public
 */
const getMe = async (req, res, next) => {
  try {
    res.status(200).json({ success: true, user: req.user });
  } catch (error) {
    next(error);
  }
};
const loginAdmin = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    // 1. Fail early if fields are missing
    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required.' });
    }

    // 2. Query the user by email
    const user = await User.findOne({ email }).select('+password');
    if (!user) {
      // Use generic error message to prevent account enumeration vulnerabilities
      return res.status(401).json({ message: 'Invalid credentials.' });
    }

    // 3. Compare incoming plaintext password with the database hash
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid credentials.' });
    }

    // 4. Generate the cryptographically signed JWT payload
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: '1d',
    });

    // 5. Inject token into an encrypted HttpOnly cookie
    res.cookie('admin_token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
      maxAge: 24 * 60 * 60 * 1000,
    });

    res.status(200).json({
      message: 'Login successful.',
      user: { id: user._id, email: user.email }
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Log admin out & clear token cookie
 * @route   POST /api/auth/logout
 * @access  Private
 */
const logoutAdmin = async (req, res, next) => {
  try {
    res.clearCookie('admin_token', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
    });
    res.status(200).json({ message: 'Logged out successfully.' });
  } catch (error) {
    next(error);
  }
};

module.exports = { loginAdmin, logoutAdmin, getMe };