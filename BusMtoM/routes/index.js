const express = require('express');
const router = express.Router();
const { User, Bus, Booking } = require('../models');

router.post('/users', async (req, res) => {
  const user = await User.create(req.body);
  res.status(201).json(user);
});

router.post('/buses', async (req, res) => {
  const bus = await Bus.create(req.body);
  res.status(201).json(bus);
});

router.post('/bookings', async (req, res) => {
  const booking = await Booking.create(req.body);
  res.status(201).json(booking);
});

router.get('/users/:id/bookings', async (req, res) => {
  try {
    const bookings = await Booking.findAll({
      where: { userId: req.params.id },
      include: { model: Bus, attributes: ['busNumber'] }
    });
    res.json(bookings);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

router.get('/buses/:id/bookings', async (req, res) => {
  try {
    const bookings = await Booking.findAll({
      where: { busId: req.params.id },
      include: { model: User, attributes: ['name', 'email'] }
    });
    res.json(bookings);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
