module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    name: DataTypes.STRING,
    email: DataTypes.STRING
  }, {
    timestamps: false
  });

  User.associate = (models) => {
    User.hasMany(models.Booking, {
      foreignKey: 'userId'
    });
  };

  return User;
};
