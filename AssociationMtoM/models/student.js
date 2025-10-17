const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

module.exports = (sequelize, DataTypes) => {
    const Student = sequelize.define('Student', {
        name: DataTypes.STRING,
        email: DataTypes.STRING
    },{
        timestamps : false,
    });

    Student.associate = (models) => {
        Student.belongsToMany(models.Course, { through: 'StudentCourses',timestamps:false });
    };

    return Student;
};
