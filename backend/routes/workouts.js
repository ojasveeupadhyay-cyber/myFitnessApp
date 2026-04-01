const express = require('express');
const Workout = require('../models/Workout');
const router = express.Router();

// GET all workouts
router.get('/', async (req, res) => {
  try {
    const workouts = await Workout.find().sort({ createdAt: -1 });
    // Map _id to id so frontend doesn't break entirely if it uses id
    const formattedWorkouts = workouts.map(w => ({
      ...w._doc,
      id: w._id
    }));
    res.status(200).json(formattedWorkouts);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// POST a new workout
router.post('/', async (req, res) => {
  const { type, duration, date } = req.body;
  try {
    const workout = await Workout.create({ type, duration, date });
    const formattedWorkout = { ...workout._doc, id: workout._id };
    res.status(200).json(formattedWorkout);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// DELETE a workout
router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const workout = await Workout.findByIdAndDelete(id);
    if (!workout) {
      return res.status(404).json({ error: 'No such workout' });
    }
    const formattedWorkout = { ...workout._doc, id: workout._id };
    res.status(200).json(formattedWorkout);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;
