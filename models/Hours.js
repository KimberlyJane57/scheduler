const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");

class Hours extends Model {}

Hours.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    available_hours: {
      type: DataTypes.TIME,
      allowNull: false,
    },
  },
  {
    sequelize,
    freezeTableName: true,
    timestamps: false,
    underscored: true,
    modelName: "hours",
  }
);

module.exports = Hours;