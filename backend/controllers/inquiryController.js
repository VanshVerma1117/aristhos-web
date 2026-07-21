const Inquiry = require('../models/Inquiry');

// @desc    Create a new WhatsApp inquiry record
// @route   POST /api/inquiries
// @access  Public
const createInquiry = async (req, res, next) => {
  try {
    const { source, status } = req.body;

    // Generate a robust tracking ID (e.g., INQ-48291A)
    const uniqueSuffix = Math.random().toString(36).substring(2, 8).toUpperCase();
    const generatedId = `INQ-${uniqueSuffix}`;

    const inquiry = await Inquiry.create({
      inquiryId: generatedId,
      source,
      status: status || 'pending_whatsapp',
    });

    res.status(201).json({ success: true, inquiryId: inquiry.inquiryId });
  } catch (error) {
    next(error);
  }
};

// @desc    Get all inquiries for admin dashboard
// @route   GET /api/inquiries
// @access  Private (Admin Only)
const getInquiries = async (req, res, next) => {
  try {
    // Sort by newest first
    const inquiries = await Inquiry.find().sort({ createdAt: -1 });
    res.status(200).json({ success: true, data: inquiries });
  } catch (error) {
    next(error);
  }
};

// @desc    Update inquiry status
// @route   PUT /api/inquiries/:id
// @access  Private (Admin Only)
const updateInquiryStatus = async (req, res, next) => {
  try {
    const { status } = req.body;
    const inquiry = await Inquiry.findByIdAndUpdate(
      req.params.id, 
      { status }, 
      { new: true, runValidators: true }
    );

    if (!inquiry) {
      res.status(404);
      throw new Error('Inquiry not found.');
    }

    res.status(200).json({ success: true, data: inquiry });
  } catch (error) {
    next(error);
  }
};

module.exports = { createInquiry, getInquiries, updateInquiryStatus };