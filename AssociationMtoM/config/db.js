const { Sequelize } = require('sequelize')

const sequelize = new Sequelize('subject_db', 'root', 'Abhi@123', {
    host: 'localhost',
    dialect: 'mysql'
})

module.exports = sequelize;