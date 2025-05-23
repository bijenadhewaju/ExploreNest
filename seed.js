require('dotenv').config();
const mongoose = require('mongoose');

const Trek = require('./models/trek');
const User = require('./models/user');

mongoose.connect(process.env.MONGO_URI)
  .then(async () => {
    console.log('Connected to MongoDB');

    // Create sample user
    const user = new User({
      name: 'Test User',
      email: 'test@example.com',
      password: 'hashedpassword' // or plain if you're not using auth yet
    });

    // Create sample trek
    const trek = new Trek({
      name: 'Everest Base Camp',
      description: 'A beautiful and iconic trek in Nepal.',
      location: 'Solukhumbu',
      price: 500
    });

    await user.save();
    await trek.save();

    console.log('Seeded test user and trek');
    console.log('User ID:', user._id.toString());
    console.log('Trek ID:', trek._id.toString());

    process.exit();
  })
  .catch((err) => {
    console.error('Error seeding data:', err);
    process.exit(1);
  });
