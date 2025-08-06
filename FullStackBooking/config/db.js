const { Sequelize } = require('sequelize')

const sequelize = new Sequelize('Buses_Database', 'root', 'Abhi@123', {
    host: 'localhost',
    dialect: 'mysql'
})

module.exports = sequelize;