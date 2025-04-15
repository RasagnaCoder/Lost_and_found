require('dotenv').config();
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('./models/User'); 

async function createAdmin() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    const admin = await User.create({
      name: 'Main Admin',
      email: 'admin@cbit.edu',
      password: bcrypt.hashSync('admin123', 10),
      role: 'admin'
    });
    console.log('✅ Admin created:', admin.email);
    process.exit(0);
  } catch (err) {
    console.error('❌ Error:', err.message);
    process.exit(1);
  }
}

createAdmin();