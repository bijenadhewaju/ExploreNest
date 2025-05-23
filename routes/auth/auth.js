// routes/auth.js
const express = require('express');
const bcrypt = require('bcrypt');
const User = require('../models/User');
const router = express.Router();

// Register Page
router.get('/register', (req, res) => {
    res.render('auth/register', { error: null });
});

// Register POST
router.post('/register', async (req, res) => {
    try {
        const { name, email, password } = req.body;
        
        // Check if user exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.render('auth/register', { error: 'Email already registered' });
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);
        
        // Create user
        const user = new User({
            name,
            email,
            password: hashedPassword
        });
        
        await user.save();
        req.session.userId = user._id;
        req.session.userName = user.name;
        req.session.isAdmin = user.isAdmin;
        
        res.redirect('/dashboard');
    } catch (error) {
        res.render('auth/register', { error: 'Registration failed' });
    }
});

// Login Page
router.get('/login', (req, res) => {
    res.render('auth/login', { error: null });
});

// Login POST
router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        
        const user = await User.findOne({ email });
        if (!user) {
            return res.render('auth/login', { error: 'Invalid credentials' });
        }
        
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.render('auth/login', { error: 'Invalid credentials' });
        }
        
        req.session.userId = user._id;
        req.session.userName = user.name;
        req.session.isAdmin = user.isAdmin;
        
        res.redirect('/dashboard');
    } catch (error) {
        res.render('auth/login', { error: 'Login failed' });
    }
});

// Logout
router.post('/logout', (req, res) => {
    req.session.destroy();
    res.redirect('/');
});

module.exports = router;