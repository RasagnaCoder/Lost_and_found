require('dotenv').config();
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('./models/User');

mongoose.connect(process.env.MONGO_URI)
  .then(async () => {
    const admin = await User.findOne({email: "admin@cbit.edu"}).select('+password');
    console.log("Stored hash:", admin.password);
    console.log("Test 'admin123' against hash:", await bcrypt.compare("admin123", admin.password));
    process.exit();
  });