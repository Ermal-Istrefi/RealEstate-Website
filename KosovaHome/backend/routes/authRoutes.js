const jwt = require('jsonwebtoken');
const User = require('../models/User');
require('dotenv').config();
const express = require('express');

const router = express.Router();

router.post('/register', async (req, res) => {
    try {
        const { name, email, password } = req.body;
        
        // Check if a user with the given email already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ error: 'Email already exists' });
        }
        
        // If no existing user with the email, proceed with registration
        const user = new User({ name, email, password });
        await user.save();
        
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1d' });
        res.status(201).json({ message: 'User Registered', token });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error in registration' });
    }
});

router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });

        if (user) {
            const isValid = await user.isValidPassword(password);
            if (isValid) {
                const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1d' });
                return res.json({ message: 'Login successful', token });
            } else {
                return res.status(401).json({ message: 'Incorrect password' });
            }
        } else {
            return res.status(404).json({ message: 'User not found' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error in login' });
    }
});

module.exports = router;
