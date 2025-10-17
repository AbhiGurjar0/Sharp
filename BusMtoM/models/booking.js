module.exports = (sequelize, DataTypes) => {
  const Booking = sequelize.define('Booking', {
    seatNumber: DataTypes.INTEGER
  }, {
    timestamps: false
  });

  Booking.associate = (models) => {
    Booking.belongsTo(models.User, {
      foreignKey: 'userId'
    });
    Booking.belongsTo(models.Bus, {
      foreignKey: 'busId'
    });
  };

  return Booking;
};
