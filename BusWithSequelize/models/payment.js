const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Payment = sequelize.define('Payment', {
    bookingId: DataTypes.INTEGER,
    amount: DataTypes.FLOAT,
    status: DataTypes.STRING
}, { timestamps: false });

module.exports = Payment;
