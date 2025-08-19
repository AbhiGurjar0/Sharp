const { DataTypes } = require('sequelize');
const sequelize = require('../config/db')

const Book = sequelize.define('Book', {
    bookName: {
        type: DataTypes.STRING,
        allowNull: false,
        
    },
    alloteDate: {
        type: DataTypes.DATE,
        allowNull: false,
       
    },
    dueDate: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    
    totalFine:{
        type:DataTypes.INTEGER,
    }
}
    , {
        timestamps: false,
    })

module.exports = Book;