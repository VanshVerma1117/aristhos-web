// backend/models/Product.js
const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Product name is required'],
    trim: true,
    maxLength: [100, 'Product name cannot exceed 100 characters']
  },
  price: {
    type: Number,
    required: [true, 'Product price is required'],
    min: [0, 'Price cannot be negative']
  },
  description: {
    type: String,
    required: [true, 'Product description is required'],
    maxLength: [1000, 'Description cannot exceed 1000 characters']
  },
  category: {
    type: String,
    required: [true, 'Product category is required'],
    enum: [
      'Living Room', 
      'Bedroom', 
      'Dining Room', 
      'Bespoke / Custom'
    ], // Enforces strict categorization for your frontend filters
  },
  imageUrl: {
    type: String,
    required: [true, 'Product image URL is required']
  },
  inStock: {
    type: Boolean,
    default: true
  }
}, { 
  timestamps: true // Automatically generates createdAt and updatedAt fields
});

module.exports = mongoose.model('Product', productSchema);