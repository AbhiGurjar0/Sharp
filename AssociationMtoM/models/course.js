
const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
module.exports = (sequelize, DataTypes) => {
    const Course = sequelize.define('Course', {
        title: DataTypes.STRING,
        description: DataTypes.STRING
    }, {
        timestamps: false,
    });

    Course.associate = (models) => {
        Course.belongsToMany(models.Student, { through: 'StudentCourses',timestamps:false });
    };

    return Course;
};