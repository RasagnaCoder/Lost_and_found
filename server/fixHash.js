// Run this in Node REPL or create fixHash.js
require('dotenv').config();
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('./models/User');

mongoose.connect(process.env.MONGO_URI)
  .then(async () => {
    // 1. Find the admin user
    const admin = await User.findOne({email: "admin@cbit.edu"});
    
    // 2. Manually rehash the password
    const salt = await bcrypt.genSalt(10);
    admin.password = await bcrypt.hash("admin123", salt);
    
    // 3. Save the user
    await admin.save();
    
    console.log('✅ Password rehashed successfully');
    console.log('New hash:', admin.password);
    process.exit();
  });