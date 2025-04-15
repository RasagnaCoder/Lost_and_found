const { MongoClient } = require('mongodb');
const bcrypt = require('bcryptjs');
require('dotenv').config();

async function fix() {
  // Add proper connection string validation
  const uri = process.env.MONGO_URI || 'mongodb://localhost:27017/lost_and_found';
  if (!uri.startsWith('mongodb://') && !uri.startsWith('mongodb+srv://')) {
    throw new Error('Invalid MongoDB URI');
  }

  const client = new MongoClient(uri, {
    connectTimeoutMS: 5000,
    serverSelectionTimeoutMS: 5000
  });

  try {
    await client.connect();
    console.log('Connected to MongoDB');

    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash('admin123', salt);
    console.log('Generated hash:', hash);

    const db = client.db();
    await db.collection('users').updateOne(
      { email: 'admin@cbit.edu' },
      { $set: { password: hash } },
      { upsert: true } // Creates if doesn't exist
    );

    const user = await db.collection('users').findOne({ email: 'admin@cbit.edu' });
    console.log('Stored hash:', user.password);
    console.log('Verification result:', await bcrypt.compare('admin123', user.password));

  } finally {
    await client.close();
  }
}

fix().catch(err => {
  console.error('Error:', err);
  process.exit(1);
});