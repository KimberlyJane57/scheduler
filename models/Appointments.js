const { Model, DataTypes } = require('sequelize');
const bcrypt = require('bcrypt');
const sequelize = require('../config/connection');

class User extends Model {
  checkPassword(loginPw) {
    return bcrypt.compareSync(loginPw, this.password);
  }
}

User.init(
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
    hooks: {
      beforeCreate: async (newUserData) => {
        newUserData.password = await bcrypt.hash(newUserData.password, 10);
        return newUserData;
      },
    },
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'user',
  }
);

module.exports = User;