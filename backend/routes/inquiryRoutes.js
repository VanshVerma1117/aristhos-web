const express = require('express');
const rateLimit = require('express-rate-limit');
const { createInquiry, createCustomProjectInquiry, getInquiries, updateInquiryStatus } = require('../controllers/inquiryController');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

const formLimiter = rateLimit({ windowMs: 60 * 60 * 1000, limit: 5 });

router.post('/', createInquiry);
router.post('/custom-project', formLimiter, createCustomProjectInquiry);

router.get('/', protect, getInquiries);
router.put('/:id', protect, updateInquiryStatus);

module.exports = router;