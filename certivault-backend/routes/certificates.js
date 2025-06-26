const express = require('express');
const router = express.Router();
const multer = require('multer');
const auth = require('../middleware/auth');
const { uploadCertificate, bulkUpload } = require('../controllers/certificateController');
const verifyController = require('../controllers/verifyController');

// Multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'uploads/'),
  filename: (req, file, cb) => cb(null, `${Date.now()}-${file.originalname}`)
});
const upload = multer({ storage });

// Secure upload routes
router.post('/upload', auth, uploadCertificate);
router.post('/bulk-upload', auth, upload.single('file'), bulkUpload);

// Public verification
router.get('/verify/:id', verifyController);

module.exports = router;
