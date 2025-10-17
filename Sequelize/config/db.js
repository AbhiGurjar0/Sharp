const { Sequelize } = require('sequelize')

const sequelize = new Sequelize('Student_Database', 'root', 'Abhi@123', {
    host: 'localhost',
    dialect: 'mysql'
})

module.exports = sequelize;