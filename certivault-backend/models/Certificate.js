

const mongoose = require('mongoose');

const CertificateSchema = new mongoose.Schema({
  certificateId: {
    type: String,
    required: true,
    unique: true,
  },
  studentName: String,
  courseName: String,
  issueDate: Date,
  organization: String,
}, { timestamps: true });

CertificateSchema.index({ certificateId: 1 }, { unique: true });

module.exports = mongoose.model('Certificate', CertificateSchema);
