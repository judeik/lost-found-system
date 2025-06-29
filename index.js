const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const path = require('path');

// Initialize express app
dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;




// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

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

// Default route
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});
