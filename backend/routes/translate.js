const express = require('express');
const router = express.Router();
const translateController = require('../controllers/translateController');

// Debug middleware for translate route
router.use((req, res, next) => {
  console.log('Translate route hit:', req.method, req.url);
  next();
});

router.post('/translate', translateController.translateText);

module.exports = router; 