const router = require('express').Router();
const { Appointments } = require('../../models');

router.post('/create', async (req, res) => {
  try {
    const newApp = await Appointments.create({
      ...req.body,
      // user_id: req.session.user_id,
    });

    res.status(200).json(newApp);
  } catch (err) {
    console.log(err);
    res.status(400).json(err);
  }
});

router.delete('/:id', async (req, res) => {
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
