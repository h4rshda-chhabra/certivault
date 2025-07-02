import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css'; // Reuse shared layout

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    password: ''
  });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const response = await fetch('http://localhost:5000/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      const data = await response.json();
      if (response.ok) {
        localStorage.setItem('token', data.token);
        navigate('/upload');
      } else {
        setError(data.message || 'Invalid credentials');
      }
    } catch (err) {
      console.error('Login error:', err);
      setError('Server error');
    }
  };

  return (
    <div className="page-container">
      <nav className="navbar">
        <h1 className="logo">CertifyHub</h1>
        <div className="nav-links">
          <a href="/verify" className="verifyButton">
            Verify Certificates
          </a>
        </div>
      </nav>

      <section className="verify-section">
        <h2>Admin Login</h2>
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
          <button type="submit">Log In</button>
        </form>
        {error && <p className="error-message">{error}</p>}
      </section>

      <footer className="footer">
        <p>&copy; {new Date().getFullYear()} CertifyHub. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Login;
