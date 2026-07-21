// backend/routes/auth.js
const express = require('express');
const router = express.Router();
const { loginAdmin, logoutAdmin, getMe } = require('../controllers/authController');
const { protect } = require('../middleware/authMiddleware');

// POST /api/auth/login
router.post('/login', loginAdmin);

// POST /api/auth/logout
router.post('/logout', logoutAdmin);

// GET /api/auth/me
router.get('/me', protect, getMe);

module.exports = router;