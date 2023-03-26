const router = require('express').Router();
const { User } = require('../../models/User');

router.post('/', auth, async (req,res,next) => {
    const userData = await User.findOne({ where: { email: req.body.email } });

    if (userData) {
      res
        .status(400)
        .json({ message: 'User already exist ${req.body.email}.'});
      return; 
    }
    //Create User
    try {
      const userData = await User.create({
        ...req.body, 
        user_id: req.session.user_id,
      });
      res.status(200).json(newUser);
    } catch (err) {
      res.status(400).json(err);
    }
  });

router.put('/', auth, async (req, res) => {
  const userData = await User.findOne({ where: { 
    email: req.body.email,
    password: req.body.password
  }
});

  if (!userData) {
    res
      .status(400)
      .json({ message: 'Incorrect email or password, please try again.' });
    return;
  }
  //Update User
  try {
    const userData = await User.update({
      ...req.body, 
      user_id: req.session.user_id,
      password: req.session.password,
      first_name: req.session.first_name,
      last_name: req.session.last_name,
      birthdate: req.session.birthdate,
      phone_number: req.session.phone_number,
    });
    res.status(200).json(updateUser);
  } catch (err) {
    res.status(400).json(err);
  }
});


module.exports = router;
