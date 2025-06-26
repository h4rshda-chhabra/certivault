const Organization = require('../models/Organization');
const bcrypt = require('bcrypt');

exports.login = async (req, res) => {
  const { name, password } = req.body;

  try {
    const org = await Organization.findOne({ name });
    if (!org) return res.status(404).json({ message: 'Organization not found' });

    const isMatch = await bcrypt.compare(password, org.password);
    if (!isMatch) return res.status(401).json({ message: 'Invalid credentials' });

    res.json({ message: 'Login successful' });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

exports.register = async (req, res) => {
  const { name, password } = req.body;

  try {
    const existing = await Organization.findOne({ name });
    if (existing) return res.status(400).json({ message: 'Organization already exists' });

    const org = new Organization({ name, password });
    await org.save();

    res.status(201).json({ message: 'Organization registered successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};
