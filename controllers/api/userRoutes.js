const router = require('express').Router();
const { User } = require('../../models');


router.post('/login', async (req, res) => {
  try {
    const findUser = await User.findOne({where:{email: req.body.email}});
    if (!findUser) {
      res
        .status(404)
        .json({message: 'Not a valid email.'});
      return;
    }
    const passwordCheck = await findUser.checkPassword(req.body.password);
    if (!passwordCheck) {
      res
        .status(405)
        .json({message: 'Password incorrect.'});
      return;
    }
    req.session.save(() => {
      req.session.user_id = findUser.id;
      req.session.logged_in = true;      
      res.json({ user: findUser, message: 'Logged in.'});
    });
  } catch (err) {
    res.status(406).json(err);
  }
});

router.post('/logout', (req, res) => {
  if (req.session.logged_in) {
    req.session.destroy(() => {
      res.status(202).end();
    });
  } else {
    res.status(407).end();
  }
});
=======
router.put('/profile', async (req, res) => {   
  try {
    const userData = await User.update(
    {
      first_name: req.body.first_name,
      last_name: req.body.last_name,
      birthdate: req.body.birthdate,
      phone_number: req.body.phone_number
    }, 
    {
      where: {
        id: req.session.user_id,
      }
    });

      if (!userData) {
        res.status(404).json({ message: 'No user found' });
        return;
      }
      res.status(200).json('User info has been updated');
  } catch (err) {
    res.status(400).json(err);
  }
})


module.exports = router;
