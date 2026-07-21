const Product = require('../models/Product');

// @desc    Get all products (Public - Paginated)
// @route   GET /api/products
const getAllProducts = async (req, res, next) => {
  try {
    // 1. Enforce strict base-10 radix parsing
    const page = parseInt(req.query.page, 10) || 1;
    const inputLimit = parseInt(req.query.limit, 10) || 10;
    
    // 2. Production Security Bound: Enforce a hard maximum ceiling of 50 items per network frame
    const limit = Math.min(Math.max(1, inputLimit), 50); 
    
    const startIndex = (page - 1) * limit;

    const products = await Product.find()
      .sort({ createdAt: -1 })
      .skip(startIndex)
      .limit(limit);

    const total = await Product.countDocuments();

    // 3. Maintained your exact output signature to ensure compatibility with all frontend modules
    res.status(200).json({
      success: true,
      count: products.length,
      pagination: {
        currentPage: page,
        totalPages: Math.ceil(total / limit),
        totalItems: total
      },
      data: products
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get single product by ID (Public)
// @route   GET /api/products/:id
const getProductById = async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id);
    
    // Explicit 404 for valid MongoDB IDs that do not match a document
    if (!product) {
      res.status(404);
      throw new Error('Product not found.');
    }
    
    res.status(200).json({ success: true, data: product });
  } catch (error) {
    next(error);
  }
};

// @desc    Create a new product (Admin Only)
// @route   POST /api/products
const createProduct = async (req, res, next) => {
  try {
    // The Product model handles validation natively based on the schema rules
    const newProduct = await Product.create(req.body);
    res.status(201).json({ success: true, data: newProduct });
  } catch (error) {
    next(error);
  }
};

// @desc    Update an existing product (Admin Only)
// @route   PUT /api/products/:id
const updateProduct = async (req, res, next) => {
  try {
    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!updatedProduct) {
      res.status(404);
      throw new Error('Product not found.');
    }

    res.status(200).json({ success: true, data: updatedProduct });
  } catch (error) {
    next(error);
  }
};

// @desc    Delete a product from inventory (Admin Only)
// @route   DELETE /api/products/:id
const deleteProduct = async (req, res, next) => {
  try {
    const deletedProduct = await Product.findByIdAndDelete(req.params.id);
    
    if (!deletedProduct) {
      res.status(404);
      throw new Error('Product not found.');
    }

    res.status(200).json({ success: true, message: 'Product permanently removed.' });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct
};