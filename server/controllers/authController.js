// server/controllers/authController.js
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const generateToken = (user) => {
  return jwt.sign(
    { id: user._id, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: '1h' }
  );
};

// server/controllers/authController.js
// In your authController.js
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find user and explicitly include the password field
    const user = await User.findOne({ email }).select('+password');
    if (!user) {
      return res.status(400).json({ error: 'Invalid credentials' });
    }

    // Debug: Log stored hash and comparison result
    console.log('Stored hash:', user.password);
    const isMatch = await bcrypt.compare(password, user.password);
    console.log('Password match:', isMatch);

    if (!isMatch) {
      return res.status(400).json({ error: 'Invalid credentials' });
    }

    // Generate JWT token (ensure JWT_SECRET is set in .env)
    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    // Return user data (excluding password)
    const userData = user.toObject();
    delete userData.password;

    res.json({ token, user: userData });

  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ error: 'Server error during login' });
  }
};

exports.signup = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    
    if (await User.findOne({ email })) {
      return res.status(400).json({ error: 'Email already exists' });
    }

    const user = await User.create({ name, email, password });
    const token = generateToken(user);
    const userData = user.toObject();
    delete userData.password;

    res.status(201).json({ token, user: userData });
  } catch (error) {
    console.error('Signup error:', error);
    res.status(500).json({ error: 'Server error during signup' });
  }
};