const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");

class Dates extends Model {}

Dates.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    available_dates: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
  },
  {
    sequelize,
    freezeTableName: true,
    timestamps: false,
    underscored: true,
    modelName: "dates",
  }
);

module.exports = Dates;