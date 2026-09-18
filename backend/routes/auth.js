const express = require('express');
const rateLimit = require('express-rate-limit');
const { loginAdmin, logoutAdmin, getMe } = require('../controllers/authController');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

// Mitigate brute-force credential stuffing
const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, 
  max: 5, 
  message: { message: 'Too many login attempts. Please try again in 15 minutes.' },
  standardHeaders: true,
  legacyHeaders: false,
});

router.post('/login', loginLimiter, loginAdmin);
router.post('/logout', logoutAdmin);
router.get('/me', protect, getMe);

module.exports = router;