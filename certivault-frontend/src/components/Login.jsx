import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './VerifyCertificates.css'; // Reuse shared styles

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '', // ✅ MUST match backend schema field (not organizationName)
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
        localStorage.setItem('token', data.token); // ✅ Store token for upload auth
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
    <>
      {/* Navbar */}
      <nav className="navbar">
        <h1 className="logo">CertifyHub</h1>
        <div className="nav-links">
          <a href="/verify">Verify</a>
          <a href="/upload">Upload</a>
          <a href="/admin/signup">Signup</a>
        </div>
      </nav>

      {/* Login Form */}
      <section className="verify-section">
        <h2 className="text-2xl font-bold mb-4 text-center">Admin Login</h2>
        <form onSubmit={handleSubmit} className="space-y-4 max-w-md mx-auto">
          <input
            type="text"
            name="name" // ✅ Correct field
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
            Log In
          </button>
        </form>

        {error && <p className="mt-4 text-center text-red-600 font-medium">{error}</p>}
      </section>

      {/* Footer */}
      <footer className="footer">
        <p>&copy; {new Date().getFullYear()} CertifyHub. All rights reserved.</p>
      </footer>
    </>
  );
};

export default Login;
