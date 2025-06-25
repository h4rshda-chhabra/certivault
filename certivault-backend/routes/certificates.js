const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const Certificate = require('../models/Certificate');
const { uploadCertificate, bulkUpload } = require('../controllers/certificateController');

// Multer setup for CSV file upload
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, `${Date.now()}-${file.originalname}`);
  }
});
const upload = multer({ storage });

// ✅ Manual certificate upload
router.post('/upload', uploadCertificate);

// ✅ Bulk CSV upload
router.post('/bulk-upload', upload.single('file'), bulkUpload);

// ✅ Verify certificate by ID
router.get('/verify/:id', async (req, res) => {
  try {
    const cert = await Certificate.findOne({ certificateId: req.params.id });
    if (cert) {
      res.json({ valid: true, certificate: cert });
    } else {
      res.json({ valid: false, message: 'Certificate not found' });
    }
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

module.exports = router;
