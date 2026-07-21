// backend/middleware/errorMiddleware.js

/**
 * Intercepts requests that do not match any defined Express route.
 */
const notFound = (req, res, next) => {
  const error = new Error(`Route Not Found - ${req.originalUrl}`);
  res.status(404);
  next(error); // Passes the error to the errorHandler below
};

/**
 * Centralized error interceptor. Formats all exceptions into a standard JSON payload.
 */
const errorHandler = (err, req, res, next) => {
  // If the status is still 200 despite an error, force it to 500 (Internal Server Error)
  let statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  let message = err.message;

  // Edge Case: Mongoose Bad ObjectId (CastError)
  // If a client requests /api/products/12345, MongoDB will throw a CastError because '12345' is not a valid 24-character hex string.
  // We must intercept this and return a clean 404 instead of a 500 server crash.
  if (err.name === 'CastError' && err.kind === 'ObjectId') {
    message = 'Resource not found. Invalid ID format.';
    statusCode = 404;
  }

  // Edge Case: Mongoose Validation Error (e.g., missing required fields)
  if (err.name === 'ValidationError') {
    message = Object.values(err.errors).map(val => val.message).join(', ');
    statusCode = 400;
  }
  
  // Edge Case: Mongoose Duplicate Key Error
  // If an admin creates a product with a unique field (like title or SKU) that already exists
  if (err.code === 11000) {
    message = `Duplicate field value entered: ${Object.keys(err.keyValue)} already exists.`;
    statusCode = 400;
  }

  res.status(statusCode).json({
    success: false,
    message: message,
    // Security: Never leak the stack trace to the public in a production environment
    stack: process.env.NODE_ENV === 'production' ? null : err.stack,
  });
};

module.exports = { notFound, errorHandler };