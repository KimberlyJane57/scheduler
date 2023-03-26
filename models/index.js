const User = require('./User');
const Appointments = require('./Appointments');
const Location = require('./Location');
const Staff = require('./Staff')
const Service = require('./Service');

User.hasMany(Appointments, {
  foreignKey: 'user_id',
});

Appointments.belongsTo(User, {
  foreignKey: 'user_id',
});

Service.hasMany(Appointments, {
    foreignKey: 'service_id',
});

Appointments.belongsTo(Service, {
  foreignKey: 'service_id',
});

Staff.hasMany(Appointments, {
    foreignKey: 'staff_id',
});

Appointments.belongsTo(Staff, {
  foreignKey: 'staff_id',
});

Location.hasMany(Appointments, {
    foreignKey: 'location_id',
});

Appointments.belongsTo(Location, {
  foreignKey: 'location_id',
});

module.exports = { User, Appointments, Location, Staff, Service };
