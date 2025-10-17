const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const User = require('./user')(sequelize, DataTypes);
const Bus = require('./bus')(sequelize, DataTypes);
const Booking = require('./booking')(sequelize, DataTypes);

const models = { User, Bus, Booking };

User.associate(models);
Bus.associate(models);
Booking.associate(models);

module.exports = { sequelize, ...models };
