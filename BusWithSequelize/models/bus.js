const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Bus = sequelize.define('Bus', {
  name: DataTypes.STRING,
  availableSeats: DataTypes.INTEGER
}, { timestamps: false });

module.exports = Bus;
