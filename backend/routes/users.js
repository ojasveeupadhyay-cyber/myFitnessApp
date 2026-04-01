const express = require('express');
const router = express.Router();
const User = require('../models/User');

// POST /api/users/login
// Basic upsert auth: try to find user by email, if they don't exist, create them
router.post('/login', async (req, res) => {
  const { name, email } = req.body;

  if (!name || !email) {
    return res.status(400).json({ message: 'Name and email are required' });
  }

  try {
    let user = await User.findOne({ email: email.toLowerCase() });

    if (!user) {
      user = new User({ name, email });
      await user.save();
    } else {
      // Optional: Update name if it changed
      if (user.name !== name) {
         user.name = name;
         await user.save();
      }
    }

    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// GET /api/users/:id
// Get user info (optional, for profile view)
router.get('/:id', async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
