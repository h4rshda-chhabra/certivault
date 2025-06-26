const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const OrganizationSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  password: { type: String, required: true }
});

OrganizationSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (err) {
    next(err);
  }
});

module.exports = mongoose.models.Organization || mongoose.model('Organization', OrganizationSchema);
