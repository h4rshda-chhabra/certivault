console.log('🚀 Starting server...');

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Static folder for uploaded CSV files (optional)
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Routes
const certificateRoutes = require('./routes/certificates');
const authRoutes = require('./routes/auth');

app.use('/api/certificates', certificateRoutes); // cert-related APIs
app.use('/api/admin', authRoutes);              // signup/login APIs

// MongoDB connection
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => {
  console.log('✅ MongoDB connected');
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () =>
    console.log(`🌐 Server running on http://localhost:${PORT}`)
  );
})
.catch((err) => {
  console.error('❌ MongoDB connection error:', err.message);
});
