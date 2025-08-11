const { DataTypes } = require('sequelize');
const sequelize = require('../config/db')

const Returned = sequelize.define('Returned', {
    bookName: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    returnDate: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    totalFine: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
    }
}
    , {
        timestamps: false,
    })

module.exports = Returned;