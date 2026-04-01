const express = require('express');
const Meal = require('../models/Meal');
const router = express.Router();

// GET all meals
router.get('/', async (req, res) => {
  try {
    const meals = await Meal.find().sort({ createdAt: -1 });
    const formattedMeals = meals.map(m => ({
      ...m._doc,
      id: m._id
    }));
    res.status(200).json(formattedMeals);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// POST a new meal
router.post('/', async (req, res) => {
  const { name, calories } = req.body;
  try {
    const meal = await Meal.create({ name, calories });
    const formattedMeal = { ...meal._doc, id: meal._id };
    res.status(200).json(formattedMeal);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// DELETE a meal
router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const meal = await Meal.findByIdAndDelete(id);
    if (!meal) {
      return res.status(404).json({ error: 'No such meal' });
    }
    const formattedMeal = { ...meal._doc, id: meal._id };
    res.status(200).json(formattedMeal);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;
