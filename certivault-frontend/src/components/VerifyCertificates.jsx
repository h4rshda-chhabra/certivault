import React, { useState } from 'react';
import './VerifyCertificates.css';

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
    <>
      {/* Navbar */}
      <nav className="navbar">
        <h1 className="logo">CertifyHub</h1>
        <div className="nav-links">
          <a href="/upload">Upload</a>
          <a href="/admin/login">Admin Login</a>
          <a href="/admin/signup">Admin Signup</a>
        </div>
      </nav>

     

      {/* Verification Form */}
      <section id="verify" className="verify-section">
        <h2 className="text-2xl font-bold mb-4 text-center">Verify Certificate</h2>
        <input
          type="text"
          value={certificateId}
          onChange={(e) => setCertificateId(e.target.value)}
          placeholder="Enter Certificate ID"
          className="w-full p-3 border rounded mb-4"
        />
        <button
          onClick={handleVerify}
          className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700"
        >
          Verify
        </button>

        {error && <p className="mt-4 text-center text-red-600 font-medium">{error}</p>}

        {result && (
          <div className="mt-6 p-4 border border-green-300 bg-green-50 rounded">
            <p><strong>Student Name:</strong> {result.studentName}</p>
            <p><strong>Course Name:</strong> {result.courseName}</p>
            <p><strong>Issue Date:</strong> {new Date(result.issueDate).toLocaleDateString()}</p>
            <p><strong>Organization:</strong> {result.organization}</p>
          </div>
        )}
      </section>

      {/* CTA for Admins */}
      <section className="admin-cta">
        <p>Are you an admin?</p>
        <div className="admin-buttons">
          <a href="/admin/login" className="btn btn-primary">Log In</a>
          <a href="/admin/signup" className="btn btn-outline">Sign Up</a>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <p>&copy; {new Date().getFullYear()} CertifyHub. All rights reserved.</p>
      </footer>
    </>
  );
};

export default VerifyCertificates;