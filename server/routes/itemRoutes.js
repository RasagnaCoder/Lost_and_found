// routes/itemRoutes.js
const express = require('express');
const router = express.Router();
const { reportItem, getItems, getReportedItems } = require('../controllers/itemController');
const authMiddleware = require('../middleware/authMiddleware');
const multer = require('multer');
const { storage } = require('../config/cloudinaryConfig');

// Set up Multer middleware for file uploads
const upload = multer({ storage });

// Route to report a lost/found item
router.post('/', authMiddleware, upload.single('image'), reportItem);

// Public route to fetch all items
router.get('/', getItems);

// Private route to get only logged-in user's reported items
router.get('/my-items', authMiddleware, getReportedItems);

module.exports = router;
