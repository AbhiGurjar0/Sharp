const express = require('express');
const router = express.Router();
const { Op } = require('sequelize');
const Bus = require('../models/bus');


router.post('/', async (req, res) => {
  try {
    const bus = await Bus.create(req.body);
    res.status(201).json(bus);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});


router.get('/available/:seats', async (req, res) => {
  const seats = parseInt(req.params.seats);
  const buses = await Bus.findAll({
    where: {
      availableSeats: {
        [Op.gt]: seats
      }
    }
  });
  res.json(buses);
});

module.exports = router;
