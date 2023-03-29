const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class DateTime extends Model {}

DateTime.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    date_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'dates',
        key: 'id'
      },
    },
    hour_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'hours',
        key: 'id'
      },
    },
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'date_time',
  }
);

module.exports = DateTime;