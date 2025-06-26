import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import UploadCertificate from './components/UploadCertificate';
import VerifyCertificates from './components/VerifyCertificates';
import Login from './components/Login';
import Signup from './components/Signup';

function App() {
  return (
    <Router>
      <div className="bg-gray-100 min-h-screen">
        <main className="p-6 max-w-4xl mx-auto">
          <Routes>
            <Route path="/" element={<VerifyCertificates />} />
            <Route path="/verify" element={<VerifyCertificates />} />
            <Route path="/upload" element={<UploadCertificate />} />
            <Route path="/admin/login" element={<Login />} />
            <Route path="/admin/signup" element={<Signup />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
