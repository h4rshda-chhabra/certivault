import React, { useState } from 'react';
import './VerifyCertificates.css'; // Make sure this CSS file is in the same folder or update the path

const VerifyCertificates = () => {
  const [certificateId, setCertificateId] = useState('');
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');

  const handleVerify = async () => {
    setError('');
    setResult(null);

    try {
      const response = await fetch(`http://localhost:5000/api/certificates/verify/${certificateId}`);
      const data = await response.json();

      if (data.valid) {
        setResult(data.certificate);
      } else {
        setError(data.message || 'Certificate not found');
      }
    } catch (err) {
      console.error(err);
      setError('Error verifying certificate');
    }
  };

  return (
    <div className="page-container">
      {/* Navbar */}
      <nav className="navbar">
        <h1 className="logo">CertifyHub</h1>
        <div className="nav-links">
          <a href="/admin/login">Admin Login</a>
          <a href="/admin/signup">Admin Signup</a>
        </div>
      </nav>
   

      {/* Certificate Verification Form */}
      <section className="verify-section">
        <h2>Verify Your Certificate</h2>

        <input
          type="text"
          value={certificateId}
          onChange={(e) => setCertificateId(e.target.value)}
          placeholder="Enter Certificate ID"
        />

        <button onClick={handleVerify}>Verify</button>

        {error && <p className="error-message">{error}</p>}

        {result && (
          <div className="result-box">
            <p><strong>Student Name:</strong> {result.studentName}</p>
            <p><strong>Course Name:</strong> {result.courseName}</p>
            <p><strong>Issue Date:</strong> {new Date(result.issueDate).toLocaleDateString()}</p>
            <p><strong>Organization:</strong> {result.organization}</p>
          </div>
        )}
      </section>

      {/* Admin CTA */}
      <section className="admin-cta">
        <p >Are you an admin?</p>
        <div className="admin-buttons">
          <a href="/admin/login" className="btn btn-primary">Log In</a>
          <a href="/admin/signup" className="btn btn-outline">Sign Up</a>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <p>&copy; {new Date().getFullYear()} CertifyHub. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default VerifyCertificates;
