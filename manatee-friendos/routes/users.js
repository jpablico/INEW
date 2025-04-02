const express = require('express');
const router = express.Router();
const User = require('../models/user');

router.get('/', async (req, res) => {
  try {
    const users = await User.find({}).sort({ joinDate: -1 });
    res.render('users', { title: 'Our Members', users });
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
});

router.post('/signup', async (req, res) => {
  try {
    const { firstName, lastName, email, interests } = req.body;
    const newUser = new User({
      firstName,
      lastName,
      email,
      interests
    });
    await newUser.save();
    res.redirect('/users');
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
});

router.get('/edit/:id', async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    res.render('edit', { title: 'Edit Member', user });
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
});

router.post('/update/:id', async (req, res) => {
  try {
    const { firstName, lastName, email, interests } = req.body;
    await User.findByIdAndUpdate(req.params.id, {
      firstName,
      lastName,
      email,
      interests
    });
    res.redirect('/users');
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
});

router.post('/delete/:id', async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.redirect('/users');
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
});

module.exports = router;