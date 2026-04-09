const mongoose = require('mongoose');
const Link = require('./models/Link');
require('dotenv').config();

const seedLinks = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to DB');

    // Clear existing links
    await Link.deleteMany({});
    console.log('Cleared existing links');

    const newLinks = [
      { title: 'Portfolio', url: 'https://rabeelportfolio.netlify.app/', order: 1 },
      { title: 'LinkedIn', url: 'https://www.linkedin.com/in/rabeel-ahmed-b1823b2b2/', order: 2 },
      { title: 'GitHub', url: 'https://github.com/RabeelAhmed', order: 3 },
      { title: 'Instagram', url: 'https://www.instagram.com/rabeel_ahmed__56/', order: 4 },
      { title: 'Facebook', url: 'https://www.facebook.com/profile.php?id=100076597329631', order: 5 },
      { title: 'Twitter / X', url: 'https://x.com/RabeelAhmed__56', order: 6 },
    ];

    await Link.insertMany(newLinks);
    console.log('Inserted new links successfully');

    mongoose.connection.close();
  } catch (error) {
    console.error('Error seeding data:', error);
    process.exit(1);
  }
};

seedLinks();
