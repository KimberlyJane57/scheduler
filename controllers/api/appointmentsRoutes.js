const router = require('express').Router();
const { Appointments } = require('../../models');
const withAuth = require('../../utils/auth');

router.post('/create', withAuth, async (req, res) => {
  try {
    const { date, time, staff_id, service_id, location_id } = req.body;
    const user_id = req.session.user_id;
    const appointmentData = await Appointments.create({
      date,
      time,
      staff_id,
      service_id,
      location_id,
      user_id
    });
    res.status(201).json(appointmentData);
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
});

router.delete('/remove/:id', withAuth, async (req, res) => {
  try {
    const appData = await Appointments.destroy({
      where: {
        id: req.params.id,
        user_id: req.session.user_id,
      },
    });

    if (!appData) {
      res
        .status(404)
        .json({ message: 'No appointment with this ID to delete.' });
      return;
    }

    res.status(200).json(appData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
