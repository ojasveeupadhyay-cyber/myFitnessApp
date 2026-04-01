const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
const workoutsRouter = require('./routes/workouts');
const mealsRouter = require('./routes/meals');
const usersRouter = require('./routes/users');

app.use('/api/workouts', workoutsRouter);
app.use('/api/meals', mealsRouter);
app.use('/api/users', usersRouter);

// Connect to MongoDB
const PORT = process.env.PORT || 5000;
const mongoUri = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/myfitnessapp';

mongoose.connect(mongoUri)
  .then(() => {
    console.log('Successfully connected to MongoDB!');
    app.listen(PORT, () => {
      console.log(`Express Server is running on port: ${PORT}`);
    });
  })
  .catch((error) => {
    console.error('Failed to connect to MongoDB:', error);
  });
