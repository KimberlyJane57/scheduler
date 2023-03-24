const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Appointments extends Model {}

Appointments.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    user_id: {
        type: DataTypes.INTEGER,
        references: {
          model: 'user',
          key: 'id',
      },
    },
    date: {
        type: DataTypes.DATEONLY,
        validate: {
            isDate: true
        },
    },
    time: {
        type: DataTypes.TIME,
    },
    service_id: {
        type: DataTypes.INTEGER,
        references: {
          model: 'service',
          key: 'id',
      },
    },
    staff_id: {
        type: DataTypes.INTEGER,
        references: {
          model: 'staff',
          key: 'id',
      },
    },
    location_id: {
        type: DataTypes.INTEGER,
        references: {
          model: 'location',
          key: 'id',
      },
    },
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'appointments',
  }
);

module.exports = Appointments;