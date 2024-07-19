// routes/exercises.js
const express = require('express');
const router = express.Router();
const Exercise = require('../models/Exercise');
const User = require('../models/User');

// Añadir un ejercicio
router.post('/', async (req, res) => {
  const { description, duration, date } = req.body;
  const userId = req.params._id;  // Asegúrate de que esto se está extrayendo correctamente
  try {
    const exercise = new Exercise({
      userId,
      description,
      duration,
      date: date ? new Date(date) : new Date()
    });
    await exercise.save();
    const user = await User.findById(userId);
    res.json({
      username: user.username,
      _id: userId,
      description: exercise.description,
      duration: exercise.duration,
      date: exercise.date.toDateString()
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
