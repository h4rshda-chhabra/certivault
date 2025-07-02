import React, { useState } from 'react';
import './UploadCertificate.css';

const UploadCertificate = () => {
  const [formData, setFormData] = useState({
    certificateId: '',
    studentName: '',
    courseName: '',
    issueDate: ''
  });
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:5000/api/certificates/upload', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify(formData)
      });

      const data = await response.json();
      if (response.ok) {
        setMessage(data.message);
        setFormData({
          certificateId: '',
          studentName: '',
          courseName: '',
          issueDate: ''
        });
      } else {
        setMessage(data.message || 'Something went wrong');
      }
    } catch (err) {
      console.error(err);
      setMessage('Server error');
    }
  };

  return (
    <div className="page-container">
      {/* Navbar */}
      <nav className="navbar">
        <h1 className="logo">CertifyHub</h1>
        <div className="nav-links">
          <a href="/verify">Verify</a>
        </div>
      </nav>

      {/* Upload Form */}
      <section className="verify-section">
        <h2>Upload Certificate</h2>

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="certificateId"
            value={formData.certificateId}
            onChange={handleChange}
            placeholder="Certificate ID"
            required
          />
          <input
            type="text"
            name="studentName"
            value={formData.studentName}
            onChange={handleChange}
            placeholder="Student Name"
            required
          />
          <input
            type="text"
            name="courseName"
            value={formData.courseName}
            onChange={handleChange}
            placeholder="Course Name"
            required
          />
          <input
            type="date"
            name="issueDate"
            value={formData.issueDate}
            onChange={handleChange}
            required
          />

          <button type="submit">Submit</button>
        </form>

        {message && (
          <p className="message-success">{message}</p>
        )}
      </section>

      {/* Footer */}
      <footer className="footer">
        <p>&copy; {new Date().getFullYear()} CertifyHub. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default UploadCertificate;
