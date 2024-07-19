// index.js
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();

// Basic Configuration
const port = process.env.PORT || 3000;

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

// Middleware
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static('public'));

// Routes
app.use('/api/users', require('./routes/users'));
app.use('/api/users/:_id/exercises', require('./routes/exercises'));
app.use('/api/users/:_id/logs', require('./routes/logs'));

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
