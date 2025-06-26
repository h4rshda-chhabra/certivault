import React, { useState } from 'react';
import './VerifyCertificates.css';

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
    <>
      <nav className="navbar">
        <h1 className="logo">CertifyHub</h1>
        <div className="nav-links">
          <a href="/verify">Verify</a>
          <a href="/admin/login">Admin Login</a>
          <a href="/admin/signup">Admin Signup</a>
        </div>
      </nav>

      <section id="upload" className="verify-section">
        <h2 className="text-2xl font-bold mb-4 text-center">Upload Certificate</h2>
        <form onSubmit={handleSubmit} className="space-y-4 max-w-xl mx-auto">
          {['certificateId', 'studentName', 'courseName', 'issueDate'].map((field) => (
            <input
              key={field}
              type={field === 'issueDate' ? 'date' : 'text'}
              name={field}
              value={formData[field]}
              onChange={handleChange}
              placeholder={field}
              className="w-full p-3 border rounded"
              required
            />
          ))}
          <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700">
            Submit
          </button>
        </form>

        {message && (
          <p className="mt-4 text-center text-green-700 font-medium">{message}</p>
        )}
      </section>

      <footer className="footer">
        <p>&copy; {new Date().getFullYear()} CertifyHub. All rights reserved.</p>
      </footer>
    </>
  );
};

export default UploadCertificate;
