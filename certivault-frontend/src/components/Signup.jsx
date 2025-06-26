import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './VerifyCertificates.css';

const Signup = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    password: ''
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    try {
      const response = await fetch('http://localhost:5000/api/admin/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      const data = await response.json();
      if (response.ok) {
        setSuccess('Signup successful! Redirecting to login...');
        setTimeout(() => navigate('/admin/login'), 2000);
      } else {
        setError(data.message || 'Signup failed');
      }
    } catch (err) {
      console.error('Signup error:', err);
      setError('Server error');
    }
  };

  return (
    <>
      {/* Navbar */}
      <nav className="navbar">
        <h1 className="logo">CertifyHub</h1>
        <div className="nav-links">
          <a href="/verify">Verify</a>
          <a href="/upload">Upload</a>
          <a href="/admin/login">Login</a>
        </div>
      </nav>

      {/* Signup Form */}
      <section className="verify-section">
        <h2 className="text-2xl font-bold mb-4 text-center">Admin Signup</h2>
        <form onSubmit={handleSubmit} className="space-y-4 max-w-md mx-auto">
          <input
            type="text"
            name="name" // ✅ must match backend
            value={formData.name}
            onChange={handleChange}
            placeholder="Organization Name"
            className="w-full p-3 border rounded"
            required
          />
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Password"
            className="w-full p-3 border rounded"
            required
          />
          <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700">
            Sign Up
          </button>
        </form>

        {error && <p className="mt-4 text-center text-red-600 font-medium">{error}</p>}
        {success && <p className="mt-4 text-center text-green-600 font-medium">{success}</p>}
      </section>

      {/* Footer */}
      <footer className="footer">
        <p>&copy; {new Date().getFullYear()} CertifyHub. All rights reserved.</p>
      </footer>
    </>
  );
};

export default Signup;
