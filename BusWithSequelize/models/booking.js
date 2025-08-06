const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Booking = sequelize.define('Booking', {
  userId: DataTypes.INTEGER,
  busId: DataTypes.INTEGER
}, { timestamps: false });

module.exports = Booking;
