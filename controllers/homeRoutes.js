const router = require("express").Router();
const { User, Appointments, Location, Staff, Service } = require("../models");
const withAuth = require('../utils/auth');

router.get("/", async (req, res) => {
  res.render("landing", {
    logged_in: req.session.logged_in 
  });
});

router.get("/appointments", withAuth, async (req, res) => {
  try {
    const user_id = req.session.user_id;
    const appts = await Appointments.findAll({
      where: { user_id },
      include: [
        { model: User,
        attributes: { exclude: ['password'] } },
        { model: Location },
        {model: Staff },
        {model: Service }
      ]
    });
    const staff = await Staff.findAll()
    const service = await Service.findAll()
    const location = await Location.findAll()
    const staffData = staff.map((staffPick) => staffPick.get({plain: true}))
    const servData = service.map((servPick) => servPick.get({plain: true}))
    const locData = location.map((locPick) => locPick.get({plain: true}))
    const userAppts = appts.map((appointment) => appointment.get({ plain: true }))
    res.render("appointments", { 
      appointments: userAppts, 
      staff: staffData, 
      service: servData, 
      location: locData, 
      logged_in: req.session.logged_in 
    });
  } catch (err) {
    console.log(err.message);
    res.status(500).json(err);
  }
});

router.get("/profile", withAuth, async (req, res) => {
  try {
    const userData = await User.findByPk(req.session.user_id, {
      attributes: { exclude: ["password"] },
    });
    const user = userData.get({ plain: true });
    res.render("profile", {
      ...user,
      logged_in: true,
    });
  } catch (err) {
    console.log(err.message);
    res.status(500).json(err);
  }
});

router.get ('/view-my-profile', withAuth, async (req, res) => {
  try {
    const userData = await User.findByPk(req.session.user_id, {
      attributes: { exclude: ["password"] },
    });
    const user = userData.get({ plain: true });
    res.render("viewProfile", {
      ...user,
      logged_in: true,
    });
  } catch (err) {
    console.log(err.message);
    res.status(500).json(err);
  }
});

router.get("/login", (req, res) => {
  if (req.session.logged_in) {
    res.redirect("/view-my-profile");
    return;
  }
  res.render("login");
});

module.exports = router;
