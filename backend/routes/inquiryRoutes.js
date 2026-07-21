const express = require('express');
const router = express.Router();
const { createInquiry, getInquiries, updateInquiryStatus } = require('../controllers/inquiryController');
const { protect } = require('../middleware/authMiddleware');

// Public route: Customers generating leads from the frontend Shop
router.post('/', createInquiry);

// Protected routes: Admin viewing and managing leads in the dashboard
router.get('/', protect, getInquiries);
router.put('/:id', protect, updateInquiryStatus);

module.exports = router;