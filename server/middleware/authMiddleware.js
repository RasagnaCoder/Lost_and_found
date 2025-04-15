const jwt = require('jsonwebtoken');
const User = require('../models/User'); // User model to fetch user from the database

// Middleware to authenticate the user via JWT token
const authMiddleware = async (req, res, next) => {
  // Get the token from the Authorization header (usually in the form of "Bearer <token>")
  const token = req.headers.authorization?.split(' ')[1]; 

  if (!token) {
    return res.status(401).json({ error: 'No token, authorization denied' });
  }

  try {
    // Verify the token with the JWT_SECRET stored in environment variables
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Attach the user to the request object for further use in the route handler
    const user = await User.findById(decoded.id).select('-password'); // Exclude password from the user data

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    req.user = user; // Attach the user to the request object
    next(); // Proceed to the next middleware or route handler
  } catch (err) {
    if (err.name === 'TokenExpiredError') {
      return res.status(401).json({ error: 'Token has expired' });
    }
    return res.status(401).json({ error: 'Token is not valid' });
  }
};

module.exports = authMiddleware;


