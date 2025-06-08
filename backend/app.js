const express = require('express');
const cors = require('cors');
require('dotenv').config();

const summarizeRoutes = require('./routes/summarize');
const translateRoutes = require('./routes/translate');
const emailRoutes = require('./routes/email');

const app = express();
app.use(cors());
app.use(express.json());

// Debug middleware
app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
});

app.use('/api', summarizeRoutes);
app.use('/api', translateRoutes);
app.use('/api', emailRoutes);

// 404 handler
app.use((req, res) => {
  console.log('404 Not Found:', req.method, req.url);
  res.status(404).json({ error: 'Not Found' });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
}); 