const Certificate = require('../models/Certificate');
const csv = require('csv-parser');
const fs = require('fs');
const path = require('path');

exports.uploadCertificate = async (req, res) => {
  try {
    const { certificateId, studentName, courseName, issueDate } = req.body;

    if (!req.user?.orgId) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    const exists = await Certificate.findOne({ certificateId });
    if (exists) return res.status(400).json({ message: 'Certificate ID already exists' });

    const cert = new Certificate({
      certificateId,
      studentName,
      courseName,
      issueDate,
      organization: req.user.orgId,
    });

    await cert.save();

    res.status(201).json({ message: 'Certificate uploaded successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

exports.bulkUpload = (req, res) => {
  const results = [];
  const errors = [];
  const duplicates = [];

  const filePath = path.join(__dirname, '..', req.file.path);

  fs.createReadStream(filePath)
    .pipe(csv())
    .on('data', async (row) => {
      try {
        const exists = await Certificate.findOne({ certificateId: row.certificateId });
        if (exists) {
          duplicates.push(row);
        } else {
          results.push({ ...row, organization: req.user?.orgId });
        }
      } catch (err) {
        errors.push({ row, error: err.message });
      }
    })
    .on('end', async () => {
      try {
        await Certificate.insertMany(results);
        res.status(200).json({
          message: 'Bulk upload complete',
          inserted: results.length,
          duplicates,
          errors,
        });
      } catch (err) {
        res.status(500).json({ message: 'Bulk insert failed', error: err.message });
      }
    });
};
