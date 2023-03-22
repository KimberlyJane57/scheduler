const sequelize = require('../config/connection');
const { User, Appointments } = require('../models');

const userData = require('./userData.json');
const appointmentsData = require('./projectData.json');

const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  await User.bulkCreate(userData, {
    individualHooks: true,
    returning: true,
  });

  await Appointments.bulkCreate(appointmentsData, {
    });
  process.exit(0);
};

seedDatabase();
