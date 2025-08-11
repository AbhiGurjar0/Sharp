const {Sequelize} = require('sequelize');

const sequelize = new Sequelize('book_db','root','Abhi@123',{
    host:'localhost',
    dialect:'mysql',
})

module.exports = sequelize;