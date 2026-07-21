// 1. Dependency Imports (Top of file)
const cors = require('cors');
require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const authRoutes = require('./routes/auth');
const productRoutes = require('./routes/productRoutes');
const { notFound, errorHandler } = require('./middleware/errorMiddleware');
const inquiryRoutes = require('./routes/inquiryRoutes');

// 2. Application Initialization (CRITICAL: Must occur before any app.use)
const app = express();

// 3. Global Middleware Pipeline (Must parse incoming requests before routes)
app.use(express.json()); // Parses raw JSON bodies
app.use(cookieParser()); // Parses incoming cookies
app.use(cors({
  origin: process.env.FRONTEND_URL, // The exact URL of your Vite React app
  credentials: true, // Crucial: Instructs the browser to allow the HttpOnly cookie to cross the port boundary
}));

// 4. Route Mounting (Passes the parsed request to your controllers)
app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);
app.use('/api/upload', require('./routes/uploadRoutes')); 
app.use('/api/inquiries', inquiryRoutes);

// 5. Error Boundary Pipeline (CRITICAL: Must occur AFTER routes but BEFORE app.listen)
app.use(notFound);
app.use(errorHandler);


// 6. Database Connection and Server Boot (Bottom of file)
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('Database connected...');
    app.listen(process.env.PORT || 5001, () => {
      console.log(`Server running on port ${process.env.PORT || 5001}`);
    });
  })
  .catch((error) => {
    console.error(`Database connection failed: ${error}`);
  });
