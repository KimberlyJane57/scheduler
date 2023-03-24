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

Service.hasOne(Appointments, {
    foreignKey: 'service_id',
});

Staff.hasOne(Appointments, {
    foreignKey: 'staff_id',
});

Location.hasOne(Appointments, {
    foreignKey: 'location_id',
})

module.exports = { User, Appointments, Location, Staff, Service };
