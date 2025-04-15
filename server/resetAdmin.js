require('dotenv').config();
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('./models/User');

async function resetAdmin() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    
    // 1. Delete existing admin
    await User.deleteOne({ email: 'admin@cbit.edu' });
    console.log('🗑️ Old admin removed');
    
    // 2. Create new admin with manual hash verification
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash('admin123', salt);
    console.log('🔑 New hash:', hash);
    
    const admin = await User.create({
      name: 'Admin',
      email: 'admin@cbit.edu',
      password: hash, // Using pre-hashed password
      role: 'admin'
    });
    
    // 3. Immediate verification
    const match = await bcrypt.compare('admin123', admin.password);
    console.log(match ? '✅ Verified' : '❌ Verification failed');
    
    // 4. Document the exact hash for testing
    console.log('\nFOR TESTING:');
    console.log(`Stored hash: ${admin.password}`);
    console.log(`Test command: await bcrypt.compare('admin123', '${admin.password}')`);
    
    process.exit();
  } catch (err) {
    console.error('🔥 Error:', err);
    process.exit(1);
  }
}

resetAdmin();