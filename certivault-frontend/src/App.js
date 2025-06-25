import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import UploadCertificate from './components/UploadCertificate';
import VerifyCertificates from './components/VerifyCertificates';

function App() {
  return (
    <Router>
      <div className="bg-gray-100 min-h-screen">
        <Navbar />
        <main className="p-6 max-w-4xl mx-auto">
          <Routes>
            <Route path="/" element={<VerifyCertificates />} />
            <Route path="/upload" element={<UploadCertificate />} />
            <Route path="/verify" element={<VerifyCertificates />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;