require('dotenv').config();
const mongoose = require('mongoose');
const User = require('./models/User');

const seedAdmin = async () => {
  try {
    // 1. Establish direct connection to Atlas
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Database connected for seeding...');

    // 2. Clear out any existing users to avoid duplicate conflicts
    await User.deleteMany();

    // 3. Construct the solitary admin profile using environment variables
    const adminEmail = process.env.ADMIN_EMAIL;
    const adminPassword = process.env.ADMIN_PASSWORD;

    if (!adminEmail || !adminPassword) {
      throw new Error('ADMIN_EMAIL and ADMIN_PASSWORD must be defined in your .env file');
    }

    await User.create({
      email: adminEmail,
      password: adminPassword,
      role: 'admin'
    });

    console.log('🚀 SYSTEM ALERT: Admin user seeded successfully.');
    process.exit(0);
  } catch (error) {
    console.error(`Seeding failed: ${error.message}`);
    process.exit(1);
  }
};

seedAdmin();