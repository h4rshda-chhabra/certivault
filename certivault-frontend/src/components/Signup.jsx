import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './VerifyCertificates.css'; // Uses shared CSS

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
    <div className="page-container">
      {/* Navbar */}
      <nav className="navbar">
        <h1 className="logo">CertifyHub</h1>
        <div className="nav-links">
          <a href="/verify">Verify</a>
          <a href="/admin/login">Login</a>
        </div>
      </nav>

      {/* Signup Form */}
      <section className="login-section">
        <h2 className="verify-heading">Admin Signup</h2>
        <br />
        
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Organization Name"
            required
          />
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Password"
            required
          />
          <button type="submit">Sign Up</button>
        </form>

        {error && <p className="error-message">{error}</p>}
        {success && <p className="message-success">{success}</p>}
      </section>

      {/* Footer */}
      <footer className="footer">
        <p>&copy; {new Date().getFullYear()} CertifyHub. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Signup;
