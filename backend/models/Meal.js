const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const mealSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  calories: {
    type: Number,
    required: true
  }
}, { timestamps: true });

module.exports = mongoose.model('Meal', mealSchema);
