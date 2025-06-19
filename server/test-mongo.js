require('dotenv').config({ path: '../.env' }); // Adjust the path as necessary

console.log('Current Directory:', __dirname);
console.log('MONGO_URI from process.env:', process.env.MONGO_URI);

const mongoose = require('mongoose');

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected successfully'))
  .catch((err) => console.error('MongoDB connection error:', err));
