const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const multer = require('multer');

// 1. Authenticate with Cloudinary (Requires .env variables)
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

// 2. Configure the Storage Engine
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'aristhos_products', // Organizes your Cloudinary dashboard
    allowed_formats: ['jpg', 'jpeg', 'png', 'webp'], // Security block against malicious files
    transformation: [{ width: 1200, height: 1200, crop: 'limit' }] // Hardware optimization
  }
});

// 3. Initialize Multer
const upload = multer({ 
  storage,
  limits: { fileSize: 5 * 1024 * 1024 } // Hard limit: 5MB per image to prevent bandwidth exhaustion
});

module.exports = upload;