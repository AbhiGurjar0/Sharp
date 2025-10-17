const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../config/db')

const Student = require('./student')(sequelize, DataTypes);
const Course = require('./course')(sequelize, DataTypes);

Student.associate({ Course });
Course.associate({ Student });

sequelize.sync();

module.exports = { sequelize, Student, Course };
