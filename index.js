const dotenv = require('dotenv');
dotenv.config(); // Load .env variables FIRST

// Check environment variables
if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
  console.error('EMAIL_USER and EMAIL_PASS must be set in .env');
  process.exit(1);
}

// Optional for debugging
// console.log('EMAIL_USER:', process.env.EMAIL_USER);
// console.log('EMAIL_PASS:', process.env.EMAIL_PASS); // Optional for debugging

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
const contactRoutes = require('./routes/contact');
const newsletterRoutes = require('./routes/newsletter');

// Initialize express app
// dotenv.config();
const app = express();
const PORT = process.env.PORT || 9500;
const authRoutes = require('./routes/auth');


// Middleware
app.use(cors());
app.use(express.json());
app.use('/api/auth', authRoutes);
app.use(express.static(path.join(__dirname, 'public')));
app.use('/api/contact', contactRoutes);
app.use('/api/newsletter', newsletterRoutes);

// Connect to MongoDB Atlas (no need for deprecated options)
mongoose.connect(process.env.MONGODB_URL)
  .then(() => {
    console.log("MongoDB is connected!");
    
    // Start server after DB is connected
    app.listen(PORT, () => {
      console.log(`Server is running on ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("MongoDB connection error:", err.message);
  });


// Routes
const itemRoutes = require('./routes/items');
app.use('/api/items', itemRoutes);

// Serve static files
// Default route
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'landing.html'));
});

// Dashboard
app.get('/dashboard', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'dashboard.html'));
});
