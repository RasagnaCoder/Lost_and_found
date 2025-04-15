const Item = require('../models/Item');

exports.reportItem = async (req, res) => {
  try {
    const { status, title, category, description, location, date, contactInfo } = req.body;
    const imageUrl = req.file ? req.file.path : '';

    const newItem = await Item.create({
      status,
      title,
      category,
      description,
      location,
      date,
      contactInfo,
      imageUrl,
      user: req.user.id,
    });

    res.status(201).json(newItem);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error reporting item' });
  }
};

exports.getItems = async (req, res) => {
  try {
    const items = await Item.find().sort({ createdAt: -1 });
    res.json(items);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error fetching items' });
  }
};

exports.getReportedItems = async (req, res) => {
  try {
    const reportedItems = await Item.find({ user: req.user.id }).sort({ createdAt: -1 });

    if (reportedItems.length === 0) {
      return res.status(404).json({ message: 'No reported items found for this user' });
    }

    res.json(reportedItems);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error fetching reported items' });
  }
};
