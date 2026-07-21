const mongoose = require('mongoose');

const inquirySchema = new mongoose.Schema({
  inquiryId: { type: String, required: true, unique: true, index: true },
  source: { type: String, required: true, default: 'general' },
  status: { 
    type: String, 
    required: true, 
    enum: ['pending_whatsapp', 'contacted', 'resolved', 'new_custom_project'], 
    default: 'pending_whatsapp' 
  },
  // Added fields to support the About Page form
  customerName: { type: String, required: false },
  customerEmail: { type: String, required: false },
  message: { type: String, required: false }
}, { timestamps: true });

module.exports = mongoose.model('Inquiry', inquirySchema);