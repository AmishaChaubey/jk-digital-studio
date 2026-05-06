const express = require('express');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

const sequelize = require('./config/database');
const photoRoutes = require('./routes/photoRoutes');
const videoRoutes = require('./routes/videoRoutes');
const serviceRoutes = require('./routes/serviceRoutes');
const authRoutes = require('./routes/adminAuth');           // ← NEW
const authMiddleware = require('./middleware/auth');   // ← NEW

// Models import (for sync)
require('./models/Photo');
require('./models/Video');
require('./models/Service');

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Static files serve (uploads folder)
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Auth route — NO middleware (login ke liye)
app.use('/api/auth', authRoutes);                                      // ← NEW

// Protected routes — authMiddleware lagaya
app.use('/api/photos',   photoRoutes);                 // ← UPDATED
app.use('/api/videos', videoRoutes);                 // ← UPDATED
app.use('/api/services', authMiddleware, serviceRoutes);               // ← UPDATED

// Health check route
app.get('/', (req, res) => {
  res.json({ message: 'PhotoStudio API is working' });
});

// DB sync & server start
sequelize.sync({ alter: true })
  .then(() => {
    console.log('Database connected & synced');
    app.listen(process.env.PORT || 5000, () => {
      console.log(`Server running on http://localhost:${process.env.PORT || 5000}`);
    });
  })
  .catch(err => {
    console.error('❌ DB Connection Error:', err);
  });