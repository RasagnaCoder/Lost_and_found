const mongoose = require('mongoose');

const itemSchema = new mongoose.Schema({
  status: { type: String, enum: ['lost', 'found'], required: true },
  title: { type: String, required: true },
  category: String,
  description: String,
  location: String,
  date: Date,
  contactInfo: String,
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
}, { timestamps: true });

module.exports = mongoose.model('Item', itemSchema);
