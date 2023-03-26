const router = require("express").Router();
const { User, Appointments, Location, Staff, Service } = require("../models");
// const withAuth = require('../utils/auth');

router.get("/", async (req, res) => {
  res.render("landing");
});

router.get("/appointments", async (req, res) => {
  try {
    const appts = await Appointments.findAll({
      attributes: { exclude: ["password"] },
      include: [{ model: Location, User, Service, Staff }],
    });
    const userAppts = appts.get({ plain: true });
    if (userAppts.user_id == req.session.user_id) {
    res.render("appointments", {
      ...userAppts,
    })};
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/profile", async (req, res) => {
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
    res.status(500).json(err);
  }
});

router.get("/login", (req, res) => {
  if (req.session.logged_in) {
    res.redirect("/profile");
    return;
  }
  res.render("login");
});

module.exports = router;
