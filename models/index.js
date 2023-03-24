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

Appointments.hasOne(Service, {
    foreignKey: 'service_id',
});

Appointments.hasOne(Staff, {
    foreignKey: 'staff_id',
});

Appointments.hasOne(Location, {
    foreignKey: 'location_id',
})

module.exports = { User, Appointments, Location, Staff, Service };
