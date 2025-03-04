const express = require('express');
const path = require('path');
const router = express.Router();
const viewsPath = path.join(__dirname, '..', 'views');

router.get('/', (req, res) => {
  res.sendFile(path.join(viewsPath, 'index.html'));
});

router.get('/ai-ethics', (req, res) => {
  res.sendFile(path.join(viewsPath, 'ai-ethics.html'));
});

module.exports = router;