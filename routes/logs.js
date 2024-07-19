// routes/logs.js
const express = require('express');
const router = express.Router();
const Exercise = require('../models/Exercise');
const User = require('../models/User');

// Obtener el log de ejercicios
router.get('/', async (req, res) => {
  const userId = req.params._id;  // Asegúrate de que esto se está extrayendo correctamente
  const { from, to, limit } = req.query;
  try {
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ error: 'User not found' });

    let query = Exercise.find({ userId });
    if (from) query = query.where('date').gte(new Date(from));
    if (to) query = query.where('date').lte(new Date(to));
    if (limit) query = query.limit(parseInt(limit));

    const exercises = await query.exec();
    res.json({
      username: user.username,
      count: exercises.length,
      _id: userId,
      log: exercises.map(e => ({
        description: e.description,
        duration: e.duration,
        date: e.date.toDateString()
      }))
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
