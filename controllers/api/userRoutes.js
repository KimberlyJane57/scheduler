const router = require('express').Router();
const { User } = require('../../models/User');

router.post('/create_user', auth, async (req,res,next) => {
    const userData = await User.findOne({ where: { email: req.body.email } });

    if (userData) {
      res
        .status(400)
        .json({ message: 'User already exist ${req.body.email}.'});
      return; 
    }
    //add user here.
    try {
      const userData = await User.create(req.body);
  
      req.session.save(() => {
        req.session.user_id = userData.id;
        req.session.logged_in = true;
  
        res.status(200).json(userData);
      });
      return userData;
    } catch (err) {
      res.status(400).json(err);
    }

});

router.put('/update_user', auth, async (req,res,next) => {
  const userData = await User.findOne({ where: { email: req.body.email } });

  if (!userData) {
    res
      .status(400)
      .json({ message: 'Incorrect email or password, please try again' });
    return;
  }
  //update user here.
  userData.password = req.body.password
  userData.first_name = req.body.first_name
  userData.last_name = req.body.last_name
  userData.birthdate = req.body.birthdate
  userData.phone_number = req.body.phone_number
  await userData.save();
  return userData;
});

module.exports = router;
