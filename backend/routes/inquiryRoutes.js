const express = require('express');
const { createInquiry, getInquiries, updateInquiryStatus } = require('../controllers/inquiryController');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/', createInquiry);

router.get('/', protect, getInquiries);
router.put('/:id', protect, updateInquiryStatus);

module.exports = router;