const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const Organization = require('../models/Organization');

// POST /api/admin/signup
router.post('/signup', async (req, res) => {
  try {
    const { name, password } = req.body;

    if (!name || !password) {
      return res.status(400).json({ message: 'Missing fields' });
    }

    const existingOrg = await Organization.findOne({ name });
    if (existingOrg) {
      return res.status(400).json({ message: 'Organization already exists' });
    }

    const newOrg = new Organization({ name, password });
    await newOrg.save();

    res.status(201).json({ message: 'Signup successful' });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

// POST /api/admin/login
router.post('/login', async (req, res) => {
  try {
    const { name, password } = req.body;

    if (!name || !password) {
      return res.status(400).json({ message: 'Missing fields' });
    }

    const org = await Organization.findOne({ name });
    if (!org) return res.status(401).json({ message: 'Invalid credentials' });

    const isMatch = await require('bcrypt').compare(password, org.password);
    if (!isMatch) return res.status(401).json({ message: 'Invalid credentials' });

    const token = jwt.sign({ orgId: org._id }, process.env.JWT_SECRET, { expiresIn: '7d' });

    res.json({ token, message: 'Login successful' });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

module.exports = router;
