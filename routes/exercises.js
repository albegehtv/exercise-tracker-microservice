const express = require('express');
const router = express.Router();
const Exercise = require('../models/Exercise');
const User = require('../models/User');

// Añadir un ejercicio
router.post('/:id/exercises', async (req, res) => {
  const { description, duration, date } = req.body;
  const userId = req.params.id;

  try {
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ error: 'User not found' });

    const exercise = new Exercise({
      userId,
      description,
      duration,
      date: date ? new Date(date) : new Date()
    });
    
    await exercise.save();

    res.json({
      username: user.username,
      _id: user._id,
      log: [{
        description: exercise.description,
        duration: exercise.duration,
        date: exercise.date.toDateString()
      }]
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
