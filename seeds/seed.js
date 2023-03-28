const sequelize = require('../config/connection');
const { User, Appointments, Location, Service, Staff, Dates, Hours, DateTime } = require('../models');

const userData = require('./user.json');
const locationData = require('./location.json');
const serviceData = require('./service.json');
const staffData = require('./staff.json');
const appointmentsData = require('./appointments.json');
const datesData = require('./dates.json');
const hoursData = require('./hours.json');
const dateTimeData = require('./dateTime.json');


const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  await User.bulkCreate(userData, {
    individualHooks: true,
    returning: true,
  });

  await Location.bulkCreate(locationData);
  await Service.bulkCreate(serviceData);
  await Staff.bulkCreate(staffData);
  await Appointments.bulkCreate(appointmentsData);
  await Dates.bulkCreate(datesData);
  await Hours.bulkCreate(hoursData);
  await DateTime.bulkCreate(dateTimeData);

  process.exit(0);
};

seedDatabase();
