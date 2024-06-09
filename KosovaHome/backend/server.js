const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const User = require('./models/User');
const bcrypt = require('bcryptjs');
const verifyToken = require('./verifyToken');
const authRoutes = require('./routes/authRoutes');


require('dotenv').config();
const app = express();

mongoose.connect(process.env.MONGODB_URI)
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error.message);
  });

app.use(cors());
app.use(express.json());

// Use the auth routes for login and registration
app.use('/api', authRoutes);

app.get('/api/check-token', verifyToken, (req, res) => {

  res.json(req.user);

})

const PORT = process.env.PORT || 5004;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
