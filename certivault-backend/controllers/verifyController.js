const Certificate = require('../models/Certificate');

module.exports = async (req, res) => {
  try {
    const cert = await Certificate.findOne({ certificateId: req.params.id }).populate('organization', 'name');

    if (!cert) {
      return res.status(404).json({ valid: false, message: 'Certificate not found' });
    }

    res.json({
      valid: true,
      certificate: {
        certificateId: cert.certificateId,
        studentName: cert.studentName,
        courseName: cert.courseName,
        issueDate: cert.issueDate,
        organization: cert.organization?.name || cert.organization,
      }
    });
  } catch (err) {
    res.status(500).json({ valid: false, message: 'Server error', error: err.message });
  }
};
