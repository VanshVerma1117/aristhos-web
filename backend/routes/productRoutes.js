// backend/routes/productRoutes.js
const express = require('express');
const router = express.Router();
const { 
  getAllProducts, 
  getProductById, 
  createProduct, 
  updateProduct, 
  deleteProduct 
} = require('../controllers/productController');
const { protect } = require('../middleware/authMiddleware');

// 🚀 CRITICAL: We will import our admin protection middleware here later to lock down POST/PUT/DELETE
// For now, let's map the endpoints to their respective controllers

// Public Routes: Customers need to browse inventory without authenticating
router.get('/', getAllProducts);
router.get('/:id', getProductById);

// Administrative Routes: Restricted write privileges (Protected)
router.post('/', protect, createProduct);
router.put('/:id', protect, updateProduct);
router.delete('/:id', protect, deleteProduct);

module.exports = router;