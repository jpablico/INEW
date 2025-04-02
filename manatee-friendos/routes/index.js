const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.render('index', { title: 'Friends of the Manatee' });
});

router.get('/signup', (req, res) => {
  res.render('signup', { title: 'Join Friends of the Manatee' });
});

module.exports = router;
