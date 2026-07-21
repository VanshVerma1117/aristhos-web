const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true
  },
  password: {
    type: String,
    required: true,
    select: false 
  },
  role: {
    type: String,
    enum: ['admin'], // 🚀 Hard-locks this schema so only admins can exist
    default: 'admin'
  }
}, { timestamps: true });

// Intercept the save process to encrypt the password
UserSchema.pre('save', async function () {
  // If the password hasn't been changed, skip hashing
  if (!this.isModified('password')) {
    return;
  }

  // Generate a salt and hash the plaintext password
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

// 🚀 CRITICAL: Method to verify passwords when you try to log in later
UserSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

module.exports = mongoose.model('User', UserSchema);